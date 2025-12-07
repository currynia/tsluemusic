import express from 'express'
import { constants } from '../../constants.js'
import { getAllMusicFiles } from '../library/db.js'
import { getMimeType, getMusicFileBuffer } from '../library/access.js'

const getPlaylistApi = express
  .Router()
  .get(`/${constants.paths.apiGetPlayList}`, async (req, res) => {
    res.send(await getAllMusicFiles())
  })

const getMusicFileBufferApi = express
  .Router()
  .get(`/${constants.paths.apiGetMusicFileBuffer}`, async (req, res) => {
    try {
      const fp = req.query.fp!.toString()
      const fileName = req.query.fileName!.toString()

      res.type(getMimeType(fileName, fp)).send(await getMusicFileBuffer(fileName, fp))
    } catch (err) {
      console.error(err)
      res.send('err')
    }
  })

export const apiRouter = express.Router()
apiRouter.use('/', getPlaylistApi)
apiRouter.use('/', getMusicFileBufferApi)
