<script setup>

const API_BASE = 'http://localhost:5000/api';
import Products from './components/Products.vue';

</script>

<template>
  <div class="p-2">
    <nav class="bg-green-500 text-black p-2 fixed top-0 left-0 w-full z-50">
      <router-link to="/" class="mr-4">Home</router-link>
      <router-link to="/shop" class="mr-4">Shop</router-link>
      <router-link to="/cart">Cart</router-link>
    </nav>
    <router-view />
  </div>
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
