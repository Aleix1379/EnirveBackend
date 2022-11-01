import User from '../../models/User'
import { UserResult } from 'results'

interface UpdateUserResultsParams {
  userId: number
  results: Array<UserResult>
}
export const ResultMutation = {
  updateUserResults: async (
    root: any,
    { userId, results = [] }: UpdateUserResultsParams
  ) => {
    const user: User = await User.findOne({ where: { id: userId } })

    const currentResults = user.getDataValue('results')
    user.setDataValue(
      'results',
      currentResults.map((item: UserResult) => {
        const element = results.find(it => it.verbId === item.verbId)
        if (!element) {
          return item
        }
        return {
          ...item,
          ...element
        }
      })
    )
    await user.save()
    return true
  }
}
