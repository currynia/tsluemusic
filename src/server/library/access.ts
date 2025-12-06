import fs, { access, Dirent } from 'fs'
import path from 'path'
import NodeID3 from 'node-id3'
import { writeMusicTags } from './db.js'
import { MusicObj } from './MusicObj.js'

const directory: string = process.env.MUSIC_DIRECTORY!
const extensions = ['.mp3', '.flac', '.wav', '.ogg']

function readTags(f: string[], fp: string): Promise<MusicObj>[] {
  return f.map(async (m) => ({
    _id: m,
    tags: await NodeID3.Promise.read(path.join(directory, fp, m)),
  }))
}

const getMusicFolders = async () => {
  // get first top level folder
  return (await fs.promises.readdir(directory, { withFileTypes: true })).filter(
    (f) => !f.isFile() && !f.name.startsWith('.'),
  )
}

const getMusicFileListFromDirectory = async (f: Dirent) => {
  //get file list from specified directory
  return (await fs.promises.readdir(path.join(directory, f.name))).filter((g) =>
    extensions.includes(path.extname(g)),
  )
}

export const getAllMusicFiles = async () => {
  //get all music files in the directory folder
  const folders = await getMusicFolders()

  const resultEntries = await Promise.all(
    folders.map(async (folder) => [folder.name, await getMusicFileListFromDirectory(folder)]),
  )

  return Object.fromEntries(resultEntries)
}
async function parseDirWithTags() {
  const dir = await getMusicFolders()
  const tagPromise = dir.map(async (f) => {
    const sub = await getMusicFileListFromDirectory(f)
    return Promise.all(readTags(sub, f.name))
  })

  return (await Promise.all(tagPromise)).flat(1)
}

export async function writeMusicTagsToDB() {
  writeMusicTags(await parseDirWithTags())
}
