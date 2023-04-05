import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/database'
export default class IrregularVerb extends Model {}
IrregularVerb.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    present: { type: DataTypes.STRING },
    simple: { type: DataTypes.STRING },
    participle: { type: DataTypes.STRING }
  },
  { sequelize, modelName: 'irregular_verbs' }
)
