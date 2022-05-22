import Result from '../../models/Result'
import { sequelize } from '../../db/database'

interface ResultParams {
  userId: number
}

export const ResultQuery = {
  userResults: async (root: any, { userId }: ResultParams) => {
    return Result.findAll({
      where: { user_id: userId },
      include: 'verb',
      order: sequelize.col('id')
    })
  }
}
