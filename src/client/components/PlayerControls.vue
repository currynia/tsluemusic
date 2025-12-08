<script setup lang="ts">
import PauseIcon from './icons/PauseIcon.vue'
import PlayIcon from './icons/PlayIcon.vue'
import BackIcon from './icons/BackIcon.vue'
import ForwardIcon from './icons/ForwardIcon.vue'
</script>

<template>
  <div class="flex bg-primary flex-col">
    <ul class="menu menu-horizontal rounded-box self-center p-1">
      <li id="pause">
        <PauseIcon />
      </li>

      <li id="play">
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
</template>
