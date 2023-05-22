<template>
  <div class="m-2 p-2 md:m-5 md:p-4 flex flex-wrap items-center gap-y-4 bg-white rounded">
    <div class="w-full md:w-1/2">
      Campaigns Filter
    </div>

    <div class="w-full md:w-1/2 flex flex-wrap md:justify-end gap-4">
      <VueDatePicker v-model="filterRanges" range format="yyyy-MM-dd"/>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { format } from 'date-fns'

const store = useStore()

const filterRanges = computed({
  get: () => [store.state.campaignDetail.startDate, store.state.campaignDetail.endDate],
  set: (value) => {
    if(value.length == 2) {
      let value1 = [];
      value1[0] = format(value[0], 'yyyy-MM-dd')
      value1[1] = format(value[1], 'yyyy-MM-dd')
      store.dispatch('getCampaignDetail', value1)
    }
  },
})
</script>
