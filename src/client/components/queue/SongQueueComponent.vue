<script setup lang="ts">
import { ref, type Ref } from 'vue'
const props = defineProps<{ queue: Ref<Array<unknown>> }>()
</script>

<template>
  <div>
    <p>Queue</p>
    <ol>
      <li v-for="g of queue.value">
        {{ g }}
      </li>
    </ol>
  </div>
</template>
