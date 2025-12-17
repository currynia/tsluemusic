<script setup lang="ts">
import { ref } from 'vue'
import NowPlaying from '../components/nowplaying/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'
import MenuComponent from '@/components/MenuComponenet.vue'
import Queue from '@/components/queue/queue'
import QueueComponent from '@/components/queue/SongQueueComponent.vue'
import type { SongEntity } from '@/entities/SongEntity'

const AUDIO_BACK_THRESHOLD = 3
const nowPlaying = ref<InstanceType<typeof NowPlaying>>()
const playerControls = ref<InstanceType<typeof PlayerControls>>()
const playListQueue = new Queue<SongEntity>()
const isSeeking = ref(false)

const onClickPlaylistCallback = (...q: SongEntity[]) => {
  playListQueue.queue = q
  playListQueue.cur = 1
  playListQueue.updateQueueView()
}

const playNextInQueue = () => {
  const head = playListQueue.popHead()
  playListQueue.updateQueueView()

  if (head?.fileName && head?.name) {
    nowPlaying?.value?.setNowPlaying(head.fileName, undefined, head.name)
  }
}
const onEmitSeeking = (v: number) => {
  nowPlaying.value?.setAudioPosition(v)
  isSeeking.value = false
}
const playPrevInQueue = () => {
  const prevHead = playListQueue.prevHead
  if (prevHead == null) {
    playListQueue.cur++
    restartAudio()
    return
  }

  playListQueue.updateQueueView()
  if (prevHead?.fileName && prevHead?.name) {
    nowPlaying?.value?.setNowPlaying(prevHead.fileName, undefined, prevHead.name)
  }
}

const restartAudio = () => {
  nowPlaying.value?.setAudioPosition(0)
}

const onBackEmit = () => {
  if (nowPlaying.value) {
    if (nowPlaying.value.getAudioCurrentPosition() < AUDIO_BACK_THRESHOLD) {
      playPrevInQueue()
    } else {
      restartAudio()
    }
  }
}

const onEmitTimeUpdate = (t: number) => {}
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
          @time-update="onEmitTimeUpdate"
          @set-max-length="playerControls?.setMaxLength"
          @song-ended="playNextInQueue"
        />
        <PlayerControls
          ref="playerControls"
          class="col-start-3 col-end-5"
          @pause-audio="nowPlaying?.pauseAudio"
          @play-audio="nowPlaying?.playAudio"
          @forward="playNextInQueue"
          @back="onBackEmit"
          @seeking="onEmitSeeking"
          @is-seeking="isSeeking = true"
        />
      </div>
    </div>
    <QueueComponent
      class="w-2/10 overflow-auto h-full max-h-full"
      :queue="playListQueue.queueView"
    />
  </div>
</template>
