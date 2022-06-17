import jwt from 'jsonwebtoken'

export const generateJWT = async (uid = ''): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { uid }
    const key: string = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : ''
    jwt.sign(payload, key, {
      expiresIn: '1h'
    }, (error, token) => {
      if (error != null) {
        console.log(error)
        reject(new Error('Error with JWT'))
      } else {
        resolve(token as string)
      }
    })
  })
}
