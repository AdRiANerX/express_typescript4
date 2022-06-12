import Router from 'express'
import { deleteUSer, getUsers, postUser, putUser } from '../controllers/userController'

const userRoutes = Router()

userRoutes.get('/', getUsers)
userRoutes.post('/', postUser)
userRoutes.put('/:id', putUser)
userRoutes.delete('/', deleteUSer)

export default userRoutes
