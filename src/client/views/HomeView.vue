<script setup lang="ts">
import NowPlaying from '../components/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'
</script>

<template>
  <div class="flex flex-col-reverse h-full w-full max-h-full">
    <PlayerControls class="h-fit" />
    <div class="flex grow overflow-auto">
      <NowPlaying class="w-1/4" />
      <PlayList class="w-3/4" />
    </div>
  </div>
</template>
