<script setup lang="ts">
import { ref } from 'vue'
import NowPlaying from '../components/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'

const nowPlaying = ref<InstanceType<typeof NowPlaying>>()
</script>

<template>
  <div class="flex flex-col-reverse h-full w-full max-h-full">
    <PlayerControls
      class="h-fit"
      @pause-audio="nowPlaying?.pauseAudio"
      @play-audio="nowPlaying?.playAudio()"
    />
    <div class="flex grow overflow-auto">
      <NowPlaying class="w-1/4" ref="nowPlaying" />
      <PlayList class="w-3/4" @play-now="nowPlaying?.setNowPlaying" />
    </div>
  </div>
</template>
