<template>
  <div class="w-full bg-gray-200 p-5 pt-0">
      <v-card>
        <v-tabs v-model="tab" class="bg-gray-200">
          <v-tab value="one" :class="tab1Class">全体的なトレンド</v-tab>
          <v-tab value="two" :class="tab2Class">プレースメント</v-tab>
        </v-tabs>
    
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              <CampaignDetailMainChart />
              <!-- <CampaignDetailMainTable /> -->
            </v-window-item>
    
            <v-window-item value="two"></v-window-item>
    
            <v-window-item value="three"></v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import CampaignDetailMainChart from './maincomponents/CampaignDetailMainChart.vue';
import CampaignDetailMainTable from './maincomponents/CampaignDetailMainTable.vue';

const tab = ref(null)

const tab1Class = computed(() => {
  return tab.value == "one" ? 'bg-white' : ""
})
const tab2Class = computed(() => {
  return tab.value == "two" ? 'bg-white' : ""
})
const tab3Class = computed(() => {
  return tab.value == "three" ? 'bg-white' : ""
})
</script>

<style>
/* .v-tab__slider {
  display: none;
}
.v-tab--selected {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
} */
</style>