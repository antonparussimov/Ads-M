<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable width="auto">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> 列フィルター </v-btn>
      </template>
      <v-card>
        <v-card-title>列フィルター</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-checkbox v-model="selectedColumns" density="compact" label="時間" value="time"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="総コスト" value="totalCost"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="キャンペーン名" value="campaignName"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="グループ名" value="groupName"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="広告名" value="adName"></v-checkbox>
          <!--<v-checkbox v-model="selectedColumns" density="compact" label="結果の単価" value="costPerResult"></v-checkbox> -->
          <v-checkbox v-model="selectedColumns" density="compact" label="IMP数" value="impressions"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="Clicks" value="clicks"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="CTR" value="ctr"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="CPC" value="cpc"></v-checkbox>
          <!-- <v-checkbox v-model="selectedColumns" density="compact" label="Result rate" value="resultRate"></v-checkbox>-->
          <v-checkbox v-model="selectedColumns" density="compact" label="Result" value="result"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="CPA" value="cpa"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="CVR" value="cvr"></v-checkbox>
          <!--<v-checkbox v-model="selectedColumns" density="compact" label="Conversions" value="conversions"></v-checkbox> -->
          <v-checkbox v-model="selectedColumns" density="compact" label="Reach" value="reach"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="CPM" value="cpm"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="Frequency" value="frequency"></v-checkbox>
          <v-checkbox v-model="selectedColumns" density="compact" label="tag1" value="tag1"></v-checkbox>
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

const selectedColumns = computed({
  get: () => store.state.campaignDetail.selectedColumns,
  set: (value) => store.commit('updateSelectedColumn', value),
})
</script>
