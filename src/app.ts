import 'dotenv/config'
import express from 'express'
import * as db from './db/database'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema/typeDefs'
import { resolvers } from './schema/resolvers'
import jwt from 'jwt-simple'
import User from './models/User'

db.connect().catch(error => console.error(error))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || ''

    if (token) {
      try {
        const { email } = jwt.decode(
          token.replace('Bearer ', ''),
          process.env.JWT_SECRET
        )
        const user = await User.findOne({
          where: {
            email: email
          }
        })
        return { user: user.toJSON() }
      } catch (error) {
        console.error(error)
      }
    }
    return {
      user: null
    }
  }
})
const app = express()
const corsOptions = {
  origin: '*',
  credentials: true,
  exposedHeaders: ['Authorization']
}
server
  .start()
  .then(() => {
    server.applyMiddleware({ app, cors: corsOptions, path: '/' })
    app.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      )
    )
  })
  .catch(error => console.error(error))
