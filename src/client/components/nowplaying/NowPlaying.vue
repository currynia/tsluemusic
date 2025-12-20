<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type ICommonTagsResult } from 'music-metadata'
import { lazyGetAudioBufferMimeType, createBlob, getTags, buildBase64ImgSrc } from './helpers'
import MarqueeComponent from './MarqueeComponent.vue'
import { audioState } from '@/state/audioState'

const audioRef = audioState.audioRef
const tagRef = ref<ICommonTagsResult>()
const imgRef = ref<HTMLImageElement>()
const title = ref('')
const artist = ref('')

const emit = defineEmits<{
  songEnded: [void]
}>()

const setImage = () => {
  const imgB64 = tagRef.value?.picture?.[0]?.data.toString() || ''
  const mimeType = tagRef.value?.picture?.[0]?.format || 'image/jpeg'
  if (imgRef.value) {
    imgRef.value.src = buildBase64ImgSrc(imgB64, mimeType)
  }
}
const setTitle = () => {
  title.value = tagRef.value?.title || ''
}
const setArtist = () => {
  artist.value = tagRef.value?.artist || ''
}
const setMetaDataFields = () => {
  setImage()
  setTitle()
  setArtist()
}
const setNowPlaying = async (fileName: string, fp: string | undefined, name: string) => {
  tagRef.value = await getTags(name)
  const audio = await (await lazyGetAudioBufferMimeType(fileName, fp))()
  const blob = createBlob(audio.buffer, audio.mimeType)
  const audioSrc = URL.createObjectURL(blob)

  const audioElement = audioRef.value
  if (audioElement) {
    URL.revokeObjectURL(audioElement.src)
    audioElement.src = audioSrc
    setMetaDataFields()
    audioElement.play()
  }
}

onMounted(() => {
  audioRef.value?.addEventListener('ended', () => {
    emit('songEnded')
  })
})
const gewNowPlayingTitle = () => {
  return title
}
defineExpose({
  setNowPlaying,

  gewNowPlayingTitle,
})
</script>

<template>
  <div class="flex">
    <img
      class="object-cover aspect-square h-full"
      ref="imgRef"
      alt="Image could not be displayed"
    />
    <div class="block overflow-auto mt-1.5 ml-1.5 mr-1.5">
      <MarqueeComponent>
        <p class="font-bold">{{ title }}</p>
      </MarqueeComponent>

      <MarqueeComponent>
        <p>{{ artist }}</p>
      </MarqueeComponent>
    </div>

    <audio class="hidden" ref="audioRef"></audio>
  </div>
</template>
