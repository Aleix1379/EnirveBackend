import User from '../../models/User'
import jwt from 'jwt-simple'
import bcrypt from 'bcrypt'
import { verbs } from '../../db/irregular-verbs'
import Result from '../../models/Result'
import { Verb } from 'verb'
import { Profile } from 'profile'
import { OAuth2Client } from 'google-auth-library'

const GOOGLE_CLIENT_ID =
  '21474542388-1mi2ieimerkjhur2uu2a85j36ri67mcn.apps.googleusercontent.com'

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

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

interface verifyTokenWithGoogleParams {
  token: string
}

const saltRounds = 10

const createUSer = async (username: string, email: string, password = '') => {
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

  return user
}

export const UserMutation = {
  login: async (
    root: any,
    { email, password }: LoginParams
  ): Promise<SignResponse> => {
    const user = await User.findOne({ where: { email } })
    if (!user || !password) {
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
    const userCreated = await createUSer(username, email, password)

    return {
      user: userCreated,
      jwt: jwt.encode({ username }, process.env.JWT_SECRET)
    }
  },
  updateUserAvatar: async (
    root: any,
    { avatar }: UpdateUserAvatarParams,
    ctx: any
  ): Promise<UpdateUserAvatarResponse> => {
    const user: User = await User.findOne({ where: { id: ctx.user.id } })
    user.setDataValue('avatar', avatar)
    await user.save()
    return user.toJSON()
  },
  verifyTokenWithGoogle: async (
    root: any,
    { token }: verifyTokenWithGoogleParams,
    ctx: any
  ): Promise<any> => {
    console.log('token:', token)

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    console.info(payload)
    let user = await User.findOne({ where: { email: payload.email } })

    if (!user) {
      user = await createUSer(payload.name, payload.email, '')
    }

    const result = {
      user,
      jwt: jwt.encode({ email: payload.email }, process.env.JWT_SECRET)
    }

    console.info('result: ', result)

    return result
  }
}
