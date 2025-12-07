<script setup lang="ts">
import { ref } from 'vue'
import { constants } from '../../constants'
import { fetchData } from '../utils'

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
    audioRef.value.src = url
    audioRef.value.play()
  }
}

const audioRef = ref<HTMLAudioElement | null>(null)

defineExpose({ setNowPlaying })
</script>
<template>
  <a class="bg-black">test placeholder</a>
  <audio ref="audioRef" controls></audio>
</template>
