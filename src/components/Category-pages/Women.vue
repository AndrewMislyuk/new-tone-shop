<template>
  <div class="category-page">
    <div class="container">
      <h2 class="category-page__title">Женщинам</h2>
      <section class="category-page__inner">
        <div
          class="category-page__item"
          v-for="(product, id) in filteredProducts"
          :key="id"
        >
          <Card :product_data="product" class="category-page__card" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'women',
  data() {
    return {
      pageCategory: 'Женщинам',
    };
  },
  components: {
    Card,
  },
  computed: {
    ...mapGetters(['PRODUCTS']),

    filteredProducts() {
      return this.PRODUCTS.filter((f) => f.category === this.pageCategory);
    },
  },
};
</script>
