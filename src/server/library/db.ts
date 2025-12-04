import { Db, MongoClient } from 'mongodb'
import { MusicObj } from './MusicObj.js'

const uri = 'mongodb://localhost:27017/musicDatabase'

export const dbManager = (function () {
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
    getDB: async () => {
      return db != null ? db : initClient()
    },
  }
})()

export async function writeMusicTags(musictag: MusicObj[]) {
  const db = await dbManager.getDB()
  const collection = db.collection<MusicObj>('musicCollection')
  collection.insertMany(musictag)
}

export async function dropDatabase() {
  const db = await dbManager.getDB()
  db.dropDatabase()
}
