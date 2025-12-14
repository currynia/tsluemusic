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

export const lazyGetAudioBufferMimeType = async (fileName: string, fp: string) => {
  const params = new URLSearchParams()
  params.append('fileName', fileName)
  params.append('fp', fp)
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

export function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64)
  const length = binaryString.length

  const bytes = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes.buffer
}
