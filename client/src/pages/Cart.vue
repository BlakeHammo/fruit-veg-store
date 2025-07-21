<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>
    <p v-if="cart.length === 0">Your cart is empty.</p>
    <div v-else>
      <div class="border-b py-2" v-for="item in cart" :key="item.id">
        <span>{{ item.name }} (x{{ item.qty }})</span>
      </div>
      <router-link to="/checkout">
        <button class="btn-primary mt-4">Proceed to Checkout</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cart: [], // Later: managed by global store
    }
  },
}
</script>
