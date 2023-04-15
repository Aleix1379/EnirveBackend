import User from '../../models/User'
import IrregularVerb from '../../models/IrregularVerb'
import { UserResult, UserResultResponse } from 'results'

export const ResultQuery = {
  userResults: async (
    root: any,
    {},
    ctx: any
  ): Promise<Array<UserResultResponse>> => {
    if (!ctx.user) {
      const data = await IrregularVerb.findAll()

      return data.map((verb: IrregularVerb) => {
        return {
          verb: {
            id: verb.id,
            present: verb.present
          },
          completed: false
        }
      })
    }

    const user: User = await User.findOne({ where: { id: ctx.user.id } })
    const verbs = await IrregularVerb.findAll()

    const data = user.results
    const values: Array<UserResultResponse> = []

    data.forEach((item: UserResult) => {
      const verb = verbs.find(v => v.id === item.verbId)
      values.push({
        completed: item.completed,
        verb: {
          id: verb.id,
          present: verb.present,
          simple: verb.simple,
          participle: verb.participle
        }
      })
    })

    return values
  }
}
