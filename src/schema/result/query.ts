import Result from '../../models/Result'
import { sequelize } from '../../db/database'
import User from '../../models/User'
import IrregularVerb from '../../models/IrregularVerb'
import { UserResult } from 'results'

interface ResultParams {
  userId: number
}

export const ResultQuery = {
  userResults: async (root: any, { userId }: ResultParams) => {
    const user: User = await User.findOne({ where: { id: userId } })
    const verbs = await IrregularVerb.findAll()

    const data = user.getDataValue('results')
    if (data) {
      const values: Array<UserResult> = []

      data.forEach((item: UserResult) => {
        const verb = verbs.find(v => v.getDataValue('id') === item.verbId)
        values.push({
          completed: item.completed,
          verb
        })
      })

      return values
    }

    return Result.findAll({
      where: { user_id: userId },
      include: 'verb',
      order: sequelize.col('id')
    })
  }
}
