import User from '../../models/User'
import { Profile } from 'profile'

export const UserQuery = {
  profile: async (root: any, args: any, ctx: any) => {
    const user: Profile = ctx.user

    if (!user) {
      throw new Error('Not authenticated')
    }

    return User.findOne({ where: { id: user.id } })
  },
  findOne: async (root: any, args: any, ctx: any) => {
    const { filter } = args
    return User.findOne({ where: filter })
  }
}
