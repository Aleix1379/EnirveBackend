import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/database'
export default class User extends Model {
  public id!: number
  public username!: string
  public email!: string
  public password!: string
  public avatar!: string
  public results!: Array<any>
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

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
      defaultValue: 'avatar1'
    },
    results: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  },
  { sequelize, modelName: 'user' }
)
