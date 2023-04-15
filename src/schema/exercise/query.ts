import Exercise from '../../models/Exercise'
import { Sequelize } from 'sequelize'

interface ExerciseParams {
  level: 'easy' | 'medium' | 'hard'
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
    { level, numberOfQuestions }: ExerciseParams
  ) => {
    try {
      const ids = await Exercise.findAll({
        attributes: ['id'],
        where: {
          level: level
        }
      }).then((exercises: Exercise[]) => {
        return exercises.map(exercise => exercise.id)
      })

      const randomIds = ids
        .sort(() => Math.random() - 0.5)
        .slice(0, numberOfQuestions)

      let exercises: Array<Exercise> = await Exercise.findAll({
        attributes: ['id', 'words', 'help', 'level', 'answers'],
        where: {
          id: randomIds
        },
        order: [['id', 'ASC']]
      })

      exercises = exercises.map((exercise: Exercise) => {
        const answers = shuffleArray(exercise.answers)
        exercise.setDataValue('answers', answers)
        return exercise
      })

      // return exercises in the same order as randomIds
      exercises = randomIds.map(id =>
        exercises.find(exercise => exercise.id === id).toJSON()
      )

      return exercises
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while fetching exercises')
    }
  },
  exercisesList: async () => {
    try {
      return await Exercise.findAll({
        attributes: ['id', 'help', 'level', 'words', 'answers'],
        order: [['id', 'ASC']]
      })
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while fetching exercises')
    }
  },
  exerciseTemplate: async (): Promise<Array<ExerciseTemplate>> => {
    try {
      return (
        await Exercise.findAll({
          attributes: ['level', [Sequelize.fn('count', '*'), 'count']],
          group: ['level']
        })
      ).map((exercise: Exercise) => {
        return {
          level: exercise.getDataValue('level'),
          quantity: exercise.getDataValue('count')
        }
      })
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while fetching exercise template')
    }
  }
}
