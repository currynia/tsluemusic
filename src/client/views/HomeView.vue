<script setup lang="ts">
import { ref } from 'vue'
import NowPlaying from '../components/nowplaying/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'
import MenuComponent from '@/components/MenuComponenet.vue'
import Queue from '@/components/queue/queue'
import QueueComponent from '@/components/queue/SongQueueComponent.vue'
import type { SongEntity } from '@/entities/SongEntity'

const nowPlaying = ref<InstanceType<typeof NowPlaying>>()
const playerControls = ref<InstanceType<typeof PlayerControls>>()
const playListQueue = new Queue<SongEntity>()
</script>

<template>
  <div class="flex grow">
    <MenuComponent class="w-2/10" />
    <div class="flex flex-col w-full">
      <PlayList
        class="bg-base-100 h-full w-full rounded-none shadow-l-xl overflow-auto"
        @play-now="nowPlaying?.setNowPlaying"
        :push-callback="playListQueue.push.bind(playListQueue)"
      />

      <div class="bg-base-300 shadow-2xl grid grid-cols-6 grid-rows-1 h-1/8" ref="d">
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
    <QueueComponent class="w-2/10" :queue="playListQueue.queue" />
  </div>
</template>
