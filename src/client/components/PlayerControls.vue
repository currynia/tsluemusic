<script setup lang="ts">
import PauseIcon from './icons/PauseIcon.vue'
import PlayIcon from './icons/PlayIcon.vue'
import BackIcon from './icons/BackIcon.vue'
import ForwardIcon from './icons/ForwardIcon.vue'
import { ref } from 'vue'

const MAX_VALUE = 1000
const normalise = (val: number, maxLength: number) => {
  return (val / maxLength) * 1000
}
const maxLength = ref<string>('100')
const currentValue = ref<string>('0')

const setCurrentValue = (val: number) => {
  currentValue.value = normalise(val, parseInt(maxLength.value)).toString()
}

const setMaxLength = (val: number) => {
  maxLength.value = val.toString()
}
defineExpose({ setMaxLength, setCurrentValue })
</script>

<template>
  <div class="flex bg-primary flex-col">
    <ul class="menu menu-horizontal rounded-box self-center p-1">
      <li id="pause" @click="$emit('pauseAudio')">
        <PauseIcon />
      </li>

      <li id="play" @click="$emit('playAudio')">
        <PlayIcon />
      </li>

      <li id="back">
        <BackIcon />
      </li>

      <li id="forward">
        <ForwardIcon />
      </li>
    </ul>
  </div>

  <input
    min="0"
    :max="MAX_VALUE"
    :value="currentValue"
    type="range"
    class="range range-secondary w-full"
  />
</template>
