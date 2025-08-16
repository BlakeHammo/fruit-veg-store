<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden mb-4 flex">
    <!-- Product Image -->
    <img 
      :src="`http://localhost:5173${product.image_url}`"
      :alt="product.name" 
      class="w-32 h-32 object-cover"
    />

    <!-- Product Details -->
    <div class="flex-1 p-4 flex flex-col justify-between">
      <div>
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
        <p class="text-green-700 font-bold">${{ product.price }}</p>
      </div>

      <!-- Add to Cart -->
      <div class="flex items-center mt-2">
        <input 
          type="number" 
          min="1" 
          v-model.number="quantity" 
          class="border rounded p-1 w-16 mr-2 text-center"
        />
        <button 
          @click="addToCart" 
          class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    addToCart() {
      console.log(`Added ${this.quantity} of ${this.product.name} to cart`);
      // Later: Emit event to parent to update the cart
      this.$emit('add-to-cart', { product: this.product, quantity: this.quantity });
    }
  }
}
</script>
