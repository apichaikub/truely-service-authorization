import crypto from 'crypto'
import config from '../../config'

export default (encrypted) => {
  return new Promise((resolve, reject) => {
    const { secret, algorithm, bytes, encode } = config.crypto

    const key = crypto.scryptSync(secret, 'salt', bytes)
    const iv = Buffer.alloc(16, 0)
    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    let decrypted = ''

    decipher.on('readable', () => {
      let chunk = null
      while (null !== (chunk = decipher.read())) {
        decrypted += chunk.toString('utf8')
      }
    })

    decipher.on('end', () => {
      resolve(decrypted)
    })

    decipher.write(encrypted, encode)
    decipher.end()
  })
}
