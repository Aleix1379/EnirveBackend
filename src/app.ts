import 'dotenv/config'
import express from 'express'
import cors from 'cors' // import cors
import bodyParser from 'body-parser'
import * as db from './db/database'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema/typeDefs'
import { resolvers } from './schema/resolvers'
import jwt from 'jwt-simple'
import User from './models/User'
import { sendMail } from './mail/mail'

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

app.use(cors()) // add cors middleware
app.use(bodyParser.json())

// set up endpoint for contact form /api/contact
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body
    await sendMail({ name, email, message })
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

server
  .start()
  .then(() => {
    server.applyMiddleware({ app, path: '/' }) // remove cors options here
    app.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      )
    )
  })
  .catch(error => console.error(error))
