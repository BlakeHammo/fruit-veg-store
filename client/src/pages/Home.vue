<template>
  <div class="container mx-auto p-20 m-2 bg-white rounded shadow">
    <h1 class="text-3xl font-bold mb-4">Welcome to the Bordertown Fruit Market</h1>
    <p class="mb-4">Click and Collect!</p>
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