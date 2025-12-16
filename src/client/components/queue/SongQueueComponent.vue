<script setup lang="ts">
import type { SongEntity } from '@/entities/SongEntity'
import { ref, type Ref } from 'vue'
const props = defineProps<{ queue: Ref<SongEntity[]> }>()
</script>

<template>
  <div class="p-3">
    <p>Queue</p>
    <ol>
      <li v-for="g of queue.value" :key="g.name">
        {{ g.name }}
      </li>
    </ol>
  </div>
</template>
