import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as db from './db/database'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema/typeDefs'
import { resolvers } from './schema/resolvers'
import jwt from 'jwt-simple'
import User from './models/User'
import { sendMail } from './mail/mail'
import https from 'https' // Import https module
import fs from 'fs' // Import fs module

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

app.use(cors())
app.use(bodyParser.json())

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
    server.applyMiddleware({ app, path: '/' })

    // Create HTTPS server
    const httpsServer = https.createServer({
      key: fs.readFileSync('/etc/letsencrypt/live/aleixmp.dev/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/aleixmp.dev/fullchain.pem')
    }, app)

    httpsServer.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(
        `🚀 Server ready at https://localhost:${process.env.PORT}${server.graphqlPath}`
      )
    )
  })
  .catch(error => console.error(error))
