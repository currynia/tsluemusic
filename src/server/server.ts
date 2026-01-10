import express from 'express'
import path from 'path'
import { apiRouter } from './routes/api.js'

export const startServer = () => {
  const server = express()
  const port = 3001

  server.use(express.static(path.join('dist', 'client')))

  server.get('/', (req, res) => {
    res.sendFile(path.join('dist/client', 'index.html'))
  })

  server.use('/api', apiRouter)

  server.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port http://0.0.0.0:${port}`)
  })
}
