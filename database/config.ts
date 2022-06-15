import mongoose from 'mongoose'

export const dbConnection = async (connection: string): Promise<any> => {
  try {
    await mongoose.connect(connection)
    console.log('Online database')
  } catch (error) {
    console.log(error)
    throw new Error('Database error connection')
  }
}
