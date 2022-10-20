import Result from '../../models/Result'
import User from '../../models/User'

interface VerbResult {
  id: number
  verb: VerbResult
  completed: boolean
}

interface UpdateUserResultsParams {
  userId: number
  results: Array<VerbResult>
}
export const ResultMutation = {
  updateUserResults: async (
    root: any,
    { userId, results = [] }: UpdateUserResultsParams
  ) => {
    console.info('updateUserResults | userId:', userId)
    console.info('updateUserResults | results:', results)

    const user: User = await User.findOne({ where: { id: userId } })

    const currentResults = user.getDataValue('results')
    if (currentResults) {
      user.setDataValue(
        'results',
        currentResults.map(item => {
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
      results.forEach(it => {
        Result.update(it, { where: { id: it.id } })
      })
    }
    return true
  }
}
