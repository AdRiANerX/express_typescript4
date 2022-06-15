/* eslint-disable @typescript-eslint/no-misused-promises */
import Router from 'express'
import { check } from 'express-validator'
import { deleteUser, getUsers, postUser, putUser } from '../controllers/userController'
import { validateFields } from '../middlewares/validateFields'
import { roleValidator, emailAlreadyExist, idValidator } from '../middlewares/dbValidators/dbValidators'

const userRoutes = Router()

userRoutes.get('/', getUsers)

userRoutes.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is invalid').isEmail(),
  check('email').custom(emailAlreadyExist),
  check('password', 'Required password with min 8 characters').isLength({ min: 8 }),
  check('role').custom(roleValidator),
  validateFields
], postUser)

userRoutes.put('/:id', [
  check('id', "Parameter 'id' valid is required").isMongoId(),
  check('id').custom(idValidator),
  validateFields
], putUser)

userRoutes.delete('/:id', [
  check('id', "Parameter 'id' valid is required").isMongoId(),
  check('id').custom(idValidator),
  validateFields
], deleteUser)

export default userRoutes
