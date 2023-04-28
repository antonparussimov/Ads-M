<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    :loading="loading"
    :search="search"
    :options="itemsPerPageOptions"
    class="elevation-1"
    item-value="name"
    @update:options="loadItems"
  >
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
  </v-data-table-server>
</template>

<script>
const desserts = [
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 0,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP2',
    status: 1,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP3',
    status: 2,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP4',
    status: 2,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 2,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 2,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 2,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 2,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 2,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 1,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 1,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 1,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 0,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 0,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
  {
    selectStatus: true,
    switchStatus: true,
    name: 'CP1',
    status: 0,
    budget: 6.0,
    totalCost: 24,
    cpc: 4.0,
    cpm: 3.0,
    impressions: 5,
    clicks: 4,
    ctr: 3,
  },
]

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = desserts.slice()

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  },
}

export default {
  data: () => ({
    itemsPerPage: 20,
    itemsPerPageOptions: [10, 20, 50],
    headers: [
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
        key: 'switchStatus'
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
