import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/database'

export default class Exercise extends Model {}
Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    help: { type: DataTypes.TEXT },
    level: { type: DataTypes.STRING },
    sentence: { type: DataTypes.STRING },
    answers: { type: DataTypes.JSON }
  },
  { sequelize, modelName: 'exercise' }
)
