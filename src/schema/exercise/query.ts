import Exercise from '../../models/Exercise'
import { Answer } from 'exercise'

interface ExerciseParams {
  levels: Array<'beginner' | 'intermediate'>
  numberOfQuestions: number
}

const shuffleArray = (array: Array<Answer>): Array<Answer> => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const ExerciseQuery = {
  exercises: async (
    root: any,
    { levels, numberOfQuestions }: ExerciseParams
  ) => {
    try {
      console.info('levels', levels)
      console.info('numberOfQuestions', numberOfQuestions)
      const ids = await Exercise.findAll({
        attributes: ['id'],
        where: {
          level: levels
        }
      }).then((exercises: Exercise[]) => {
        return exercises.map(exercise => exercise.getDataValue('id'))
      })

      const randomIds = ids
        .sort(() => Math.random() - 0.5)
        .slice(0, numberOfQuestions)

      let exercises = await Exercise.findAll({
        attributes: ['id', 'sentence', 'help', 'level', 'answers'],
        where: {
          id: randomIds
        },
        order: [['id', 'ASC']]
      })

      exercises = exercises.map((exercise: Exercise) => {
        const answers = shuffleArray(exercise.getDataValue('answers'))
        return {
          ...exercise.dataValues,
          answers
        }
      })

      // return exercises in the same order as randomIds
      exercises = randomIds.map(id => {
        return exercises.find(exercise => exercise.id === id)
      })

      return exercises
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while fetching exercises')
    }
  }
}
