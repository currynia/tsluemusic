<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { constants } from '../../constants'
import { fetchData } from './domUtils'

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

    <template v-for="p of playlist" :key="p.path">
      <input type="radio" name="my_tabs_6" class="tab" :aria-label="p.path" />
      <ul class="tab-content p-6 overflow-auto">
        <li
          @click="$emit('playNow', song.fileName, p.path, song.name)"
          v-for="song in p.songs"
          :key="song.name"
        >
          {{ song.name }}
        </li>
      </ul>
    </template>
  </div>
</template>
