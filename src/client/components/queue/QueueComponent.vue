<script setup lang="ts">
import type { SongEntity } from '@/entities/SongEntity'
import { type Ref } from 'vue'
defineProps<{ queue: Ref<SongEntity[]> }>()
const dev = import.meta.env.DEV
</script>

<template>
  <div class="p-3 flex flex-col h-full">
    <p class="font-bold">Queue</p>

    <ol class="h-full w-full">
      <li v-for="g of queue.value" :key="g.name" class="max-w-full min-h-1/20 max-h-1/20">
        <p class="truncate">{{ g.name }}</p>
      </li>
    </ol>

    <ol v-if="dev" class="h-full w-full">
      <li>test1</li>
      <li>test2</li>
      <li>test3</li>
      <li>test4</li>
      <li>test5</li>
    </ol>
  </div>
</template>
