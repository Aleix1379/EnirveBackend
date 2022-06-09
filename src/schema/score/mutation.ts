import Score from '../../models/Score'

interface AddPointsParams {
  points: number
}

export const ScoreMutation = {
  addPoints: async (root: any, { points }: AddPointsParams, ctx: any) => {
    if (ctx.user) {
      await Score.create({
        points,
        user_id: ctx.user.id
      })
      return true
    }
    return false
  }
}
