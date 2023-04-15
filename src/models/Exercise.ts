import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/database'

export default class Exercise extends Model {
  public id!: number
  public help!: string
  public level!: string
  public words!: Array<Word>
  public answers!: Array<Answer>

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    help: { type: DataTypes.TEXT },
    level: { type: DataTypes.STRING },
    words: { type: DataTypes.JSON },
    answers: { type: DataTypes.JSON }
  },
  { sequelize, modelName: 'exercise' }
)
