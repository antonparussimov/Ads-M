<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable width="800">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> プリセットを使用する </v-btn>
      </template>
      <v-card>
        <v-card-title>プリセットリスト</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="flex">
          <v-row no-gutters>
            <v-col cols="2">
              <v-list>
                <v-list-item
                  v-for="(item, index) in presetList"
                  key="preset{{ index }}"
                  :title="item.title"
                  :value="index"
                  @click="showPreset(index)"
                />
              </v-list>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
              <CampaignPreset :index="selectedPreset" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions justify="end">
          <v-btn color="blue" variant="text" @click="addPresetToCampaign"> 追加 </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = !dialog"> キャンセル </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { startOfDecade } from 'date-fns';
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import * as types from '../../store/types'
import CampaignPreset from './CampaignPreset.vue';

const store = useStore()

/** state */
const dialog = ref(false)

const selectedPreset = ref(0)

const presetList = computed(() => {
  return store.state.campaignAdd.presets
})

/** lifecycle method */
onMounted(() => {
  store.dispatch(types.GET_PRESETS)
})

/** event listener */
function showPreset(index) {
  selectedPreset.value = index
}

function addPresetToCampaign() {
  dialog.value = !dialog.value
  store.commit(types.ADD_NEW_CAMPAIGN_FROM_PRESET, selectedPreset.value)
}

</script>
