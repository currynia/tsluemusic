<script setup lang="ts">
import { ref } from 'vue'
import NowPlaying from '../components/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'

const nowPlaying = ref<InstanceType<typeof NowPlaying>>()
const playerControls = ref<InstanceType<typeof PlayerControls>>()
</script>

<template>
  <div class="flex flex-col-reverse h-full w-full max-h-full">
    <PlayerControls
      ref="playerControls"
      class="h-fit bg-base-300"
      @pause-audio="nowPlaying?.pauseAudio"
      @play-audio="nowPlaying?.playAudio"
    />
    <div class="flex grow overflow-auto">
      <NowPlaying
        class="w-1/4"
        ref="nowPlaying"
        @time-update="playerControls?.setCurrentValue"
        @set-max-length="playerControls?.setMaxLength"
      />
      <PlayList class="w-3/4" @play-now="nowPlaying?.setNowPlaying" />
    </div>
  </div>
</template>
