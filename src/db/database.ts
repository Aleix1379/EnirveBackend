import { Sequelize } from 'sequelize'

const getSSLConfig = () => {
  if (process.env.NODE_ENV === 'DEV') {
    return null
  }

  return {
    require: true,
    rejectUnauthorized: false
  }
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: getSSLConfig()
  }
})

const connect = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      sequelize.authenticate().then(() => {
        console.log('Postgres connection has been established successfully.')
        sequelize
          .sync({ alter: true })
          .then(() => {
            console.log('sequelize synced successfully.')
            resolve(true)
          })
          .catch(error => {
            console.error(error)
            reject(error)
          })
      })
    } catch (error) {
      console.error('Unable to connect to the database:', error)
      reject(error)
    }
  })
}

export { sequelize, connect }
