<template>
  <v-card class="m-2 mt-0 md:m-5 md:mt-0 flex flex-wrap" variant="elevated">
    <div class="flex flex-wrap gap-4">
      
    </div>
  </v-card>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue';

const route = useRoute()

const compaignId = computed(() => {
  return route.params.id;
})
</script>