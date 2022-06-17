declare namespace Express {
  import { IUser } from '../../models/userModel'
  export interface Request {
    userAuth: IUser
  }
}
