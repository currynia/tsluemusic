<script setup lang="ts">
import NowPlaying from '../components/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'
</script>

<template>
  <div class="flex flex-col-reverse h-full w-full">
    <PlayerControls class="w-full" />
    <div class="flex self-end h-full w-full justify-end">
      <NowPlaying class="grow-3" />
      <PlayList class="grow-7" />
    </div>
  </div>
</template>
