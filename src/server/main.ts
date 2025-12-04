import { writeMusicTagsToDB } from './library/access.js'
import { startServer } from './server.js'
import 'dotenv/config'
const startUp = () => {
  writeMusicTagsToDB()
}

const main = () => {
  startUp()
  startServer()
}

main()
