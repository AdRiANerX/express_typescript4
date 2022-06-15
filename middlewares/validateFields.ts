import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validateFields = async (req: Request, resp: Response, next: any): Promise<any> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return resp.status(400).json({
      errors
    })
  }
  next()
}
