<template>
    <div class="relative w-3/4 shadow-lg mt-4 mb-4 text-sm border-2 mx-auto" ref="myComponent2">
      <div class="mt-4 mb-4 text-sm mx-auto text-left whitespace-normal"><div class = "px-5 py-3">{{ props.title }}</div></div>
      <div class="absolute w-10 h-10 border-2 rounded-lg right-0 bottom-0 mx-auto" @click="removeList">del</div>
  
      <br />
    </div>
  </template>
  <script setup>
  import { ref, computed, onMounted, defineProps } from 'vue';
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
  });
  const store = useStore();
  const myComponent2 = ref(null)
  onMounted(() => {
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
  
  
  
  const removeList = () => {
    if (confirm('本当にこのリストを削除しますか？')) {
      store.dispatch('removefinishedlist', { listIndex: props.listIndex })
    }
  }
  </script>
  
  
  