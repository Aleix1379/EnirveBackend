import User from '../../models/User'
import { UserResult } from 'results'

interface UpdateUserResultsParams {
  results: Array<UserResult>
}

export const ResultMutation = {
  updateUserResults: async (
    root: any,
    { results = [] }: UpdateUserResultsParams,
    ctx: any
  ) => {
    if (!ctx.user) {
      throw new Error('Not authenticated')
    }

    const user: User = await User.findOne({ where: { id: ctx.user.id } })

    const currentResults = user.results
    user.results = currentResults.map((item: UserResult) => {
      const element = results.find(it => it.verbId === item.verbId)
      if (!element) {
        return item
      }
      return {
        ...item,
        ...element
      }
    })
    await user.save()
    return true
  }
}
