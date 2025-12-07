import { ICommonTagsResult } from 'music-metadata'

export interface MusicObj {
  _id: string
  tags: ICommonTagsResult
  path: string
  fileName: string
}
