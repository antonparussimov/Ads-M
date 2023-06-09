<template>
  <HamburgerMenu />
  <div class="flex flex-col bg-gray-200">
    <CampaignDetailTab />
    <CampaignAnalysis />
    <CampaignMainTab />
  </div>
</template>

<script setup>
import HamburgerMenu from '../../common/HamburgerMenu.vue'
import CampaignDetailTab from './CampaignDetailTab.vue';
import CampaignAnalysis from './CampaignAnalysis.vue';
import CampaignMainTab from './CampaignMainTab.vue';
</script>