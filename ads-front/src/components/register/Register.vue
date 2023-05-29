<template>
  <div>
    <Navbar></Navbar>
    <h1 class="p">Register</h1>
    <div class="alert alert-danger" v-if="Errors">
      <i class="fas fa-exclamation-circle" style="font-size:24px"></i>
      <p>{{Errors}}</p>
    </div>
    <div>
      <form method="post" @submit.prevent="SubmitForm" class="form">
        <input type="text" placeholder="Name" v-model="name" />
        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <input type="password" placeholder="Confirm Password" v-model="confirm" />
        <button class="btn btn-success">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

/* state part */
const store = useStore();

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')

const Errors = computed(() => {
  return store.getters('Errors')
})

/** event listen */

function SubmitForm(e) {
  e.preventDefault();
  if (password.value != confirm.value) {
    store.dispatch('setAlert', "Confirm Password and Password do not match");
  } else {
    let user = {
      name: name.value,
      email: email.value,
      password: password.value
    };
    store.dispatch('registerUser', user);
  }
}

/** lifecycle */
onMounted(() => {
  store.commit('ClearAlert');
})
</script>

<style></style>
