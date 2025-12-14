<script setup lang="ts">
import { ref } from 'vue'
import NowPlaying from '../components/nowplaying/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
import TopBar from '@/components/TopBar.vue'

const nowPlaying = ref<InstanceType<typeof NowPlaying>>()
const playerControls = ref<InstanceType<typeof PlayerControls>>()
</script>

<template>
  <div class="flex flex-col">
    <TopBar />
    <div class="overflow-auto h-7/8">
      <div class="flex h-full">
        <LeftSideBar class="w-1/8" />
        <PlayList class="bg-base-100 w-6/8 h-full" @play-now="nowPlaying?.setNowPlaying" />
        <RightSideBar class="w-1/8" />
      </div>
    </div>

    <div class="bg-base-300 grid grid-cols-6 grid-rows-1 w-full h-1/8" ref="d">
      <NowPlaying
        class="col-span-2"
        ref="nowPlaying"
        @time-update="playerControls?.setCurrentValue"
        @set-max-length="playerControls?.setMaxLength"
      />
      <PlayerControls
        ref="playerControls"
        class="col-start-3 col-end-5"
        @pause-audio="nowPlaying?.pauseAudio"
        @play-audio="nowPlaying?.playAudio"
      />
    </div>
  </div>
</template>
