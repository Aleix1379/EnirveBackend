import Result from '../../models/Result'
import User from '../../models/User'
import { UserResult } from 'results'

interface VerbResult {
  id: number
  verb: VerbResult
  completed: boolean
}

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
    if (currentResults) {
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
    } else {
      results.forEach((it: any) => {
        Result.update(it, { where: { id: it.id } })
      })
    }
    return true
  }
}
