<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { constants } from '../../constants'
import { fetchData } from '../utils'

interface PlaylistObject {
  path?: string
  songs?: Array<{ fileName: string; name: string }>
}

const playlist = ref<PlaylistObject[]>()
const getPlaylist = async () => {
  playlist.value = await (
    await fetchData(`/${constants.paths.api}/${constants.paths.apiGetPlayList}`)
  ).json()
}
const g = playlist.value
onMounted(async () => {
  await getPlaylist()
})
</script>

<template>
  <div class="tabs tabs-box">
    <template v-for="p of playlist" :key="p.path">
      <input type="radio" name="my_tabs_6" class="tab" :aria-label="p.path" />
      <ul class="border-base-300 bg-base-100 tab-content p-6 overflow-auto">
        <li v-for="song in p.songs" :key="song.name">
          {{ song.name }}
        </li>
      </ul>
    </template>
  </div>
</template>
