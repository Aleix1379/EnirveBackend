import Score from '../../models/Score'
import { Points } from 'score'
import dayjs from 'dayjs'
import User from '../../models/User'
import { sequelize } from '../../db/database'

const RANKING_DEFAULT_START = 0
const RANKING_DEFAULT_LIMIT = 50

interface RankingParams {
  start?: number
  limit?: number
}

const getPointsByDates = (values: Array<Score>) => {
  const points: Points = {
    day: 0,
    week: 0,
    month: 0,
    year: 0,
    total: 0
  }
  points.day = values
    .filter(
      v => dayjs(Number(v.createdAt)).unix() >= dayjs().subtract(1, 'd').unix()
    )
    .map(item => item.points)
    .reduce((a, b) => a + b, 0)
  points.week = values
    .filter(
      v => dayjs(Number(v.createdAt)).unix() >= dayjs().subtract(1, 'w').unix()
    )
    .map(item => item.points)
    .reduce((a, b) => a + b, 0)
  points.month = values
    .filter(
      v => dayjs(Number(v.createdAt)).unix() >= dayjs().subtract(1, 'M').unix()
    )
    .map(item => item.points)
    .reduce((a, b) => a + b, 0)
  points.year = values
    .filter(
      v => dayjs(Number(v.createdAt)).unix() >= dayjs().subtract(1, 'y').unix()
    )
    .map(item => item.points)
    .reduce((a, b) => a + b, 0)
  points.total = values.map(item => item.points).reduce((a, b) => a + b, 0)
  return points
}

export const ScoreQuery = {
  points: async (root: any, params: any, ctx: any) => {
    if (!ctx.user) {
      throw new Error('Not authenticated')
    }

    const score = await Score.findAll({
      where: { user_id: ctx.user.id }
    })

    return getPointsByDates(score)
  },
  ranking: async (root: any, params: RankingParams) => {
    const start = params.start ?? RANKING_DEFAULT_START
    const limit = params.limit ?? RANKING_DEFAULT_LIMIT

    const data = await Score.findAll({
      attributes: [
        [
          sequelize.literal(
            'ROW_NUMBER () OVER (ORDER BY SUM("scores"."points") desc )'
          ),
          'position'
        ],
        [sequelize.fn('SUM', sequelize.col('scores.points')), 'points'],
        [sequelize.col('user.username'), 'username'],
        [sequelize.col('user.avatar'), 'avatar']
      ],
      include: [
        {
          model: User,
          attributes: ['username'],
          required: true,
          as: 'user'
        }
      ],
      offset: start,
      limit,
      group: ['user.id', 'user.username']
    })

    return data.map(it => it.toJSON())
  }
}
