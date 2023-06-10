<script setup>
import ListAdd from './ListAdd.vue'
import ListContainer from './ListContainer.vue'
import SendAll from './SendAll.vue'
import AddGptTextToFinishedText from './AddGptTextToFinishedText.vue'
import ReWrite from "./ReWrite.vue"
import FinishedTextArea from "./FinishedTextArea.vue"
import { useStore } from 'vuex'
import { ref, computed, watch,onMounted } from 'vue'
import ClearAll from './ClearAll.vue'



const store = useStore()
const lists = computed(() => store.state.lists)

// v-if のために設定
const showinformation = ref(false)
const showsuggests = ref(false)
const showrewrite = ref(false)
const showaddgpttext = ref(false)
const showflame = ref(false)

const selected_aim = ref(null)
const selected_addaim = ref(null)
const whois = '0'

onMounted(() => {
  console.log(store.state.lists)
  console.log(store.state.nowtext)


})
watch(store.state, (bef, aft) => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('gpttextlists', JSON.stringify(state.lists))
    localStorage.setItem('usertextlists', JSON.stringify(state.tmp))
    localStorage.setItem('finitextlists', JSON.stringify(state.finished))
    localStorage.setItem('nowtextstrings', JSON.stringify(state.nowtext))
  })})

const click_showinformation = () => {
  if (showinformation.value == true) { showinformation.value = false }
  else { showinformation.value = true };
};

const click_rewrite = () => {
  if (showrewrite.value == true) { showrewrite.value = false }
  else { showrewrite.value = true };
};

const click_suggests = () => {
  if (showsuggests.value == true) { showsuggests.value = false }
  else { showsuggests.value = true };
};

const click_addgpttext = () => {
  if (showaddgpttext.value == true) { showaddgpttext.value = false }
  else { showaddgpttext.value = true };
};

const click_flame = () => {
  if (showflame.value == true) { showflame.value = false }
  else { showflame.value = true };
};


const copyToClipboard = () => {
        navigator.clipboard.writeText(text.value)
        .then(() => {
            console.log("copied!")
        })
        .catch(e => {
            console.error(e)
        })
    }
</script>

<template>
  <div class="flex flex-row mt-10">
    <strong class="absolute h-9 fixed bg-emerald-400 text-white top-0 left-0 right-0">
      　　原稿作成アシスタントAI </strong>

    <div class="relative basis-1/3 h-full scroll-area mx-8 ">
      <a class="flex items-center w-full px-3 mt-3" href="#" v-on:click="click_showinformation">
        <svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <span class="ml-2 text-sm font-bold">基本情報</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 pl-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>

      </a>
      <div class="flex flex-col relative mx-8" v-if="showinformation">
        <div class="basis-1/6 mt-1 mb-1"><list-add role="title" name="製品の種類" /></div>
        <div class="basis-1/6 mt-1 mb-1"><list-add role="character1" name="１つ目の特徴" /></div>
        <div class="basis-1/6 mt-1 mb-1"><list-add role="character2" name="２つ目の特徴" /></div>
        <div class="basis-1/6 mt-1 mb-1"><list-add role="character3" name="３つ目の特徴" /></div>
        <div class="basis-1/6 mt-1 mb-1">
          <ClearAll class="basis 1/2" />
        </div>
      </div>

      <a class="flex items-center w-full px-3 mt-3" href="#" v-on:click="click_flame">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        <span class="ml-2 text-sm font-bold">フレームワークで生成</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 pl-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </a>
      <div v-if="showflame" class="relative mx-8">
        <!-- <div class="text-sm">フレームワークを選択してください。</div> -->
        
        <div class="flex flex-row">
          <!-- <div class="basis-5/6 w-full object-cover rounded-lg border-2 mt-1 mb-1"> -->
            <v-select v-model="selected_aim" class="relative w-1/2 h-3/4" label="フレームワークを選択" :items="['対象のターゲットを明示する文', 'インパクトのある見出し', 'コンパクトな見出し']" variant="underlined">
              <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg></span>
            </v-select>
          <!-- </div> -->
        </div>
        <p>
          <SendAll :aim="selected_aim" />
        </p>
      </div>

      <a class="flex items-center w-full px-3 mt-3" href="#" v-on:click="click_rewrite">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        <span class="ml-2 text-sm font-bold">リライト</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 pl-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </a>

      <p v-if="showrewrite" class="relative mx-8">
        <ReWrite :aim="selected_aim" />
      </p>

      <a class="flex items-center w-full px-3 mt-3" href="#" v-on:click="click_suggests">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        <span class="ml-2 text-sm font-bold">提案一覧</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 pl-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>

      </a>

      <p v-if="showsuggests" class="relatove mx-8">
        <ListContainer v-for="(item, index) in lists" :key="item.id" :title="item.title" :listIndex="index"
          :who="whois" />
      </p>
    </div>


    <div class="relative basis-2/3 scroll-area mx-8">
    <div class="flex">
      <a class="relative w-full mx-auto flex items-center px-3 mt-3" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <span class="ml-2 text-sm font-bold">完成文</span>
    <span class="relative ">
      <v-icon @click="copyToClipboard()" class="hover:bg-gray-400 rounded-lg mr-2">mdi-content-copy</v-icon>
    </span>
      </a>
    </div>
    
      <div class="relative h-3/4 mx-8">
        <FinishedTextArea />
      </div>
      <a class="relative w-full mx-auto flex items-center px-3 mt-3" href="#" v-on:click="click_addgpttext">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        <span class="ml-2 text-sm font-bold text-sm ">ChatGptに続きを書かせる </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 pl-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>

      </a>

      <p class="relative h-1/4" v-if="showaddgpttext">
      <div class="text-sm mx-8">文章の特徴を選択してください。</div>

      <div class="flex flex-row mx-8">
          <v-select v-model="selected_addaim" class="relative w-1/2 h-3/4" label="Select" :items="['天才詩人が書いたようなポエティックな文', '意外性だけを意識した文', '特徴を大きく誇張した文','フレンドリーな文','感情に訴えかける文']" variant="underlined"></v-select>

      </div>
      <div class="relative mx-8">
        <AddGptTextToFinishedText :aim="selected_addaim" />
      </div>
      </p>
    </div>

  </div>
</template>



<style scoped>
.scroll-area {
  height: 100vh;
  overflow: auto;
}

ul {
  width: 150px;
  overflow: auto;
  margin: 0;
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  list-style-type: none;
}

li {
  height: 80px;
  display: flex;
  align-items: center;
  border: 1px solid;
  border-bottom: none;
}

li:last-child {
  border-bottom: 1px solid;
}

.user-data>p {
  margin: 0;
}

footer {
  margin-top: 10px;
}
</style>
