/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'
import userModel, { IUser } from '../models/userModel'
import bcryptjs from 'bcryptjs'
import { generateJWT } from '../utils/jsonWT'

export const login = async (req: Request, resp: Response) => {
  const { email, password } = req.body

  try {
    // Validate if email exist
    const user = await userModel.findOne<IUser>({ email })
    if (user == null) {
      return resp.status(400).json({
        errors: [{
          msg: 'Email invalid'
        }]
      })
    }

    // Validate if user is live
    if (user.live === false) {
      return resp.status(400).json({
        errors: [{
          msg: 'User is dead'
        }]
      })
    }

    // Validate password
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return resp.status(400).json({
        errors: [{
          msg: "Password isn't valid"
        }]
      })
    }

    // Generate JWT
    const token = await generateJWT(user.id)
    user.token = token

    resp.json(user)
  } catch (error) {
    console.log(error)
    return resp.status(500).json({
      errors: [{
        msg: 'Upss! contact the site administrator'
      }]
    })
  }
}
