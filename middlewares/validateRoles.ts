/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express'
import { IUser } from '../models/userModel'

const userIsAuth = (user: IUser, resp: Response): any => {
  if (user === undefined) {
    return resp.status(500).json({
      errors: [{
        msg: 'The user hasn´t been validated'
      }]
    })
  }
}

export const isAdmin = async (req: Request, resp: Response, next: any): Promise<any> => {
  userIsAuth(req.userAuth, resp)
  if (req.userAuth.role !== 'ADMIN') {
    return resp.status(401).json({
      errors: [{
        msg: `The user ${req.userAuth.name} doesn´t is ADMINISTRATOR`
      }]
    })
  }
  next()
}

export const hasRole = (roles: string[]): any => {
  return async (req: Request, resp: Response, next: any): Promise<any> => {
    userIsAuth(req.userAuth, resp)
    if (!roles.includes(req.userAuth.role)) {
      return resp.status(401).json({
        errors: [{
          msg: `The user ${req.userAuth.name} doesn´t belong ${roles} role`
        }]
      })
    }
    next()
  }
}
