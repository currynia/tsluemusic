import express from 'express'
import path from 'path'
import { getAllMusicFiles } from './library/access.js'

export const startServer = () => {
  const server = express()
  const port = 3000

  server.use(express.static(path.join('dist', 'client')))

  server.get('/', (req, res) => {
    res.sendFile(path.join('dist/client', 'index.html'))
  })
  server.get('/api/getAllMusicFileList', async (req, res) => {
    res.send(await getAllMusicFiles())
  })
  server.listen(port, () => {
    console.log(`App listening on port http://127.0.0.1:${port}`)
  })
}
