<script setup>

import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import imgUrl from './assets/sendoff2.png'
import { DotLoader } from "vue3-spinner";
import { VBtn } from 'vuetify/components/VBtn';
const store = useStore()
const myImage2 = ref(null);
const a = {
  image: imgUrl,
};
const show = computed(() => store.state.showloading2);
const props = defineProps({
  aim: {
    type: String,
    required: true,
  },
});
;


const click_send = async () => {
  if (show.value == true) { return };
  await store.dispatch("addgpttexttofinishedtext", { aim: props.aim });
  console.log("hello world ");
};



</script>


<template>
  <div class="flex flex-row my-2">
    <div class="basis-5/6">
      <v-btn class="basis-1/6" ref="myImage2" style="" v-on:click="click_send">続きを書く</v-btn>
    </div>
  </div>
  <div class="flex flex-row">
    <div class="basis-5/6">
      <p v-if="show" class="flex justify-center text-gray-400">ChatGptの答えを待っています。</p>
      <p>
        <DotLoader :loading="show" size="30px" class="flex justify-center" />
      </p>
    </div>
  </div>
</template>