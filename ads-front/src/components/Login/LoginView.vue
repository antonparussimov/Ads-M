<template>
  <div>
    <Navbar></Navbar>
    <h1 class="p">Login</h1>
    <div class="alert alert-danger" v-if="Errors">
      <i class="fas fa-exclamation-circle" style="font-size:24px"></i>
      <p>{{Errors}}</p>
    </div>
    <div>
      <form method="post" @submit.prevent="SubmitForm" class="form">
        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <button class="btn btn-dark">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

/* state part */
const store = useStore();

const email = ref('')
const password = ref('')

const Errors = computed(() => {
  return store.getters('Errors')
})

/** event listen */

function SubmitForm(e) {
  e.preventDefault();
  let user = {
    email: email.value,
    password: password.value
  };
  store.dispatch('LoginUser', user);
}

/** lifecycle */
onMounted(() => {
  store.commit('ClearAlert');
})
</script>

<style></style>
