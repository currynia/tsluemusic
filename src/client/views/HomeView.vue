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
const onClickPlaylistCallback = (...q: SongEntity[]) => {
  playListQueue.queue = q
  playListQueue.incrCur()
  playListQueue.updateQueueView()
}

const playNextInQueue = () => {
  const head = playListQueue.popHead()
  playListQueue.updateQueueView()

  if (head?.fileName && head?.name) {
    nowPlaying?.value?.setNowPlaying(head.fileName, undefined, head.name)
  }
}
</script>

<template>
  <div class="flex h-full w-full overflow-auto">
    <MenuComponent class="w-2/10" />
    <div class="flex flex-col w-full">
      <PlayList
        class="bg-base-100 h-full w-full rounded-none shadow-l-xl overflow-auto"
        @play-now="nowPlaying?.setNowPlaying"
        :on-click-playlist-callback="onClickPlaylistCallback"
      />

      <div class="bg-base-300 shadow-2xl grid grid-cols-6 grid-rows-1 h-1/8" ref="d">
        <NowPlaying
          class="col-span-2"
          ref="nowPlaying"
          @time-update="playerControls?.setCurrentValue"
          @set-max-length="playerControls?.setMaxLength"
          @song-ended="playNextInQueue"
        />
        <PlayerControls
          ref="playerControls"
          class="col-start-3 col-end-5"
          @pause-audio="nowPlaying?.pauseAudio"
          @play-audio="nowPlaying?.playAudio"
          @forward="playNextInQueue"
        />
      </div>
    </div>
    <QueueComponent
      class="w-2/10 overflow-auto h-full max-h-full"
      :queue="playListQueue.queueView"
    />
  </div>
</template>
