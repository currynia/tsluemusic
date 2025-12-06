import express from 'express'
import { constants } from '../../constants.js'
import { getAllMusicFiles } from '../library/access.js'

const getPlaylistApi = express
  .Router()
  .get(`/${constants.paths.apiGetPlayList}`, async (req, res) => {
    res.send(await getAllMusicFiles())
  })

export const apiRouter = express.Router()
apiRouter.use('/', getPlaylistApi)
