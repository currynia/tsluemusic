<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { constants } from '../../constants'
import { fetchData } from '../utils'

interface PlaylistObject {
  [key: string]: Array<string>
}

const playlist = ref<PlaylistObject>({ '': [] })
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
    <template v-for="[key, value] of Object.entries(playlist)" :key="key">
      <input type="radio" name="my_tabs_6" class="tab" :aria-label="key" />
      <ul class="tab-content p-6 overflow-auto">
        <li v-for="song in value" :key="song">
          {{ song }}
        </li>
      </ul>
    </template>
  </div>
</template>
