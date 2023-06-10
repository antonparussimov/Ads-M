<template>
  <v-sheet class="bg-gradient h-screen pa-12 flex justify-center items-center" rounded>
    <v-card class="mx-auto px-6 py-8" width="344">
      <template v-slot:title>
        Advertiser Login
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
          Sign In
        </v-btn>

        <br>

        <div class="flex justify-between">
          <router-link :to="{name: 'advertiser.register'}" tag="button">Sign Up</router-link>
          <router-link :to="{name: 'login'}" tag="button">Go to User</router-link>
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

const email = ref('')
const password = ref('')
const form = ref(false)

const Errors = computed(() => {
  return store.getters['advertiserAuth/AdvertiserErrors']
})

const loading = computed(() => {
  return store.state.advertiserAuth.loading
})

/** event listen */

function SubmitForm() {
  if (!form.value) return

  loading.value = true

  let advertiser = {
    email: email.value,
    password: password.value
  };
  store.dispatch('advertiserAuth/LoginAdvertiser', advertiser);
}

/** lifecycle */
onMounted(() => {
  store.commit('advertiserAuth/ClearAlert');
})

watch(loading, async (newLoading, oldLoading) => {
  if(newLoading == false && oldLoading == true) {
    if(localStorage.advertiserToken) {
      router.push('/advertiser/dashboard')
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
