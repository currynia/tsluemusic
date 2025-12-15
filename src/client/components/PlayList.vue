<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { constants } from '../../constants'
import { fetchData } from './domUtils'
import Queue from './queue/queue'
import type { SongEntity } from '@/entities/SongEntity'

export interface PlaylistObject {
  path?: string
  songs?: SongEntity[]
}
const emit = defineEmits(['playNow'])
const playlist = ref<PlaylistObject[]>()

const props = defineProps<{
  pushCallback: (...pl: SongEntity[]) => void
}>()

const sliceArrayAtIndex = <T,>(s: Array<T>, index: number) => {
  return s.slice(index)
}

const onClickPlayback = (
  fileName: string,
  path: string | undefined,
  name: string,
  songs: SongEntity[] | undefined,
  index: number,
) => {
  emit('playNow', fileName, path, name)
  if (songs) {
    props.pushCallback?.(...sliceArrayAtIndex(songs, index))
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

    <template v-for="(p, i) of playlist" :key="p.path">
      <input type="radio" name="my_tabs_6" class="tab" :aria-label="p.path" />
      <ul class="tab-content p-6 overflow-auto">
        <li
          @click="
            () => {
              onClickPlayback(song.fileName, p.path, song.name, p.songs, i)
            }
          "
          v-for="song in p.songs"
          :key="song.name"
        >
          {{ song.name }}
        </li>
      </ul>
    </template>
  </div>
</template>
