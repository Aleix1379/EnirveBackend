import Score from '../../models/Score'
import { Points } from 'score'
import dayjs from 'dayjs'

const getPointsByDates = (values: Array<any>) => {
  const points: Points = {
    day: 0,
    week: 0,
    month: 0,
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
  points.total = values.map(item => item.points).reduce((a, b) => a + b, 0)
  return points
}

export const ScoreQuery = {
  points: async (root: any, params: any, ctx: any) => {
    if (ctx.user) {
      console.info('ctx.user:', ctx.user)
      const score = await Score.findAll({
        where: { user_id: ctx.user.id }
      })

      const points = getPointsByDates(score)
      console.info('points:', points)
      return points
    }
  }
}
