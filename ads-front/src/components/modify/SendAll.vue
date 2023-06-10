<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import imgUrl from './assets/sendoff2.png'
import { VBtn } from 'vuetify/components/VBtn';

  import { DotLoader } from "vue3-spinner";
const store = useStore()
const myImage2 = ref(null);
const a = {
  image: imgUrl,
};
const show = computed(() => store.state.showloading);const isdisplay = ref(true)
const props = defineProps({
  aim: {
    type: String,
    required: true,
  },
});
;

const click_send = async () => {
  if (show.value == true){return};
  await store.dispatch("addlist", { aim: props.aim });
};


</script>

<template>
  <div class = "overflow-hidden text-gray-400 rounded-lg mx-auto my-2">
    
<div>
        <v-btn class = "basis-1/6" ref = "myImage2"
        style = ""
        v-on:click = "click_send">生成する</v-btn>
</div>
<div class="flex flex-row">
  <div class="basis-5/6">
      <p v-if = "show" class="flex justify-center">ChatGptの答えを待っています。</p>
      <p><DotLoader   :loading="show" size="30px" class="flex justify-center"/></p>
    </div>
  </div>
</div>
</template>