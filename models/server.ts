/* eslint-disable @typescript-eslint/restrict-template-expressions */
import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/userRoutes'
import { dbConnection } from '../database/config'

class Server {
  app
  port
  usersPath
  connectionToDB

  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.connectionToDB = 'mongodb+srv://dva-rest-server:eGxvlRj1BzEVYCiR@dvacluster.tdhqu.mongodb.net/dvaDB'
    this.usersPath = '/api/users'

    // Middlewares
    this.middlewares()

    // DB Connection
    this.dbConnection()

    // Routes
    this.routes()
  }

  dbConnection (): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dbConnection(this.connectionToDB)
  }

  middlewares (): void {
    // Public directory
    this.app.use(express.static('public'))

    // CORS
    this.app.use(cors())

    // JSON input parser
    this.app.use(express.json())
  }

  routes (): void {
    this.app.use(this.usersPath, userRoutes)
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Server runnin on port ${this.port}`)
    })
  }
}

export default Server
