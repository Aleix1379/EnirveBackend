import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/database'
import IrregularVerb from './IrregularVerb'
import User from './User'

export default class Result extends Model {}
Result.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'result'
  }
)

Result.belongsTo(IrregularVerb, {
  as: 'verb',
  targetKey: 'id',
  foreignKey: { name: 'verb_id' }
})
Result.belongsTo(User, {
  as: 'userId',
  targetKey: 'id',
  foreignKey: { name: 'user_id' }
})
