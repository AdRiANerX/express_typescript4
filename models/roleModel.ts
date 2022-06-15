import mongoose, { Schema, model } from 'mongoose'

export interface IRole extends mongoose.Document {
  role: string
}

const RoleSchema = new Schema<IRole>({
  role: {
    type: String,
    required: [true, 'Role is required']
  }
})

export default model('Role', RoleSchema)
