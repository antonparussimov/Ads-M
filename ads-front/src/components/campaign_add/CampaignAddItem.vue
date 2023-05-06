<template>
  <v-card variant="outlined" class="p-3 w-72 bg-white">
    <template v-for="(value, key) in campaign">
      <v-switch
        v-if="campaignField[key].type == 'switch'" :label="campaignField[key].title" :value="value" @input="(event) => changeContent(key, event)"
      ></v-switch>
      <v-text-field variant="outlined"
        v-if="campaignField[key].type == 'string'" :label="campaignField[key].title" :value="value" @input="(event) => changeContent(key, event)"
      ></v-text-field>
    </template>
    <div v-if="showPresetSelectable" class="">
      <v-checkbox
        v-model="selectedCampaigns"
        :value="props.index"
        label="プリセット保存"
      ></v-checkbox>
      <v-text-field variant="outlined"
        label="プリセットタイトル" v-model="title"
      ></v-text-field>
    </div>
  </v-card>
</template>

<script setup>
const props = defineProps({
  campaign: Object,
  index: Number,
})

import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import campaignField from '../../data/campaignField';
import * as types from '../../store/types'

const store = useStore()

/*--------------event listener------------- */
const changeContent = (key, event) => {
  const payload = {
    index: props.index,
    key: key,
    value: event.target.value
  }

  store.commit(types.CHANGE_NEW_CAMPAIGN_ATTR, payload)
}

/*----------------state---------------*/
const campaign = computed(() => {
  let ret = Object.entries(props.campaign);

  ret = ret.filter(([key, value]) => key.includes('cell'));
  ret = Object.fromEntries(ret)
  return ret
})

const selectedCampaigns = computed({
  get: () => store.state.campaignAdd.selectedCampaigns,
  set: (value) => {
    store.commit(types.ChANGE_NEW_SELECTABLE, value)
  }
})

const showPresetSelectable = computed(() => {
  return store.state.campaignAdd.showPresetSelectable
})

const title = computed({
  get: () => props.campaign.title,
  set: (value) => store.commit(types.CHANGE_NEW_CAMPAIGN_TITLE, {
    index: props.index,
    title: value,
  })
})
</script>
