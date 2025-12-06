import express from 'express'
import path from 'path'
import { apiRouter } from './routes/api.js'

export const startServer = () => {
  const server = express()
  const port = 3000

  server.use(express.static(path.join('dist', 'client')))

  server.get('/', (req, res) => {
    res.sendFile(path.join('dist/client', 'index.html'))
  })

  server.use('/api', apiRouter)

  server.listen(port, () => {
    console.log(`App listening on port http://127.0.0.1:${port}`)
  })
}
