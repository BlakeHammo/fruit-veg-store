<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-semibold mb-4 text-white">Products</h2>
    <Products />
  </div>
</template>

<script>
import Products from '../components/Products.vue'; // adjust path if needed

export default {
  name: 'Shop',
  components: {
    Products,
  },
}
</script>
