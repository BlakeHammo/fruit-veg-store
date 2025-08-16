<template>
  <div class="container mx-auto p-6">
    <div>
      <ProductCard 
        v-for="p in products" 
        :key="p.id" 
        :product="p" 
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductCard from './ProductCard.vue';

export default {
  name: 'Products',
  components: { ProductCard },
  data() {
    return {
      products: []
    }
  },
  mounted() {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        this.products = res.data;
      })
      .catch(err => console.error(err));
  },
  methods: {
    handleAddToCart({ product, quantity }) {
      console.log(`Cart updated: ${quantity} x ${product.name}`);
      // Later: send to global cart state
    }
  }
}
</script>
