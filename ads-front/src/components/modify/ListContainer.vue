<template>
  <div class = "flex flex-row overflow-auto">
  <div class="basis-5/6 relative w-3/4 shadow-lg mt-4 mb-4 text-sm border-2 mx-auto" ref="myComponent">
    <div class="text-sm mx-auto text-left whitespace-normal"><div class = "px-5 py-3">{{ props.title }}</div></div></div>
    <div class="basis-1/6 rounded-lg mt-4 mb-4" @click="addfinishedList"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>
    <br />
  
</div>
</template>
<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useStore } from 'vuex';
import { nextTick } from 'vue';


const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  listIndex: {
    type: Number,
    required: true,
  },
  who: String,
});

const store = useStore();
const myComponent = ref(null)
onMounted(() => {
  // Vue.jsが内部で持っているDOM更新キューに現在の更新を入れ、DOMが更新された後に実行されるコールバック関数を登録します。
  nextTick(() => {
    // コンポーネントがマウントされた後に実行される
    const element = myComponent.value
    const top = element.offsetTop // 要素の上端の位置

    window.scrollTo({
      top,
      behavior: 'smooth', // スクロールをスムーズにする
    })
  })
})


//
const addfinishedList = () => {
      store.dispatch('addfinishedlist', { title: props.title })
}

//今は使っていない。
//remove が必要になったときにつかえる
// const removeList = () => {
//   if (confirm('本当にこのリストを削除しますか？')) {
//     store.dispatch('removelist', { listIndex: props.listIndex })
//   }
// }
</script>


