import crypto from 'crypto'
import config from '../../config'

export default (message) => {
  return new Promise((resolve) => {
    const { secret, algorithm, bytes, encode } = config.crypto

    const key = crypto.scryptSync(secret, 'salt', bytes)
    const iv = Buffer.alloc(16, 0)
    const cipher = crypto.createCipheriv(algorithm, key, iv)

    let encrypted = ''

    cipher.on('readable', () => {
      let chunk = null
      while (null !== (chunk = cipher.read())) {
        encrypted += chunk.toString(encode)
      }
    })

    cipher.on('end', () => {
      resolve(encrypted)
    })

    cipher.write(message)
    cipher.end()
  })
}
