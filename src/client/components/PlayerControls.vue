<script setup lang="ts">
import PauseIcon from './icons/PauseIcon.vue'
import PlayIcon from './icons/PlayIcon.vue'
import BackIcon from './icons/BackIcon.vue'
import ForwardIcon from './icons/ForwardIcon.vue'
import { onMounted, ref } from 'vue'
import { audioState } from '@/state/audio/audioState'
import { playNextInQueue, playPrevInQueue } from '@/control/audioControl'

const MAX_VALUE = 1000

const normalise = (val: number, maxLength: number) => {
  return (val / maxLength) * MAX_VALUE
}
const unNormalise = (val: number, maxLength: number) => {
  return (val / MAX_VALUE) * maxLength
}

const maxLength = ref(100)
const currentValue = ref(0)
const isSeeking = ref(false)

const seek = () => {
  audioState.setCurrentTime(unNormalise(currentValue.value, maxLength.value))
  isSeeking.value = false
}

const onInput = () => {
  isSeeking.value = true
}

onMounted(() => {
  audioState.addEventListener('timeupdate', () => {
    if (!isSeeking.value)
      currentValue.value = normalise(audioState.getCurrentTime(), maxLength.value)
  })
  audioState.addEventListener('loadedmetadata', () => {
    maxLength.value = audioState.getAudioLength()
  })
})
</script>

<template>
  <div class="max-h-full flex flex-col mt-3 gap-1">
    <input
      min="0"
      :max="MAX_VALUE"
      v-model="currentValue"
      type="range"
      class="range range-primary [--range-fill:0] range-xs w-full"
      @change="seek"
      @input="onInput"
    />

    <ul
      class="menu menu-horizontal self-center rounded-box grid p-0 grid-rows-1 grid-cols-4 w-9/20 min-h-0"
    >
      <li id="pause" @click="audioState.pauseAudio">
        <PauseIcon class="text-base-content" />
      </li>

      <li id="play" @click="audioState.playAudio">
        <PlayIcon class="text-base-content" />
      </li>

      <li id="back">
        <BackIcon class="text-base-content" @click="playPrevInQueue()" />
      </li>

      <li id="forward">
        <ForwardIcon class="text-base-content" @click="playNextInQueue()" />
      </li>
    </ul>
  </div>
</template>
