<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

// import imgUrl2 from './assets/sendon2.png'
const store = useStore()
const myImage3 = ref(null)
const click_clear = () => {
  if (confirm('本当に商品名と特徴を削除しますか？')) {
    store.dispatch("cleartmp",);
  }
}

const makeDark = () => {
  // マウスが乗った画像を暗くする処理を記述する
  console.log("hello")
  myImage3.value.style.filter = "brightness(50%)";
};
const makeLight = () => {
  // マウスが離れた画像を元の明るさに戻す処理を記述する
  myImage3.value.style.filter = "brightness(100%)";
};


</script>

<template>
  <div>
    <bottun v-on:click="click_clear" v-on:mouseover="makeDark" v-on:mouseleave="makeLight" ref="myImage3"><svg
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    </bottun>
  </div>
</template>