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
  <div>
    <div class="p-2">
      <input
        min="0"
        :max="MAX_VALUE"
        :value="currentValue"
        type="range"
        class="range range-primary w-full"
      />
    </div>

    <div class="flex flex-col">
      <ul class="menu menu-horizontal rounded-box self-center p-1">
        <li id="pause" @click="$emit('pauseAudio')">
          <PauseIcon class="text-primary" />
        </li>

        <li id="play" @click="$emit('playAudio')">
          <PlayIcon class="text-primary" />
        </li>

        <li id="back">
          <BackIcon class="text-primary" />
        </li>

        <li id="forward">
          <ForwardIcon class="text-primary" />
        </li>
      </ul>
    </div>
  </div>
</template>
