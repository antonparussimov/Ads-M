<template>
  <div class="m-2 p-2 md:m-5 md:p-4 flex flex-wrap justify-between items-center gap-y-4 bg-white rounded">
    <div class="w-full md:w-auto flex">
      <v-text-field label="Name" v-model="filterInput" @keydown="handleKeyDown"></v-text-field>
      <v-row align="center" justify="start">
        <v-col v-for="(selection, i) in filterCampaignNames" :key="i" cols="auto" class="py-1 pe-0">
          <v-chip :disabled="loading" close @click="removeFilterCampaignName(i)">
            {{ selection }}
            <v-icon end icon="mdi-close"></v-icon>
          </v-chip>
        </v-col>
      </v-row>
    </div>

    <div class="w-64">
      <VueDatePicker v-model="filterRanges" range format="yyyy-MM-dd" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from 'date-fns'
import * as types from '../../../store/types'

const store = useStore()

const filterRanges = computed({
  get: () => [store.state.campaignDetail.startDate, store.state.campaignDetail.endDate],
  set: (value) => {
    if (value.length == 2) {
      let value1 = []
      value1[0] = format(value[0], 'yyyy-MM-dd')
      value1[1] = format(value[1], 'yyyy-MM-dd')
      store.dispatch('getCampaignDetail', value1)
    }
  },
})

const filterCampaignNames = computed(() => {
  return store.state.campaignDetail.filterCampaignNames
})

const filterInput = ref('')

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    store.dispatch(types.ADD_FILTER_NAME, filterInput.value)
    filterInput.value = ''
  }
}

function removeFilterCampaignName(index) {
  store.dispatch(types.REMOVE_FILTER_CAMPAIGN_NAME, index)
}
</script>
