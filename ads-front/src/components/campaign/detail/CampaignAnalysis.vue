<template>
  <v-card class="m-2 mt-0 md:m-5 md:mt-0 flex flex-wrap" variant="elevated">
    <div class="flex flex-wrap gap-4 w-full lg:w-1/3">
      <AnalysisComponent title="合計給果" val=0 unit="JPY" />
      <AnalysisComponent title="結果の申ッ" val=0 unit="" />
      <AnalysisComponent title="総コスト" val=0 unit="" />
    </div>

    <div class="flex flex-wrap gap-4 w-full lg:w-2/3 lg:justify-end">
      <AnalysisComponent title="インプレツション" val=434 unit="JPY" />
      <AnalysisComponent title="クリック" val=3 unit="" />
      <AnalysisComponent title="CPC" val=108 unit="JPY" />
      <AnalysisComponent title="CTR" val=0.69 unit="%" />
      <AnalysisComponent title="CV" val=0 unit="" />
      <AnalysisComponent title="CPA" val=108 unit="JPY" />
      <AnalysisComponent title="CVR" val=108 unit="" />
    </div>
  </v-card>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue';

import AnalysisComponent from './AnalysisComponent.vue';

const route = useRoute()

const campaignId = computed(() => {
  return route.params.id;
})
</script>