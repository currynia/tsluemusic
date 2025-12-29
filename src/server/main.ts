import 'dotenv/config'
import { writeMusicTagsToDB } from './library/access.js'
import { startServer } from './server.js'
import { gt } from './library/gdrive/generateToken.js'

const startUp = () => {
  writeMusicTagsToDB()
}

const main = () => {
  // startUp()
  startServer()
}
// await gt
main()
