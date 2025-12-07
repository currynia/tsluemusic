<script setup lang="ts">
import { ref } from 'vue'
import NowPlaying from '../components/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'

const nowPlaying = ref<InstanceType<typeof NowPlaying>>()
const setNowPlaying = (fileName: string, fp: string) => {
  nowPlaying.value!.setNowPlaying(fileName, fp)
}
</script>

<template>
  <div class="flex flex-col-reverse h-full w-full max-h-full">
    <PlayerControls class="h-fit" />
    <div class="flex grow overflow-auto">
      <NowPlaying class="w-1/4" ref="nowPlaying" />
      <PlayList class="w-3/4" @play-now="setNowPlaying" />
    </div>
  </div>
</template>
