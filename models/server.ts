/* eslint-disable @typescript-eslint/restrict-template-expressions */
import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/userRoutes'

class Server {
  app
  port
  usersPath

  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'

    // Middlewares
    this.middlewares()

    // Routes
    this.routes()
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
      // LOG:
      console.log(`Server runnin on port ${this.port}`)
    })
  }
}

export default Server
