<template>
  <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="items" class="elevation-1" item-value="name">
    <!-- Displaying data as a checkbox -->
    <template #item.selectStatus="{ item }">
      <v-checkbox v-model="item.selectStatus"></v-checkbox>
    </template>

    <!-- Displaying data as a switch -->
    <template #item.switchStatus="{ item }">
      <v-switch v-model="item.switchStatus"></v-switch>
    </template>

    <template #item.status="{ item }">
      <v-badge v-if="item.status == '0'" dot color="success"></v-badge>
      <v-badge v-else-if="item.status == '1'" dot color="info"></v-badge>
      <v-badge v-else="item.status == '2'" dot color="error"></v-badge>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const itemsPerPage = ref(20)
const headers = ref([
  {
    title: '',
    align: 'center',
    sortable: false,
    key: 'selectStatus',
  },
  {
    title: 'スイッチ',
    align: 'center',
    sortable: false,
    key: 'switchStatus',
  },
  {
    title: '名前',
    align: 'center',
    sortable: false,
    key: 'name',
  },
  { title: 'ステータス', key: 'status', align: 'center' },
  { title: '予算', key: 'budget', align: 'end' },
  { title: '予算', key: 'totalCost', align: 'end' },
  { title: 'CPC', key: 'cpc', align: 'end' },
  { title: 'CPM', key: 'cpm', align: 'end' },
  { title: 'Impressions', key: 'impressions', align: 'end' },
  { title: 'Clicks', key: 'clicks', align: 'end' },
  { title: 'CTR', key: 'ctr', align: 'end' },
])

const items = computed(() => {
  return store.state.campaignList.map((item) => {
    return ({
      name: item.campaignName,
      budget: 0,
      totalCost: item.cost,
      cpc: (item.cost / item.views).toFixed(2),
      cpm: (item.cost / item.views * 1000).toFixed(2),
      impressions: 0,
      clicks: item.clicks,
      ctr: (item.clicks / item.views).toFixed(2),
    })
  })
})

onMounted(() => {
  store.dispatch('getCampaigns')
})
</script>
