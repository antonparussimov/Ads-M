<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      width="400"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          Select Advertiser
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Select Advertiser</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="dialogm1"
            column
          >
            <v-radio
              v-for="advertiser in allowAdvertisers"
              :label="advertiser.name + '(' + advertiser.advertiserId + ')'"
              :value="advertiser.id"
              @click="setAdvertiser(advertiser.advertiserId, advertiser.accessToken)"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const dialog = ref(false)
const dialogm1 = ref('')

const allowAdvertisers = computed(() => {
  return store.state.allowAdvertisers;
})

onMounted(() => {
  store.dispatch('getAllowAdvertisers')
})

function setAdvertiser(advertiserId, accessToken) {
  store.commit('setAdvertiser', {advertiserId, accessToken})
}
</script>