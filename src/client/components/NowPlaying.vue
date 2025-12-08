<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { constants } from '../../constants'
import { fetchData } from '../utils'

const audioRef = ref<HTMLAudioElement | null>(null)
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

    audioRef.value.play()
  }
}

const pauseAudio = () => {
  audioRef.value?.pause()
}

const playAudio = () => {
  audioRef.value?.play()
}

onMounted(() => {
  audioRef.value?.addEventListener('timeupdate', (_event) => {
    emit('timeUpdate', audioRef.value!.currentTime)
  })
  audioRef.value?.addEventListener('loadedmetadata', () => {
    emit('setMaxLength', audioRef.value!.duration)
  })
})

defineExpose({ setNowPlaying, pauseAudio, playAudio })
</script>
<template>
  <a class="bg-black">test placeholder</a>
  <audio class="hidden" ref="audioRef"></audio>
</template>
