<template>
  <HamburgerMenu />
  <div class="bg-gray-200 w-full p-5">
    <h2 class="text-3xl">広告作成</h2>

    <div class="flex justify-end items-center mt-4 pr-3">
      <CampaignPresetModal />
    </div>

    <div class="flex justify-start items-center mt-4 overflow-x-auto">
      <div class="flex gap-4">
        <CampaignAddItem v-for="(campaign, index) in campaigns" :index="index" :campaign="campaign" />
        <v-btn icon="mdi-plus" color="#58A4F5" class="text-white" @click="addNewCampaign"></v-btn>
      </div>
    </div>

    <div class="flex justify-end items-center mt-4 gap-10">
      <div class="flex gap-5">
        <v-btn v-if="showPresetSelectable" color="#58A4F5" class="text-white" @click="addNewPreset">プリセット保存</v-btn>

        <v-btn v-if="!showPresetSelectable" color="#58A4F5" class="text-white" @click="reversePresetSelectable">プリセット保存</v-btn>
        <v-btn v-else color="default" class="" @click="reversePresetSelectable">選択解除</v-btn>
      </div>
      <v-btn color="#58A4F5" class="text-white" @click="addToTikTok">広告を出稿する</v-btn>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import CampaignAddItem from './CampaignAddItem.vue'
import CampaignPresetModal from './CampaignPresetModal.vue'
import HamburgerMenu from '../common/HamburgerMenu.vue'
import campaignFields from '../../data/campaignField'
import * as types from '../../store/types'

const store = useStore()

/** state  */
const campaigns = computed(() => {
  return store.state.campaignAdd.campaigns
})

const showPresetSelectable = computed(() => {
  return store.state.campaignAdd.showPresetSelectable
})

/** event listener */
function addNewCampaign() {
  let newCampaign = {title: ''}
  for(let i = 0 ; i < Object.keys(campaignFields).length ; i ++) {
    newCampaign[`cell${i}`] = ''
  }

  store.commit(types.CREATE_NEW_CAMPAIGN, newCampaign)
}

function reversePresetSelectable() {
  store.commit(types.REVERSE_PRESET_SELECTABLE)
}

function addNewPreset() {
  store.dispatch(types.ADD_NEW_PRESET);
}

function addToTikTok() {
  store.dispatch(types.ADD_CAMPAIGN_TO_TIKTOK)
}
</script>