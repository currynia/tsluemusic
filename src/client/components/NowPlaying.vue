<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { constants } from '../../constants'
import { fetchData } from '../utils'
import { type IAudioMetadata, type IPicture, parseBlob, parseFile } from 'music-metadata'

const audioRef = ref<HTMLAudioElement>()
const tagRef = ref<IAudioMetadata>()
const imgRef = ref<HTMLImageElement>()

const emit = defineEmits<{
  timeUpdate: [data: number]
  setMaxLength: [data: number]
}>()
const setNowPlaying = async (fileName: string, fp: string) => {
  const params = new URLSearchParams()
  params.append('fileName', fileName)
  params.append('fp', fp)
  const res = await fetchData(
    `/${constants.paths.api}/${constants.paths.apiGetMusicFileBuffer}?${params}`,
  )
  const arrayBuffer = res.arrayBuffer()
  const mimeType = res.headers.get('content-type') || 'audio/mpeg'
  const blob = new Blob([await arrayBuffer], { type: mimeType })

  const url = URL.createObjectURL(blob)
  if (audioRef.value) {
    URL.revokeObjectURL(audioRef.value.src)
    audioRef.value.src = url
    loadMetaData(blob)
    audioRef.value.play()
  }
}

const readTags = async (audioBlob: Blob) => {
  tagRef.value = await parseBlob(audioBlob)
}
const loadMetaData = async (audioBlob: Blob) => {
  await readTags(audioBlob)
  setImage()
}
const emptyArrayBuffer = new ArrayBuffer()
const setImage = () => {
  let picture: IPicture | undefined
  if (tagRef.value?.common.picture && tagRef.value.common.picture[0]) {
    picture = tagRef.value.common.picture[0]
  }
  const imgBuffer = picture?.data || emptyArrayBuffer
  const blob = new Blob([imgBuffer as BlobPart], { type: picture?.format || 'image/jpeg' })

  if (imgRef.value) {
    URL.revokeObjectURL(imgRef.value.src)

    imgRef.value.src = URL.createObjectURL(blob)
  }
}

const pauseAudio = () => {
  audioRef.value?.pause()
}

const playAudio = () => {
  audioRef.value?.play()
}

onMounted(() => {
  audioRef.value?.addEventListener('timeupdate', () => {
    emit('timeUpdate', audioRef.value!.currentTime)
  })
  audioRef.value?.addEventListener('loadedmetadata', () => {
    emit('setMaxLength', audioRef.value!.duration)
  })
})

defineExpose({ setNowPlaying, pauseAudio, playAudio })
</script>
<template>
  <div>
    <img
      class="object-contain aspect-square w-full h-full"
      ref="imgRef"
      alt="Image could not be displayed"
    />
  </div>

  <audio class="hidden" ref="audioRef"></audio>
</template>
