<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { constants } from '../../constants'
import { fetchData } from './domUtils'
import type { SongEntity } from '@/entities/SongEntity'
import MusicIcon from './icons/MusicIcon.vue'

export interface PlaylistObject {
  path?: string
  songs?: SongEntity[]
}
const emit = defineEmits(['playNow'])
const playlist = ref<PlaylistObject[]>()

const props = defineProps<{
  onClickPlaylistCallback: (...pl: SongEntity[]) => void
  getNowPlayingTitle: () => Ref<string>
}>()

const onClickPlayback = (
  fileName: string,
  path: string | undefined,
  name: string,
  songs: SongEntity[] | undefined,
  index: number,
) => {
  emit('playNow', fileName, path, name)
  if (songs) {
    props.onClickPlaylistCallback?.(...songs.slice(index))
  }
}

const getPlaylist = async () => {
  playlist.value = await (
    await fetchData(`/${constants.paths.api}/${constants.paths.apiGetPlayList}`)
  ).json()
}

onMounted(async () => {
  await getPlaylist()
})

const isSongNowPlaying = (s: string) => {
  return props.getNowPlayingTitle().value == s
}

const dev = import.meta.env.DEV
</script>

<template>
  <div class="tabs tabs-box">
    <template v-if="dev">
      <input type="radio" name="my_tabs_6" class="tab" aria-label="Test Menu" />
      <li class="tab-content p-6 overflow-auto">TEST ITEM</li>
      <input type="radio" name="my_tabs_6" class="tab" aria-label="Test Menu" />
      <li class="tab-content p-6 overflow-auto">TEST ITEM</li>
      <input type="radio" name="my_tabs_6" class="tab" aria-label="Test Menu" />
      <li class="tab-content p-6 overflow-auto">TEST ITEM</li>
    </template>

    <template v-for="p of playlist" :key="p.path">
      <input type="radio" name="my_tabs_6" class="tab" :aria-label="p.path" />
      <div class="tab-content p-6 overflow-auto">
        <div class="flex flex-col h-full">
          <div
            v-for="(song, i) in p.songs"
            :key="song.name"
            @click="
              () => {
                onClickPlayback(song.fileName, p.path, song.name, p.songs, i)
              }
            "
            class="flex min-h-1/20 max-h-1/20 overflow-clip gap-3"
          >
            <div
              v-if="isSongNowPlaying(song.name)"
              class="music-icon h-full flex items-center ml-1 align-middle"
            >
              <MusicIcon class="fill-primary h-1/2" />
            </div>

            <p :class="{ 'text-primary': isSongNowPlaying(song.name) }">{{ song.name }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="css" scoped>
.music-icon {
  animation: musicIconAnimation 3s linear infinite;
}
@keyframes musicIconAnimation {
  0% {
    transform: rotate(-50deg);
  }
  50% {
    transform: rotate(50deg);
  }
  100% {
    transform: rotate(-50deg);
  }
}
</style>
