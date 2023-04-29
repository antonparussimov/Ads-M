<template>
  <div class="flex flex-col bg-gray-200">
    <CampaignDetailTab />
    <CampaignAnalysis />
    <CampaignMainTab />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CampaignDetailTab from './CampaignDetailTab.vue';
import CampaignAnalysis from './CampaignAnalysis.vue';
import CampaignMainTab from './CampaignMainTab.vue';
</script>