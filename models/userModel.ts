import mongoose, { Schema, model } from 'mongoose'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
  role: string
  live?: boolean
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  live: {
    type: Boolean
  }
})

// Return JSON without unused values
UserSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  delete obj.__v
  return obj
}

export default model<IUser>('User', UserSchema)
