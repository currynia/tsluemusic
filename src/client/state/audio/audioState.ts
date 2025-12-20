import { ref } from 'vue'
import { createBlob, getTags, lazyGetAudioBufferMimeType } from './helpers'
import type { ICommonTagsResult } from 'music-metadata'

export const audioState = (() => {
  const audioRef = ref<HTMLAudioElement>()
  const tagRef = ref<ICommonTagsResult>()
  const imgRefB64 = ref<{ b64: string; mimeType: string }>({ b64: '', mimeType: '' })

  const artistRef = ref('')
  const titleRef = ref('')

  const setImg = () => {
    imgRefB64.value = {
      b64: tagRef.value?.picture?.[0]?.data.toString() || '',
      mimeType: tagRef.value?.picture?.[0]?.format || 'image/jpeg',
    }
  }

  const setTitle = () => {
    titleRef.value = tagRef.value?.title || ''
  }

  const setArtist = () => {
    artistRef.value = tagRef.value?.artist || ''
  }
  const setMetaDataFields = () => {
    if (tagRef.value) {
      setImg()
      setTitle()
      setArtist()
    }
  }
  const setAudio = async (fileName: string, name: string, fp?: string) => {
    tagRef.value = await getTags(name)
    const audio = await (await lazyGetAudioBufferMimeType(fileName, fp))()
    const blob = createBlob(audio.buffer, audio.mimeType)
    const audioSrc = URL.createObjectURL(blob)
    const audioElement = audioRef.value
    if (audioElement) {
      URL.revokeObjectURL(audioElement.src)
      audioElement.src = audioSrc
      setMetaDataFields()
    }
  }

  return {
    refs: { audioRef, imgRefB64, titleRef, artistRef },
    pauseAudio: () => audioRef.value?.pause(),
    playAudio: () => audioRef.value?.play(),
    addEventListener: (e: string, cb: () => void) => {
      audioRef.value?.addEventListener(e, cb)
    },
    getCurrentTime: () => audioRef.value?.currentTime || -1,
    getAudioLength: () => audioRef.value?.duration || -1,
    setCurrentTime: (t: number) => {
      if (audioRef.value) audioRef.value.currentTime = t
    },
    setAudio,
  }
})()
