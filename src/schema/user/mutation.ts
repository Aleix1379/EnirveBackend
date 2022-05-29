import User from '../../models/User'
import jwt from 'jwt-simple'
import bcrypt from 'bcrypt'
import { verbs } from '../../db/irregular-verbs'
import Result from '../../models/Result'
import { Verb } from 'verb'
import { Profile } from 'profile'

interface LoginParams {
  email: string
  password: string
}

interface RegisterUserParams {
  username: string
  email: string
  password: string
}

interface SignResponse {
  jwt: string
  user: User
}

interface UpdateUserAvatarParams {
  avatar: string
}

interface UpdateUserAvatarResponse {
  user: Profile
}

const saltRounds = 10

export const UserMutation = {
  login: async (
    root: any,
    { email, password }: LoginParams
  ): Promise<SignResponse> => {
    console.info('email:', email)
    console.info('password:', password)
    const user = await User.findOne({ where: { email } })
    if (!user) {
      console.info('user not found...')
      throw new Error('You have entered an invalid username or password')
    }
    const result = await bcrypt.compare(password, user.getDataValue('password'))
    if (!result) {
      console.info("password doesn't match")
      throw new Error('You have entered an invalid username or password')
    }
    return {
      user,
      jwt: jwt.encode({ email }, process.env.JWT_SECRET)
    }
  },
  registerUser: async (
    root: any,
    { username, email, password }: RegisterUserParams
  ): Promise<SignResponse> => {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({
      username,
      email,
      password: hash
    })

    verbs.forEach((verb: Verb) => {
      Result.create({
        verb_id: verb.id,
        user_id: user.getDataValue('id'),
        completed: false
      })
    })

    return {
      user,
      jwt: jwt.encode({ username }, process.env.JWT_SECRET)
    }
  },
  updateUserAvatar: async (
    root: any,
    { avatar }: UpdateUserAvatarParams,
    ctx: any
  ): Promise<UpdateUserAvatarResponse> => {
    const user: User = await User.findOne({ where: { id: ctx.user.id } })
    console.info('user connected id:', ctx.user.id)

    // user.avatar = avatar
    user.setDataValue('avatar', avatar)
    await user.save()

    console.info('return user.toJSON():', user.toJSON())
    return user.toJSON()
  }
}
