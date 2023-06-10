<template>
  <div class="relative h-full w-full mt-4 mb-4 text-sm mx-auto mx-5" ref="myComponent2">
    
    <textarea
      class="peer h-full w-full mx-3 resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
      v-model="text"
    ></textarea>
    <label class="mx-3 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Textarea
    </label>
    
  </div>


</template>
<script setup>
import { ref, computed, onMounted, watch} from 'vue';
import { useStore } from 'vuex';
import { nextTick } from 'vue';
const nowtext = computed(() => store.state.nowtext);
const text = ref("");
const store = useStore();
const myComponent2 = ref(null);
onMounted(() => {
  text.value = nowtext.value
  // Vue.jsが内部で持っているDOM更新キューに現在の更新を入れ、DOMが更新された後に実行されるコールバック関数を登録します。
  nextTick(() => {
    // コンポーネントがマウントされた後に実行される
    const element = myComponent2.value
    const top = element.offsetTop // 要素の上端の位置

    window.scrollTo({
      top,
      behavior: 'smooth', // スクロールをスムーズにする
    })
  })
})
// nowtext が変更された際、textの値を更新する
watch(nowtext, (beforenowtext, afternowtext) => {
  text.value = nowtext.value
} )

// text　が変更された際、nowtextの値を変更する
watch(text, (beforetext, aftertext) => {
  store.dispatch("changenowtext", text.value)
} )



</script>
  
  
  