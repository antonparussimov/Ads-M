<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { DotLoader } from "vue3-spinner";
import { VBtn } from 'vuetify/components/VBtn';

const store = useStore()
const myImage2 = ref(null);
const show = computed(() => store.state.showloading3);

const tmp = computed(() => store.state.tmp);
const isdisplay = ref(null)
const OriginText = ref("")
isdisplay.value = true


const props = defineProps({
  aim: {
    type: String,
    required: true,
  },
});
const isEditing = ref(false);

const titleExists = computed(() => {
  return OriginText.value.length > 0
});

const styles_button = computed(() => {
  return {
    border: "2px",
    "border-radius": "0.60em",
  };
});


const startEditing = () => {
  isEditing.value = true;
};
const finishEditing = () => {
  isEditing.value = false;
};


// const makeDark = () => {
//   // マウスが乗った画像を暗くする処理を記述する
//   myImage2.value.style.filter = "brightness(50%)";
// };
// const makeLight = () => {
//   // マウスが離れた画像を元の明るさに戻す処理を記述する
//   myImage2.value.style.filter = "brightness(100%)";
// };

const click_send = async () => {
  if (show.value == true) { return };
  await store.dispatch("addlistrewrite", { aim: props.aim, origintext: OriginText.value });

};

</script>

<template>
  <div class="rounded-lg mx-auto">
    <p>
      <input ref="area" class="w-full text-left" v-model="OriginText" placeholder="リライトする文章を入力してください"
        v-on:focusin="startEditing" v-on:focusout="finishEditing" />
    </p>
    <v-btn ref="myImage2" type="submit" v-on:click="click_send">リライト</v-btn>


    <div class="flex flex-row">
      <div class="basis-5/6">
        <p v-if="show" class="flex justify-center text-gray-400">ChatGptの答えを待っています。</p>
        <p>
          <DotLoader :loading="show" size="30px" class="flex justify-center" />
        </p>
      </div>
    </div>

  </div>
</template>