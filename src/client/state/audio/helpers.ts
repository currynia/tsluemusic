import { fetchData } from '@/components/domUtils'
import { constants } from '../../../constants'

export const getTags = async (id: string) => {
  const params = new URLSearchParams()
  params.append('id', id)
  const res = await fetchData(
    `/${constants.paths.api}/${constants.paths.apiGetTagByName}?${params}`,
  )
  return await res.json()
}

export const lazyGetAudioBufferMimeType = async (fileName: string, fp?: string) => {
  const params = new URLSearchParams()
  params.append('fileName', fileName)
  if (fp) {
    params.append('fp', fp)
  }

  const res = await fetchData(
    `/${constants.paths.api}/${constants.paths.apiGetMusicFileBuffer}?${params}`,
  )

  return async () => ({
    buffer: await res.arrayBuffer(),
    mimeType: res.headers.get('content-type') || 'audio/mpeg',
  })
}
export const createBlob = (arrayBuffer: BlobPart, mimeType: string) => {
  const blob = new Blob([arrayBuffer], { type: mimeType })
  return blob
}
