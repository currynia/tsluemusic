<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NowPlaying from '../components/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'

const nowPlaying = ref<InstanceType<typeof NowPlaying>>()
const playerControls = ref<InstanceType<typeof PlayerControls>>()
const d = ref<HTMLDivElement>()
onMounted(() => {
  if (d.value) {
    d.value.style.maxHeight = d.value.offsetHeight.toString() + 'px'
  }
})
</script>

<template>
  <div class="flex flex-col-reverse h-full w-full max-h-full">
    <div class="bg-base-300 grid-rows-1 grid-cols-6 w-full grid overflow-clip" ref="d">
      <NowPlaying
        class="w-1/4"
        ref="nowPlaying"
        @time-update="playerControls?.setCurrentValue"
        @set-max-length="playerControls?.setMaxLength"
      />
      <PlayerControls
        ref="playerControls"
        class="h-fit col-start-3 col-end-5"
        @pause-audio="nowPlaying?.pauseAudio"
        @play-audio="nowPlaying?.playAudio"
      />
    </div>

    <div class="flex grow overflow-auto">
      <PlayList class="w-3/4" @play-now="nowPlaying?.setNowPlaying" />
    </div>
  </div>
</template>
