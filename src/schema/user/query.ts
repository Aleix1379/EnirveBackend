import User from '../../models/User'
import { Profile } from 'profile'

export const UserQuery = {
  profile: async (root: any, args: any, ctx: any) => {
    const user: Profile = ctx.user
    return User.findOne({ where: { id: user.id } })
  }
}
