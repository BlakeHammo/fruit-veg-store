<template>
  <div id="product_card" class="bg-white shadow-md rounded-lg mb-4 flex items-center justify-between w-full h-32">
    <!-- Product Image -->
    <div class="flex items-center h-32 w-32">
      <img 
        :src="`http://localhost:5173${product.image_url}`"
        :alt="product.name" 
        class="w-32 h-auto p-2"
      />
    </div>
    <!-- Product Details -->
    
      <div>
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p class="text-gray-600 text-sm">{{ product.description }}</p>
        <p class="text-green-700 font-bold">${{ product.price }} {{ product.unit }}</p>
      </div>

      <!-- Add to Cart -->
      <div class="flex items-center flex-col p-2">
        <input 
          type="number" 
          min="1" 
          v-model.number="quantity" 
          class="border rounded px-3 w-14 text-center mb-2"
        />
        <button 
          @click="addToCart" 
          class="bg-green-600 text-white rounded hover:bg-green-700 w-14"
        >
          Add
        </button>
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
