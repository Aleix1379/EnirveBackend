import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/database'
export default class Quote extends Model {}
Quote.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    phrase: DataTypes.STRING,
    quotee: DataTypes.STRING
  },
  { sequelize, modelName: 'quote' }
)
