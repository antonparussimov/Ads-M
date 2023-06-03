<template>
  <HamburgerMenu />
  <div class="flex flex-col">
    <CampaignFilter />
    <CampaignTab />
  </div>
</template>

<script setup>
import HamburgerMenu from '../common/HamburgerMenu.vue'
import CampaignFilter from './CampaignFilter.vue'
import CampaignTab from './CampaignTab.vue'
</script>
