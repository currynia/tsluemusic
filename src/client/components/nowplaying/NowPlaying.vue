<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type ICommonTagsResult } from 'music-metadata'
import { lazyGetAudioBufferMimeType, createBlob, getTags, base64ToArrayBuffer } from './helpers'
import MarqueeComponent from './MarqueeComponent.vue'

const audioRef = ref<HTMLAudioElement>()
const tagRef = ref<ICommonTagsResult>()
const imgRef = ref<HTMLImageElement>()
const title = ref('')
const artist = ref('')

const emit = defineEmits<{
  timeUpdate: [data: number]
  setMaxLength: [data: number]
}>()

const setImage = () => {
  const imgBuffer = base64ToArrayBuffer(tagRef.value?.picture?.[0]?.data.toString() || '')
  const mimeType = tagRef.value?.picture?.[0]?.format || 'image/jpeg'
  const blob = createBlob(imgBuffer as BlobPart, mimeType)

  if (imgRef.value) {
    URL.revokeObjectURL(imgRef.value.src)
    imgRef.value.src = URL.createObjectURL(blob)
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
const setNowPlaying = async (fileName: string, fp: string, name: string) => {
  tagRef.value = await getTags(name)
  const audio = await (await lazyGetAudioBufferMimeType(fileName, fp))()
  const blob = createBlob(audio.buffer, audio.mimeType)
  const url = URL.createObjectURL(blob)
  const audioElement = audioRef.value
  if (audioElement) {
    URL.revokeObjectURL(audioElement.src)
    audioElement.src = url
    setMetaDataFields()
    audioElement.play()
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
