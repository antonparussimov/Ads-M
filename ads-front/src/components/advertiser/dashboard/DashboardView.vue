<template>
  <div>
  <HamburgerMenu />
  <TokenComponent />
  <AllowUserComponent />
</div>
</template>

<script setup>
import TokenComponent from './TokenComponent.vue';
import AllowUserComponent from './AllowUserComponent.vue';
import HamburgerMenu from '../common/HamburgerMenu.vue';
</script>