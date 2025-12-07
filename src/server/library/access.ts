import fs, { Dirent } from 'fs'
import path from 'path'

import { writeMusicTags } from './db.js'
import { MusicObj } from './MusicObj.js'
import { IAudioMetadata, parseFile } from 'music-metadata'

const directory: string = process.env.MUSIC_DIRECTORY!
const extensions = ['.mp3', '.flac', '.wav', '.ogg']

function readTags(f: string[], fp: string): Promise<MusicObj>[] {
  return f.map(async (m) => {
    const tags = await readTag(m, fp)
    return {
      _id: tags.common.title!,
      tags: tags.common,
      path: fp,
      fileName: m,
    }
  })
}
const readTag = (f: string, fp: string): Promise<IAudioMetadata> => {
  return parseFile(path.join(directory, fp, f))
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
