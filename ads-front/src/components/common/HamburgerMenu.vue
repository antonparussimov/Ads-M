<template>
  <div class="hamburger-menu" :class="{ open: isOpen }" @click="toggleMenu">
    <!-- <span></span>
    <span></span>
    <span></span> -->
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" dark v-bind="props" icon="mdi-menu"> </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="goToPage(index)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isOpen = ref(false)

const items = ref([
  { title: 'Dashboard' }, 
  { title: 'Campaigns' }, 
  { title: 'Add Campaign' }, 
])

function toggleMenu() {
  isOpen.value = !isOpen.value
}

const router = useRouter()
function goToPage(index) {
  if (index == 0) {
    router.push('/')
  }else if(index == 1) {
    router.push('/tik/perf/campaign')
  } else {
    router.push('/tik/perf/campaign/add')
  }
}
</script>

<style>
.hamburger-menu {
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
  height: 20px;
  cursor: pointer;
}

/* .hamburger-menu span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #333;
  transition: transform 0.3s ease-in-out;
}

.hamburger-menu.open span:first-child {
  transform: translateY(8px) rotate(45deg);
}

.hamburger-menu.open span:nth-child(2) {
  opacity: 0;
}

.hamburger-menu.open span:last-child {
  transform: translateY(-8px) rotate(-45deg);
} */
</style>
