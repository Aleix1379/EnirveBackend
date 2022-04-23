import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  'postgres://postgres:42+42+564@localhost:5432/enirve'
)
const connect = () => {
  try {
    sequelize.authenticate().then(() => {
      console.log('Postgres connection has been established successfully.')
      sequelize
        .sync()
        .then(() => {
          console.log('sequelize synced successfully.')
        })
        .catch(error => console.error(error))
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
export { sequelize, connect }
