<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { isElementOverflowing } from '../domUtils'

const marqueeWrapper = ref<HTMLDivElement>()
const isElementOverflowingRef = ref<boolean>(false)

const updateOverflowRef = () => {
  if (marqueeWrapper.value) {
    isElementOverflowingRef.value = isElementOverflowing(marqueeWrapper.value)
  }
}
let resizeObserver: ResizeObserver
onMounted(() => {
  resizeObserver = new ResizeObserver(updateOverflowRef)
  if (marqueeWrapper.value) {
    resizeObserver.observe(marqueeWrapper.value)
  }
})
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <div class="marquee-container overflow-hidden whitespace-nowrap" ref="marqueeWrapper">
    <div
      :class="{
        'marquee-wrapper': isElementOverflowingRef,
        flex: true,
        'w-fit': true,
      }"
    >
      <slot />
      <div class="ml-2" v-if="isElementOverflowingRef"><slot /></div>
    </div>
  </div>
</template>
<style lang="css" scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.marquee-wrapper {
  display: flex;
  animation: marquee 20s linear infinite;
}
</style>
