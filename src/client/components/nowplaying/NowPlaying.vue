<script setup lang="ts">
import { onMounted } from 'vue'
import MarqueeComponent from './MarqueeComponent.vue'
import { audioState } from '@/state/audio/audioState'

const audioRef = audioState.refs.audioRef
const title = audioState.refs.titleRef
const artist = audioState.refs.artistRef
const imgB64 = audioState.refs.imgRefB64

const emit = defineEmits<{
  songEnded: [void]
}>()

function buildBase64ImgSrc(base64: string, mimeType: string) {
  return 'data:' + mimeType + ';' + 'base64,' + base64
}

const setSrc = () => {
  const b64 = imgB64.value.b64
  const mimeType = imgB64.value.mimeType
  return buildBase64ImgSrc(b64, mimeType)
}

onMounted(() => {
  audioRef.value?.addEventListener('ended', () => {
    emit('songEnded')
  })
})
</script>

<template>
  <div class="flex">
    <img
      class="object-cover aspect-square h-full"
      :src="setSrc()"
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
