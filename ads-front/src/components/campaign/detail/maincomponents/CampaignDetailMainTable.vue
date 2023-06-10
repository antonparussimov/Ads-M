<template>
  <div>
    <div class="flex justify-between px-5">
      <h3 class="text-xl font-bold my-auto">詳細分析</h3>

      <div class="my-auto">
        <ColumnFilterModal />
      </div>
    </div>
    <!-- 詳細分析以下のテーブル -->
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="items" class="elevation-1"
      item-value="name">
      <!-- sorting table -->
      <template v-slot:item.campaignName="{ item }">
        <td @click="campaignClicked(item)">{{ item.selectable.campaignName }}</td>
      </template>
      <template v-slot:item.date="{ item }">
        <td @click="dateClicked(item)">{{ item.selectable.date }}</td>
      </template>
      <template v-slot:item.groupName="{ item }">
        <td @click="groupClicked(item)">{{ item.selectable.groupName }}</td>
      </template>

    </v-data-table>
  </div>
</template>

<script setup>
import ColumnFilterModal from './ColumnFilterModal.vue'
import ifError from '../../../../utils/ifError'

import * as types from '../../../../store/types'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { format } from 'date-fns'

const store = useStore()

const itemsPerPage = ref(50)

const items = computed(() => {
  let selectedcolumns = store.state.campaignDetail.selectedColumns;
let selectedkeys = [];
let count = 0;
for (let i of Object.keys(selectedcolumns)) {
  if (selectedcolumns[i] === 'campaignName') {
    selectedkeys.push('campaignName');
    count += 1;
  } else if (selectedcolumns[i] === 'groupName') {
    selectedkeys.push('groupName');
    count += 1;
  } else if (selectedcolumns[i] === 'adName') {
    selectedkeys.push('adName');
    count += 1;
  }
}
console.log(selectedkeys)
  if (count == 3) {
    return store.state.campaignDetail.campaignHistory.map((item) => {
      const date = new Date(item.date)
      const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())

      return {
        date: format(new Date(utcDate), 'yyyy/MM/dd'),
        campaignName: item.campaignName,
        groupName: item.groupName,
        adName: item.adName,
        cost: '¥' + item.cost.toLocaleString(),
        //costPerResult: 0,
        cpc: '¥' + ifError(item.cost / item.clicks, '-', 0),
        impressions: item.views.toLocaleString(),
        ctr: ifError((item.clicks / item.views) * 100, '-', 2) + '%',
        clicks: item.clicks.toLocaleString(),
        //resultRate: 0,
        result: item.cv.toLocaleString(),
        cpa: '¥' + ifError(item.cost / item.cv, '-', 0),
        cvr: ifError((item.cv / item.clicks) * 100, '-', 2) + '%',
        //conversions: 0,
        reach: 0,
        cpm: '¥' + ifError((item.cost / item.views) * 1000, '-', 0),
        frequency: 0,
        tag1: item.tag1,
      }
    }
    )
  }
  let historykey = new Set();
let NewHistory = {};
for (let item of store.state.campaignDetail.campaignHistory) {
  const date = new Date(item.date);
  const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  let key = format(new Date(utcDate), 'yyyy/MM/dd');
  for (let j of selectedkeys) {
    key += String(item[j]);
  }

  if (historykey.has(key)) {
    NewHistory[key].cost += item.cost;
    NewHistory[key].clicks += item.clicks;
    NewHistory[key].views += item.views;
    NewHistory[key].cv += item.cv;
    NewHistory[key].reach += 0;
    NewHistory[key].frequency += 0;
    NewHistory[key].tag1 = item.tag1;
  } else {
    NewHistory[key] = {
      date: format(new Date(utcDate), 'yyyy/MM/dd'),
      cost: item.cost,
      clicks: item.clicks,
      views: item.views,
      cv: item.cv,
      reach: 0,
      frequency: 0,
      tag1: item.tag1,
      campaignName:"",
      groupName:"",
      adName:"",
    };
    for (let j of selectedkeys) {
    NewHistory[key][j] = item[j]
  };
  historykey.add(key)
  }
}

  
  console.log(NewHistory)

  let ShowHistory = [];
for (let i of Object.keys(NewHistory)) {
  let item = NewHistory[i];
  item = {
        date: item.date,
        campaignName: item.campaignName,
        groupName: item.groupName,
        adName: item.adName,
        cost: '¥' + item.cost.toLocaleString(),
        cpc: '¥' + ifError(item.cost / item.clicks, '-', 0),
        impressions: item.views.toLocaleString(),
        ctr: ifError((item.clicks / item.views) * 100, '-', 2) + '%',
        clicks: item.clicks.toLocaleString(),
        result: item.cv.toLocaleString(),
        cpa: '¥' + ifError(item.cost / item.cv, '-', 0),
        cvr: ifError((item.cv / item.clicks) * 100, '-', 2) + '%',
        reach: 0,
        cpm: '¥' + ifError((item.cost / item.views) * 1000, '-', 0),
        frequency: 0,
        tag1: item.tag1,
}
ShowHistory.push(item)
}
  console.log(ShowHistory)
  //dateClicked(ShowHistory)
    return ShowHistory
})


const campaignClicked = (item) => {
  store.dispatch(types.ADD_FILTER_CAMPAIGN_NAME, item.columns.campaignName)
}
const groupClicked = (item) => {
  store.dispatch(types.ADD_FILTER_GROUP_NAME, item.columns.groupName)
}
const dateClicked = (item) => {
  const date = new Date(item.columns.date)
  let value1 = []
  value1[0] = format(date, 'yyyy-MM-dd')
  value1[1] = format(date, 'yyyy-MM-dd')
  store.dispatch('getCampaignDetail', value1)
}
const headers = computed(() => {
  return allHeaders.filter((headerItem) => store.state.campaignDetail.selectedColumns.includes(headerItem.key))
})

const allHeaders = [
  { title: '日付', align: 'start', key: 'date', fixed: true },
  { title: 'キャンペーン名', key: 'campaignName', align: 'end' },
  { title: 'グループ名', key: 'groupName', align: 'end' },
  { title: '広告名', key: 'adName', align: 'end' },
  { title: '総コスト', align: 'end', key: 'cost' },
  //{ title: '結果の単価', align: 'end', sortable: false, key: 'costPerResult' },
  { title: 'IMP数', key: 'impressions', align: 'end' },
  { title: 'Clicks', key: 'clicks', align: 'end' },
  { title: 'CTR', key: 'ctr', align: 'end' },
  { title: 'CPC', key: 'cpc', align: 'end' },
  //{ title: 'Result rate', key: 'resultRate', align: 'end' },
  { title: 'Result', key: 'result', align: 'end' },
  { title: 'CPA', key: 'cpa', align: 'end' },
  { title: 'CVR', key: 'cvr', align: 'end' },
  //{ title: 'Conversions', key: 'conversions', align: 'end' },
  { title: 'Reach', key: 'reach', align: 'end' },
  { title: 'CPM', key: 'cpm', align: 'end' },
  { title: 'Frequency', key: 'frequency', align: 'end' },
  { title: '媒体', key: 'tag1', align: 'end' },
]
</script>