<template>
  <div class="catalog" v-if="filteredProducts.length">
    <div class="catalog__inner">
      <Select :selected="selected" @select="changeCategory" />
      <h2 class="catalog__title">{{ selected }}</h2>
      <h3 class="catalog__subtitle">Новинки</h3>
      <swiper
        :slides-per-view="5"
        :space-between="20"
        :navigation="{ clickable: true }"
      >
        <swiper-slide v-for="(product, id) in filteredProducts" :key="id">
          <Card :product_data="product" @addToCart="addToCart" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Select from '@/components/Select';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Card,
    Swiper,
    SwiperSlide,
    Select,
  },

  data() {
    return {
      selected: 'Все',
    };
  },

  computed: {
    ...mapGetters(['PRODUCTS']),

    filteredProducts() {
      return this.selected === 'Все'
        ? this.PRODUCTS
        : this.PRODUCTS.filter((f) => f.category === this.selected);
    },
  },

  methods: {
    ...mapActions(['ADD_TO_CART']),

    addToCart(data) {
      this.ADD_TO_CART(data);
    },

    changeCategory(data) {
      this.selected = data.name;
    },
  },
};
</script>

<style lang="scss"></style>
