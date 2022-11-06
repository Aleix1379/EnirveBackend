import User from '../../models/User'
import IrregularVerb from '../../models/IrregularVerb'
import { UserResult, UserResultResponse } from 'results'

interface ResultParams {
  userId: number
}

export const ResultQuery = {
  userResults: async (root: any, { userId }: ResultParams) => {
    const user: User = await User.findOne({ where: { id: userId } })
    const verbs = await IrregularVerb.findAll()

    const data = user.getDataValue('results')
    const values: Array<UserResultResponse> = []

    data.forEach((item: UserResult) => {
      const verb = verbs.find(v => v.getDataValue('id') === item.verbId)
      values.push({
        completed: item.completed,
        verb: {
          id: verb.getDataValue('id'),
          present: verb.getDataValue('present'),
          simple: verb.getDataValue('simple'),
          participle: verb.getDataValue('participle')
        }
      })
    })

    return values
  }
}
