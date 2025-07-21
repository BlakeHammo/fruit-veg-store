<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">Welcome to Fresh Market</h1>
    <p class="mb-4">Pick click and collect your favourite fruit and vegetables!</p>
    <router-link to="/shop">
      <button class="btn-primary">Shop Now</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  mounted() {
    axios.get('http://localhost:5000/api/hello')
      .then(res => {
        console.log('API says:', res.data.message);
      });
  }
}
</script>