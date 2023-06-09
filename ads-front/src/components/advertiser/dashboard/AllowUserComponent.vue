<template>
  <v-list >
      <v-list-subheader>Allow Users</v-list-subheader>

      <v-list-item v-for="user in users" :key="user.id" :value="user.id">
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn v-model="selected" :value="user.id"></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>{{ user.email }}</v-list-item-title>

        <template v-slot:append start>
          {{ user.name }}
        </template>
      </v-list-item>
    </v-list>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const users = computed(() => {
  return store.state.advertiserAuth.users
})

const allowUsers = ref([])

watch(allowUsers, (newValue, oldValue) => {
  console.log(allowUsers.value);
})

const selected = computed({
  get: () => store.state.advertiserAuth.allowUsers,
  set: (value) => store.dispatch("advertiserAuth/setAllowUsers", value)
})

onMounted(() => {
  store.dispatch("advertiserAuth/getUsers")
  store.dispatch("advertiserAuth/getAllowUsers")
})
</script>