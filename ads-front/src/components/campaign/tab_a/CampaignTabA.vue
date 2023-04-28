<template>
  <div class="flex flex-wrap justify-between">
    <div class="flex flex-wrap items-center w-full lg:w-2/3 gap-4">
      <button
        class="px-6 py-2 my-auto font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
      >
        作成
      </button>

      <div class="">
        <v-select 
          label="編集"
          class="w-36 mt-5"
          variant="outlined"
          density="comfortable"
          v-model="editSelected"
          :items="editItems"> 
        </v-select>
      </div>

      <div class="">
        <v-select 
          label="一括作成廣集"
          class="w-40 mt-5"
          variant="outlined"
          density="comfortable"
          v-model="bullCreateSelected"
          :items="bullCreateItems"
          single-line
        ></v-select>
      </div>

      <div class="">
        <v-select 
          label="自動化ルール"
          class="w-40 mt-5"
          variant="outlined"
          density="comfortable"
          v-model="rullSelected"
          :items="rullItems"
          single-line
        ></v-select>
      </div>
    </div>

    <div class="flex flex-wrap lg:justify-end w-full lg:w-1/3 gap-4">
      <div class="">
        <v-select 
          label="'既存フィルター"
          class="w-36 mt-5"
          variant="outlined"
          density="comfortable"
          v-model="ColumnFilterSelected"
          :items="ColumnFilterItems"
          single-line
        ></v-select>
      </div>

      <div class="">
        <v-select 
          label="20/ページ"
          class="w-36 mt-5"
          variant="outlined"
          density="comfortable"
          v-model="countPerPageSelected"
          :items="countPerPageItems"
          single-line
        ></v-select>
      </div>
    </div>

    <CampaignTabTable />
  </div>
</template>

<script setup>
import CampaignTabTable from './CampaignTabTable.vue'
import { ref } from 'vue'

const editItems = ref(['編集'])
const editSelected = ref(null)

const bullCreateItems = ref(['一括作成廣集'])
const bullCreateSelected = ref('一括作成廣集')

const rullItems = ref(['自動化ルール'])
const rullSelected = ref('自動化ルール')

const ColumnFilterItems = ref(['既存フィルター'])
const ColumnFilterSelected = ref('既存フィルター')

const countPerPageSelected = ref('20/ページ')
const countPerPageItems = ref(['20/ページ'])
</script>

<style>
.v-field-label{
  margin-top: auto;
  margin-bottom: auto;
}
</style>
