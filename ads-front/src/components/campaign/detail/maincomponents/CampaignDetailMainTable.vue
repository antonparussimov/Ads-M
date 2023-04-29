<template>
  <div>
    <div class="flex justify-between px-5">
      <h3 class="text-xl font-bold my-auto">詳細分析</h3>

      <div class="">
        <v-select label="既存フィルター" class="w-36 mt-5" variant="outlined" density="comfortable" v-model="columnFilter" :items="columnItems" multiple> </v-select>
      </div>
    </div>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="serverItems"
      :loading="loading"
      :options="itemsPerPageOptions"
      expand
      class="elevation-1"
      item-value="name"
      @update:options="loadItems"
    >
    </v-data-table-server>
  </div>
</template>

<script>
import { ref } from 'vue'

const columnFilter = ref([])

const columnItems = ref([

])

export default {
  data: () => ({
    itemsPerPage: 20,
    itemsPerPageOptions: [10, 20, 50],
    headers: [
      { title: '時間', align: 'start', sortable: false, key: 'time', fixed: true },
      { title: '総コスト', align: 'end', sortable: false, key: 'totalCost' },
      { title: '結果の単価', align: 'end', sortable: false, key: 'costPerResult' },
      { title: 'CPC', key: 'cpc', align: 'end' },
      { title: 'IMP数', key: 'impressions', align: 'end' },
      { title: 'CTR', key: 'ctr', align: 'end' },
      { title: 'Clicks', key: 'clicks', align: 'end' },
      { title: 'Result rate', key: 'resultRate', align: 'end' },
      { title: 'result', key: 'result', align: 'end' },
      { title: 'CPA', key: 'cpa', align: 'end' },
      { title: 'CVR', key: 'cvr', align: 'end' },
      { title: 'Conversions', key: 'conversions', align: 'end' },
      { title: 'Reach', key: 'reach', align: 'end' },
      { title: 'Cost Per 1000 People', key: 'costPer1000People', align: 'end' },
      { title: 'Frequency', key: 'frequency', align: 'end' },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
  }),
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true
      FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
        this.serverItems = items
        this.totalItems = total
        this.loading = false
      })
    },
  },
}
</script>
