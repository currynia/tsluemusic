import express from 'express'
import { constants } from '../../constants.js'
import { getAllMusicFiles } from '../library/db.js'

const getPlaylistApi = express
  .Router()
  .get(`/${constants.paths.apiGetPlayList}`, async (req, res) => {
    console.log(await getAllMusicFiles())
    res.send(await getAllMusicFiles())
  })

export const apiRouter = express.Router()
apiRouter.use('/', getPlaylistApi)
