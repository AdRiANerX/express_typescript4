/* eslint-disable @typescript-eslint/no-misused-promises */
import Router from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/loginController'

import { validateFields } from '../middlewares/validateFields'

const authRoute = Router()

// authRoute.get('/', getUsers)

authRoute.post('/login', [
  check('email', 'Email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields
], login)

export default authRoute
