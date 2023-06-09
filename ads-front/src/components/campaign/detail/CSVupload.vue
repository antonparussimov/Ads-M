
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as types from '../../../store/types'

const store = useStore()


const outputList = ref([]);
    const changeFile = async (e) => {
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        await new Promise((resolve) => (reader.onload = () => resolve()));
        if (reader.result) {
          const lineList = reader.result.split("\n");
          console.log(lineList[0])
          const keyList = lineList[0].split(",");
          console.log(keyList)
          const resultObj = lineList
            .filter((_, index) => index !== 0)
            .map((line) => {
              const valueList = line.split(",");
              const tmpObj = {};
              keyList.map((key, index) => (tmpObj[key] = valueList[index]));
              return tmpObj;
            });
          outputList.value = resultObj;
          console.log(resultObj)
          //add to database
          store.dispatch(types.GET_CAMPAIGN_FROM_CSV,resultObj)
          console.log("completed")
        }
      }
    };

</script>

<template>
      <div  class="w-full">

  <v-file-input label="CSVファイルを読み込む" id="csvUpload" name="csvUpload" accept=".csv" @input="changeFile"/>
      </div>
  </template>
