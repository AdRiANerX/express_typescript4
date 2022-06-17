/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import UserModel, { IUser } from '../models/userModel'
import bcryptjs from 'bcryptjs'

export const getUsers = async (_req: Request, resp: Response) => {
  const users = await UserModel.find<IUser>({ live: true })
  resp.json({ data: users })
}

export const postUser = async (req: Request, resp: Response) => {
  const { name, email, password, role } = req.body
  const user: HydratedDocument<IUser> = new UserModel({
    name, email, password, role, live: true
  })

  // Verificar si los valores  existen

  // Encrypt password
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // Save Data
  await user.save()

  resp.json({
    data: [],
    user
  })
}

export const putUser = async (req: Request, resp: Response) => {
  const { id } = req.params
  const userBody = req.body
  delete userBody._id

  const { name } = userBody

  const userUpdated = await UserModel.findByIdAndUpdate<IUser>(id, { name })
  resp.json({
    id, userUpdated
  })
}

export const deleteUser = async (req: Request, resp: Response) => {
  const { id } = req.params

  // Change state to delete
  const user = await UserModel.findByIdAndUpdate<IUser>(id, { live: false })
  resp.json({ id, user })
}
