import { Request, Response } from 'express'

export const getUsers = (req: Request, resp: Response): void => {
  const query = req.query
  resp.json({
    data: [],
    query
  })
}

export const postUser = (req: Request, resp: Response): any => {
  const body = req.body
  resp.json({
    data: [],
    body
  })
}

export const putUser = (req: Request, resp: Response): any => {
  const { id } = req.params
  resp.json(id)
}

export const deleteUSer = (_req: Request, resp: Response): any => {
  console.log('someone pinged here!!  ')
  resp.json('delete desde controlador')
}
