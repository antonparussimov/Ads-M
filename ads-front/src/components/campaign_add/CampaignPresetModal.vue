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
                />
              </v-list>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
              <v-sheet class="pa-2 ma-2">
                .v-col-auto
              </v-sheet>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = !dialog"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const dialog = ref(false)

const presetList = computed(() => {
  return store.state.campaignAdd.presets
})
</script>
