import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserModel, { IUser } from '../models/userModel'

interface IVerify extends JwtPayload { uid: string, iat: number, exp: number }

export const validateJWT = async (req: Request, resp: Response, next: any): Promise<any> => {
  const token = req.header('auth-token')
  const key = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : ''
  if (token === undefined) {
    return resp.status(401).json({
      errors: [{
        msg: 'Empty token'
      }]
    })
  }
  try {
    const payload = jwt.verify(token, key) as IVerify
    const user = await UserModel.findOne<IUser>({ _id: payload.uid })

    if (user === null || !user.live) {
      return resp.status(401).json({
        errors: [{
          msg: 'User has been deleted or does´t exist in db'
        }]
      })
    }

    req.userAuth = user
    next()
  } catch (error) {
    console.log(error)
    return resp.status(401).json({
      errors: [{
        msg: 'Invalid token'
      }]
    })
  }
}
