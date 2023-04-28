<template>
  <div class="flex flex-col bg-gray-200">
    <CampaignDetailTab />
    <CampaignAnalysis />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CampaignDetailTab from './CampaignDetailTab.vue';
import CampaignAnalysis from './CampaignAnalysis.vue';
</script>