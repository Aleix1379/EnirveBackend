import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/database'
export default class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'avatar1.png'
    }
  },
  { sequelize, modelName: 'user' }
)
