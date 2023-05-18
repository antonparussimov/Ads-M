<template>
  <v-card variant="elevated" class="p-3 bg-white">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">{{ title }}</v-card-title>
    <v-card-text>
      <template v-for="(value, key) in preset">
        <v-switch
          v-if="campaignField[key].type == 'switch'" :label="campaignField[key].title" :model-value="value" readonly
        ></v-switch>
        <v-text-field variant="outlined"
          v-if="campaignField[key].type == 'string'" :label="campaignField[key].title" :model-value="value" readonly
        ></v-text-field>
      </template>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import campaignField from '../../data/campaignField';

const props = defineProps({
  index: Number,
})

const store = useStore()

/*----------------state---------------*/

const preset = computed(() => {
  let ret = Object.entries(store.state.campaignAdd.presets[props.index]);

  ret = ret.filter(([key, value]) => key.includes('cell'));
  ret = Object.fromEntries(ret)
  return ret
})

const title = computed(() => {
  return store.state.campaignAdd.presets[props.index].title
})
</script>
