import Result from '../../models/Result'

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
    results.forEach(it => {
      Result.update(it, { where: { id: it.id } })
    })
    return true
  }
}
