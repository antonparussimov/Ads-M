<template>
  <v-card class="m-2 mt-0 md:m-5 md:mt-0 flex flex-wrap" variant="elevated">
    <div class="flex flex-wrap gap-4 w-full lg:w-2/3">
      <AnalysisComponent title="総コスト" :val="totalCost" unit="JPY" />
      <AnalysisComponent title="imp" :val="views" unit="" />
      <AnalysisComponent title="clicks" :val="clicks" unit="" />
      <AnalysisComponent title="CPC" :val="cpc" unit="JPY" />
      <AnalysisComponent title="CTR" :val="ctr" unit="%" />
      <AnalysisComponent title="CV" :val="cv" unit="" />
      <AnalysisComponent title="CPA" :val="cpa" unit="JPY" />
      <AnalysisComponent title="CVR" :val="cvr" unit="%" />
    </div>

    <div class="flex flex-wrap gap-4 w-full lg:w-2/3 lg:justify-end"></div>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AnalysisComponent from './AnalysisComponent.vue'

const store = useStore()
store.dispatch('getCampaignDetail', [store.state.campaignDetail.startDate, store.state.campaignDetail.endDate])
const totalCost = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cost, 0.0)
})

const views = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.views, 0.0)
})
const clicks = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.clicks, 0.0)
})

const cpc = computed(() => {
  const clicks = store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.clicks, 0.0)
  const totalCost = store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cost, 0.0)
  return (totalCost / clicks).toFixed(0)
})

const ctr = computed(() => {
  const clicks = store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.clicks, 0.0)
  const views = store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.views, 0.0)
  return ((clicks / views) * 100).toFixed(2)
})

const cv = computed(() => {
  return store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cv, 0.0)
})

const cpa = computed(() => {
  const cv = store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cv, 0.0)
  const totalCost = store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cost, 0.0)
  return (totalCost / cv).toFixed(0)
})

const cvr = computed(() => {
  const cv = store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.cv, 0.0)
  const clicks = store.state.campaignDetail.campaignHistory.reduce((total, item) => total + item.clicks, 0.0)
  return ((cv / clicks) * 100).toFixed(2)
})
</script>
