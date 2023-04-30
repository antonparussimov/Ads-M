<template>
  <div>
    <div class="flex justify-between px-5">
      <h3 class="text-xl font-bold my-auto">詳細分析</h3>

      <div class="my-auto">
        <ColumnFilterModal />
      </div>
    </div>

    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      class="elevation-1"
      item-value="name"
    >
    </v-data-table>
  </div>
</template>

<script setup>
import ColumnFilterModal from './ColumnFilterModal.vue';
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { format } from 'date-fns'

const store = useStore()

const itemsPerPage = ref(20)
const items = computed(() => {
  return store.state.campaignDetail.campaignHistory.map((item) => {
    return ({
      date: format(new Date(item.date), 'MM/dd/yyyy'),
      cost: item.cost,
      costPerResult: 0,
      cpc: (item.cost / item.views).toFixed(2),
      impressions: 0,
      ctr: (item.clicks / item.views).toFixed(2),
      clicks: item.clicks,
      resultRate: 0,
      result: 0,
      cpa: (item.cost / item.cv).toFixed(2),
      cvr: (item.clicks / item.cv).toFixed(2),
      conversions: 0,
      reach: 0,
      costPer1000People: 0,
      frequency: 0,
    })
  })
})

const headers = computed(() => {
  return allHeaders.filter((headerItem) => store.state.campaignDetail.selectedColumns.includes(headerItem.key))
})

const allHeaders = [
  { title: '時間', align: 'start', sortable: false, key: 'date', fixed: true },
  { title: '総コスト', align: 'end', sortable: false, key: 'cost' },
  { title: '結果の単価', align: 'end', sortable: false, key: 'costPerResult' },
  { title: 'CPC', key: 'cpc', align: 'end' },
  { title: 'IMP数', key: 'impressions', align: 'end' },
  { title: 'CTR', key: 'ctr', align: 'end' },
  { title: 'Clicks', key: 'clicks', align: 'end' },
  { title: 'Result rate', key: 'resultRate', align: 'end' },
  { title: 'Result', key: 'result', align: 'end' },
  { title: 'CPA', key: 'cpa', align: 'end' },
  { title: 'CVR', key: 'cvr', align: 'end' },
  { title: 'Conversions', key: 'conversions', align: 'end' },
  { title: 'Reach', key: 'reach', align: 'end' },
  { title: 'Cost Per 1000 People', key: 'costPer1000People', align: 'end' },
  { title: 'Frequency', key: 'frequency', align: 'end' }
]
</script>
