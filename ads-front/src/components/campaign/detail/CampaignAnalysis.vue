<template>
  <v-card class="m-2 mt-0 md:m-5 md:mt-0 flex flex-wrap" variant="elevated">
    <div class="flex flex-wrap gap-4 w-full lg:w-1/3">
      <AnalysisComponent title="合計給果" :val="totalCost" unit="" />
      <AnalysisComponent title="結果の申ッ" val=0 unit="JPY" />
      <AnalysisComponent title="総コスト" :val="totalCost" unit="JPY" />
    </div>

    <div class="flex flex-wrap gap-4 w-full lg:w-2/3 lg:justify-end">
      <AnalysisComponent title="インプレツション" val=434 unit="" />
      <AnalysisComponent title="クリック" :val="clicks" unit="" />
      <AnalysisComponent title="CPC" :val="cpc" unit="JPY" />
      <AnalysisComponent title="CTR" :val="ctr" unit="%" />
      <AnalysisComponent title="CV" :val="cv" unit="" />
      <AnalysisComponent title="CPA" :val="cpa" unit="JPY" />
      <AnalysisComponent title="CVR" :val="cvr" unit="%" />
    </div>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import AnalysisComponent from './AnalysisComponent.vue';

const store = useStore()

const totalCost = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cost, 0.0)
})

const clicks = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.clicks, 0.0)
})

const cpc = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cost/item.clicks, 0.0).toFixed(2)
})

const ctr = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.clicks/item.views, 0.0).toFixed(2)
})

const cv = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cv, 0.0)
})

const cpa = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cost/item.cv, 0.0).toFixed(2)
})

const cvr = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cv/item.clicks, 0.0).toFixed(2)
})



</script>