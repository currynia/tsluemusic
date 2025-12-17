<script setup lang="ts">
import PauseIcon from './icons/PauseIcon.vue'
import PlayIcon from './icons/PlayIcon.vue'
import BackIcon from './icons/BackIcon.vue'
import ForwardIcon from './icons/ForwardIcon.vue'
import { ref } from 'vue'

const MAX_VALUE = 1000
const emit = defineEmits<{
  pauseAudio: [void]
  playAudio: [void]
  back: [void]
  forward: [void]
  seeking: [number]
  isSeeking: [void]
}>()
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

const unNormalise = (val: number, maxLength: number) => {
  return (val / 1000) * maxLength
}
const emitSeeking = () => {
  emit('seeking', unNormalise(parseInt(currentValue.value), parseInt(maxLength.value)))
}

defineExpose({ setMaxLength, setCurrentValue })
</script>

<template>
  <div class="max-h-full flex flex-col mt-3 gap-1">
    <input
      min="0"
      :max="MAX_VALUE"
      :value="currentValue"
      type="range"
      class="range range-primary [--range-fill:0] range-xs w-full"
      @change="emitSeeking"
      @input="$emit('isSeeking')"
    />

    <ul
      class="menu menu-horizontal self-center rounded-box grid p-0 grid-rows-1 grid-cols-4 w-9/20 min-h-0"
    >
      <li id="pause" @click="$emit('pauseAudio')">
        <PauseIcon class="text-base-content" />
      </li>

      <li id="play" @click="$emit('playAudio')">
        <PlayIcon class="text-base-content" />
      </li>

      <li id="back">
        <BackIcon class="text-base-content" @click="$emit('back')" />
      </li>

      <li id="forward">
        <ForwardIcon class="text-base-content" @click="$emit('forward')" />
      </li>
    </ul>
  </div>
</template>
