<script setup>
import { ref, computed, onMounted,watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const title = ref("");
const tmp = computed(() => store.state.tmp)

const props = defineProps({
  role: {
    type: String,
    required: true,
  },
  name:{
    type:String,
    required: true,
  }
});

const name = props.name

onMounted(() => {
  title.value = tmp[props.role];
})

// title　が変更された際、lists.props.roleの値を変更する
watch(title, (beforetext, aftertext) => {
  store.dispatch("addtmp", { key: props.role ,title: title.value });
} )

watch(tmp, (beforenowtext, afternowtext) => {
  title.value = tmp[props.role]
} )



</script>

<template>
  <div class = "rounded-lg" >
    <textarea
      class="peer px-2 h-full w-full mx-3 resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      ref="area" v-model="title" :placeholder = "name"
      
    ></textarea>
  </div>
</template>