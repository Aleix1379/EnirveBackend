import Score from '../../models/Score'

interface AddPointsParams {
  points: number
}

export const ScoreMutation = {
  addPoints: async (root: any, { points }: AddPointsParams, ctx: any) => {
    if (ctx.user) {
      throw new Error('Not authenticated')
    }
    await Score.create({
      points,
      user_id: ctx.user.id
    })
    return true
  }
}
