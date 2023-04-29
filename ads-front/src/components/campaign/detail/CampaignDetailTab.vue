<template>
  <v-card class="m-2 p-2 md:m-5 md:p-4 flex flex-wrap items-center gap-y-4" variant="elevated">
    <v-tabs class="w-full md:w-5/12">
      <v-tab> バフォーマンス </v-tab>
      <v-tab> オーディエンス </v-tab>
    </v-tabs>

    <div class="w-full md:w-7/12 flex flex-wrap md:justify-end gap-4">
      <input name="startDate" :value="startDate" @input.prevent="updateDate" type="date" placeholder="John Doe" class="block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 w-44" />
      <input name="endDate" :value="endDate" @input.prevent="updateDate" type="date" placeholder="John Doe" class="block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 w-44" />
    </div>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const startDate = ref(null)
const endDate = ref(null)

function updateDate(e) {
  if(e.target.name == "startDate") {
    startDate.value = e.target.value;
  }else {
    endDate.value = e.target.value;
  }

  if(startDate.value > endDate.value) {
    if(e.target.name == "startDate") {
      endDate.value = startDate.value
    }else {
      startDate.value = endDate.value
    }
  }

  if(startDate.value == null || endDate.value == null) {
    return;
  }

  
}

</script>
