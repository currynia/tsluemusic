<script setup lang="ts">
import type { SongEntity } from '@/entities/SongEntity'
import { ref, type Ref } from 'vue'
const props = defineProps<{ queue: Ref<SongEntity[]> }>()
const dev = import.meta.env.DEV
</script>

<template>
  <div class="p-3">
    <p>Queue</p>
    <ol>
      <li v-for="g of queue.value" :key="g.name">
        {{ g.name }}
      </li>
    </ol>

    <ol v-if="dev">
      <li>test1</li>
      <li>test2</li>
      <li>test3</li>
      <li>test4</li>
      <li>test5</li>
    </ol>
  </div>
</template>
