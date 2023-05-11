import User from '../../models/User'
import jwt from 'jwt-simple'
import bcrypt from 'bcrypt'
import { verbs } from '../../db/irregular-verbs'
import { Verb } from 'verb'
import { Profile } from 'profile'
import { OAuth2Client } from 'google-auth-library'
import { UserResult } from 'results'
import crypto from 'crypto'
import appleSigninAuth from 'apple-signin-auth'

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

interface UpdateUserParams {
  username: string
  email: string
}

interface UpdateUserAvatarResponse {
  user: Profile
}

interface VerifyTokenWithParams {
  token: string
  nonce?: string
  username?: string
}

interface VerifyWithTokenResponse {
  jwt: string
  user: Profile
}

const saltRounds = 10

const createUSer = async (username: string, email: string, password = '') => {
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    const results: Array<UserResult> = verbs.map((verb: Verb) => ({
      verbId: verb.id,
      completed: false
    }))

    return await User.create({
      username,
      email,
      password: hash,
      results
    })
  } catch (error) {
    console.error('create user:', error)
  }
}

export const UserMutation = {
  login: async (
    root: any,
    { email, password }: LoginParams
  ): Promise<SignResponse> => {
    const user = await User.findOne({ where: { email } })
    if (!user || !password) {
      throw new Error('You have entered an invalid username or password')
    }
    const result = await bcrypt.compare(password, user.password)
    if (!result) {
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
      jwt: jwt.encode({ email }, process.env.JWT_SECRET)
    }
  },
  updateUserAvatar: async (
    root: any,
    { avatar }: UpdateUserAvatarParams,
    ctx: any
  ): Promise<UpdateUserAvatarResponse> => {
    if (!ctx.user) {
      throw new Error('Not authenticated')
    }

    const user: User = await User.findOne({ where: { id: ctx.user.id } })
    user.setDataValue('avatar', avatar)
    await user.save()
    return user.toJSON()
  },
  verifyTokenWithGoogle: async (
    root: any,
    { token }: VerifyTokenWithParams,
    ctx: any
  ): Promise<VerifyWithTokenResponse> => {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    let user = await User.findOne({ where: { email: payload.email } })

    if (!user) {
      user = await createUSer(payload.name, payload.email, '')
    }

    return {
      user: user.toJSON(),
      jwt: jwt.encode({ email: payload.email }, process.env.JWT_SECRET)
    }
  },
  updateProfile: async (
    root: any,
    { username, email }: UpdateUserParams,
    ctx: any
  ): Promise<VerifyWithTokenResponse> => {
    if (!ctx.user) {
      throw new Error('Not authenticated')
    }

    const user: User = await User.findOne({ where: { id: ctx.user.id } })
    user.setDataValue('username', username)
    user.setDataValue('email', email)
    await user.save()
    return user.toJSON()
  },
  verifyTokenWithApple: async (
    root: any,
    { token, nonce, username }: VerifyTokenWithParams,
    ctx: any
  ): Promise<VerifyWithTokenResponse> => {
    const appleIdTokenClaims = await appleSigninAuth.verifyIdToken(token, {
      /** sha256 hex hash of raw nonce */
      nonce: nonce
        ? crypto.createHash('sha256').update(nonce).digest('hex')
        : undefined
    })

    let user = await User.findOne({
      where: { email: appleIdTokenClaims.email }
    })

    if (!username) {
      const emailParts = appleIdTokenClaims.email.split('@')
      username = emailParts[0]
    }

    if (!user) {
      user = await createUSer(username, appleIdTokenClaims.email, '')
    }

    return {
      user: user.toJSON(),
      jwt: jwt.encode(
        { email: appleIdTokenClaims.email },
        process.env.JWT_SECRET
      )
    }
  },
  removeAccount: async (root: any, args: any, ctx: any): Promise<boolean> => {
    if (!ctx.user) {
      throw new Error('Not authenticated')
    }

    const user: User = await User.findOne({ where: { id: ctx.user.id } })
    await user.destroy()
    return true
  }
}
