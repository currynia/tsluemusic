<script setup lang="ts">
import NowPlaying from '../components/nowplaying/NowPlaying.vue'
import PlayerControls from '../components/PlayerControls.vue'
import PlayList from '../components/PlayList.vue'
import MenuComponent from '@/components/MenuComponenet.vue'
import { playlistQueueState } from '@/state/queue/queueState'
import QueueComponent from '@/components/queue/QueueComponent.vue'
</script>

<template>
  <div class="flex h-full w-full overflow-auto">
    <MenuComponent class="w-2/10" />

    <div class="flex flex-col w-full">
      <PlayList class="bg-base-100 h-full w-full rounded-none shadow-l-xl overflow-auto" />

      <div class="bg-base-300 shadow-2xl grid grid-cols-6 grid-rows-1 h-1/8 max-h-1/8 min-h-1/8">
        <NowPlaying class="col-span-2" ref="nowPlaying" />
        <PlayerControls ref="playerControls" class="col-start-3 col-end-5" />
      </div>
    </div>

    <QueueComponent
      class="w-2/10 overflow-y-scroll h-full max-h-full"
      :queue="playlistQueueState.playlistQueueView"
    />
  </div>
</template>
