<template>

  <v-row v-if="editFlag" no-gutters justify="center">
    <v-col cols="12" md="5">
      <v-sheet class="ma-2 pa-2">
        <v-text-field label="Advertiser ID" v-model="advertiserId"></v-text-field>
      </v-sheet>
    </v-col>
    <v-col cols="12" md="5">
      <v-sheet class="ma-2 pa-2">
        <v-text-field label="Access Token" v-model="token"></v-text-field>
      </v-sheet>
    </v-col>
    <v-col cols="12" md="2" class="flex justify-center items-center">
      <v-btn @click.prevent="updateAdvertiserInfo">
        OK
      </v-btn>

      <v-btn @click.prevent="editFlag = !editFlag">
        Cancel
      </v-btn>
    </v-col>
  </v-row>

  <v-row v-else no-gutters justify="center">
    <v-col cols="12" md="5">
      <v-sheet class="flex items-center ma-2 pa-2">
        <p class="text-h5">Advertiser ID: </p>
        <p class="text-h5">{{ advertiserId }}</p>
      </v-sheet>
    </v-col>
    <v-col cols="12" md="5">
      <v-sheet class="flex items-center ma-2 pa-2">
        <p class="text-h5">Access Token: </p>
        <p class="text-h5">{{ token }}</p>
      </v-sheet>
    </v-col>
    <v-col cols="12" md="2" class="flex justify-center items-center">
      <v-btn @click.prevent="editFlag = !editFlag">
        Edit
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const editFlag = ref(false)
const advertiserId = ref()
const token = ref()

watch(store.state.advertiserAuth, async (newAdvertiserAuth, oldAdvertiserAuth) => {
  token.value = newAdvertiserAuth.advertiser.accessToken
  advertiserId.value = newAdvertiserAuth.advertiser.advertiserId
})

onMounted(async() => {
  store.dispatch("advertiserAuth/loadAdvertiser")
})

const updateAdvertiserInfo = () => {
  const payload = {
    accessToken: token.value,
    advertiserId: advertiserId.value
  }
  store.dispatch('advertiserAuth/updateAdvertiserInfo', payload).then(() => editFlag.value = false)
}
</script>