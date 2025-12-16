import express from 'express'
import { constants } from '../../constants.js'
import { getAllMusicFiles, getMusicFilePath, getTagsByName } from '../library/db.js'
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
      const fileName = req.query.fileName!.toString()
      const fp = req.query.fp?.toString() || (await getMusicFilePath(fileName))

      if (fp) {
        res.type(getMimeType(fileName, fp)).send(await getMusicFileBuffer(fileName, fp))
      } else {
        res.sendStatus(404).send()
      }
    } catch (err) {
      console.error(err)
      res.send(err)
    }
  })

const getTagsByNameApi = express
  .Router()
  .get(`/${constants.paths.apiGetTagByName}`, async (req, res) => {
    try {
      const id = req.query.id!.toString()
      res.type('application/json').send(await getTagsByName(id))
    } catch (err) {
      console.error(err)
      res.send(err)
    }
  })

export const apiRouter = express.Router()
apiRouter.use('/', getPlaylistApi)
apiRouter.use('/', getMusicFileBufferApi)
apiRouter.use('/', getTagsByNameApi)
