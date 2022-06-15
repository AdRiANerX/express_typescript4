import RoleModel, { IRole } from '../../models/roleModel'
import UserModel, { IUser } from '../../models/userModel'

export const roleValidator = async (role: string): Promise<void> => {
  const existRole = await RoleModel.findOne<IRole>({ role })
  if (existRole == null) {
    if (role === undefined) {
      throw new Error('Role is required')
    } else {
      throw new Error(`${role} doesn´t exist in DB`)
    }
  }
}

export const emailAlreadyExist = async (email: string): Promise<void> => {
  const existEmail = await UserModel.findOne<IUser>({ email })
  if (existEmail != null) {
    if (email === undefined) {
      throw new Error('Email is required')
    } else {
      throw new Error(`${email} already exist in DB`)
    }
  }
}

export const idValidator = async (id: string): Promise<void> => {
  const existId = await UserModel.findById<IUser>(id)
  if (existId == null) {
    throw new Error(`This id:${id} doesn't exist in DB`)
  }
}
