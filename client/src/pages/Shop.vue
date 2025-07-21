<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-semibold mb-4">Shop</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Placeholder product cards -->
      <div class="border p-4" v-for="n in 4" :key="n">
        <div class="bg-gray-100 h-32 mb-2"></div>
        <h3 class="font-medium">Product {{ n }}</h3>
        <p>$0.00</p>
        <button class="btn-add mt-2">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  mounted() {
    // Later: fetch products from API
  },
}
</script>
