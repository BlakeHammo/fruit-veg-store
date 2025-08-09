<template>
  <div class="products bg-white">
    <div v-if="loading" class="loading">Loading products...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <ul v-if="!loading && !error" class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image_url" :alt="product.name" width="100" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Price: ${{ product.price }} per {{ product.unit }}</p>
        <p v-if="!product.in_stock" class="out-of-stock">Out of stock</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export default {
  name: 'Products',
  setup() {
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const res = await axios.get(`${API_BASE}/products`);
        products.value = res.data;
      } catch (e) {
        error.value = 'Failed to load products';
        console.error(e);
      } finally {
        loading.value = false;
      }
    });

    return { products, loading, error };
  },
};
</script>

<style scoped>
.products {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

.product-list {
  list-style: none;
  padding: 0;
}

.product-item {
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.out-of-stock {
  color: red;
  font-weight: bold;
}

.loading, .error {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.2rem;
}
</style>
