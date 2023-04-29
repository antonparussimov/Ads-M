<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  title: String,
  val: Number,
  unit: String
})

onMounted(() => {
  console.log(props.title)
})
</script>

<template>
  <div class="px-3">
    <h3 class="pt-3">{{ props.title || 'No title' }}</h3>
    <div class="flex py-3 items-end">
      <p class="font-bold">{{ val }}</p>
      <span class="text-xs">{{ unit }}</span>
    </div>
  </div>
</template>