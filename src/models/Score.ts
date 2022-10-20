import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/database'
import User from './User'
export default class Score extends Model {}
Score.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    points: {
      type: DataTypes.INTEGER
    }
  },
  { sequelize, modelName: 'scores' }
)

Score.belongsTo(User, {
  as: 'user',
  targetKey: 'id',
  foreignKey: { name: 'user_id' }
})
