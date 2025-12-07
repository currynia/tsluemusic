import 'dotenv/config'
import { writeMusicTagsToDB } from './library/access.js'
import { startServer } from './server.js'
import { dropDatabase } from './library/db.js'

const startUp = () => {
  writeMusicTagsToDB()
}

const main = () => {
  startUp()
  startServer()
}

await dropDatabase()
main()
