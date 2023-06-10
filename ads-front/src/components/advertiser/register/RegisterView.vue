<template>
  <v-sheet class="bg-gradient h-screen pa-12 flex justify-center items-center" rounded>
    <v-card class="mx-auto px-6 py-8" width="344">
      <template v-slot:title>
        Advertiser Sing Up
      </template>
      <v-alert
        v-if="Errors"
        type="error"
        :text="Errors"
      ></v-alert>
      <v-form
        v-model="form"
        method="post"
        @submit.prevent="SubmitForm"
      >
        <v-text-field
          v-model="name"
          :readonly="loading"
          class="mb-2"
          clearable
          color="primary"
          label="Name"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :readonly="loading"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          clearable
          label="Password"
          placeholder="Enter your password"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="confirm"
          :readonly="loading"
          clearable
          label="Confirm"
          placeholder="Confirm Password"
          type="password"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Complete Registration
        </v-btn>

        <br>
        
        <div class="flex justify-center">
          <router-link :to="{name: 'advertiser.login'}" tag="button">Login</router-link>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

/* state part */
const router = useRouter()

const store = useStore();

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const loading = computed(() => {
  return store.state.advertiserAuth.loading
})
const form = ref(false)

const Errors = computed(() => {
  return store.getters['advertiserAuth/Errors']
})

/** event listen */

function SubmitForm() {
  if (!form.value) return

  loading.value = true

  if (password.value != confirm.value) {
    store.dispatch('advertiserAuth/setAlert', "Confirm Password and Password do not match");
  } else {
    let advertiser = {
      name: name.value,
      email: email.value,
      password: password.value
    };

    store.dispatch('advertiserAuth/registerAdvertiser', advertiser);
  }
}

/** lifecycle */
onMounted(() => {
  store.commit('advertiserAuth/ClearAlert');
})

watch(loading, async (newLoading, oldLoading) => {
  if(newLoading == false && oldLoading == true) {
    if(localStorage.advertiserToken) {
      router.push('/')
    }
  }
})
</script>

<style>
.bg-gradient {
  background: linear-gradient(to right bottom, #fbdb89, #f48982);
  background-repeat: no-repeat;
  background-size: cover;
}

*::-webkit-scrollbar {
    display: none;
}
</style>
