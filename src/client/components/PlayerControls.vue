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
const isPlaying = audioState.isPlaying
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
  <div class="max-h-full flex flex-col gap-3 mt-1">
    <div class="w-full">
      <input
        min="0"
        :max="MAX_VALUE"
        v-model="currentValue"
        type="range"
        class="range range-primary [--range-fill:0] range-xs w-full h-full"
        @change="seek"
        @input="onInput"
      />
    </div>

    <ul
      class="menu menu-horizontal rounded-box justify-center w-full h-full text-base-content p-0 gap-3"
    >
      <li id="pause" @click="audioState.pauseAudio" v-show="isPlaying" class="h-full w-auto">
        <PauseIcon class="p-0" />
      </li>

      <li id="play" @click="audioState.playAudio" v-show="!isPlaying" class="h-full w-auto">
        <PlayIcon class="p-0" />
      </li>

      <li id="back" @click="playPrevInQueue()" class="h-full w-auto">
        <BackIcon class="p-0" />
      </li>

      <li id="forward" @click="playNextInQueue()" class="h-full w-auto">
        <ForwardIcon class="p-0" />
      </li>
    </ul>
  </div>
</template>
