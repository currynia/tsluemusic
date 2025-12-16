import { Collection, Db, MongoClient } from 'mongodb'
import { MusicObj } from './MusicObj.js'

const uri = 'mongodb://localhost:27017/musicDatabase'

interface DBInterface {
  getDB: () => Promise<Db>
  getMusicCollection: () => Promise<Collection<MusicObj>>
}

export const dbManager = (function (): DBInterface {
  let db: Db
  async function initClient() {
    const client = new MongoClient(uri)
    try {
      await client.connect()
      console.log('Connected successfully to MongoDB server')
      db = client.db('musicDatabase')
      return db
    } catch (err) {
      console.error('Error connecting to or interacting with MongoDB:', err)
      throw err
    }
  }
  return {
    getDB: async function () {
      return db != null ? db : initClient()
    },

    getMusicCollection: async function () {
      const db = await this.getDB()
      return db.collection<MusicObj>('musicCollection')
    },
  }
})()

export async function writeMusicTags(musictag: MusicObj[]) {
  try {
    const collection = await dbManager.getMusicCollection()
    collection.insertMany(musictag)
  } catch (err) {
    console.error(err)
  }
}

export async function dropDatabase() {
  const db = await dbManager.getDB()
  db.dropDatabase()
}

export async function getAllMusicFiles() {
  const collection = await dbManager.getMusicCollection()
  const result = await collection.aggregate([
    { $group: { _id: '$path', songs: { $push: { fileName: '$fileName', name: '$_id' } } } },
    {
      $project: {
        _id: 0,
        path: '$_id',
        songs: 1,
      },
    },
  ])

  return await result.toArray()
}

export async function getTagsByName(id: string) {
  const collection = await dbManager.getMusicCollection()
  const result = collection.findOne({ _id: id })
  return (await result)?.tags
}

export async function getMusicFilePath(id: string) {
  const collection = await dbManager.getMusicCollection()
  const result = collection.findOne({ fileName: id })

  return (await result)?.path
}
