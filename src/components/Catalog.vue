<template>
  <transition name="popup__appear">
    <product-popup>
      <product-popup-main
        :popup_data="currentItem"
        :popupItemSize="itemSize"
      />
    </product-popup>
  </transition>

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
          <Card
            :product_data="product"
            @chosenItemSize="getItemSizeFromCard"
            @popup_data="GetPopupData(id)"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Card from '@/components/Card';
import Select from '@/components/Select';

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
      currentItem: null,
      itemSize: '',
    };
  },

  computed: {
    ...mapGetters(['PRODUCTS']),

    filteredProducts() {
      return this.selected === 'Все'
        ? this.PRODUCTS
        : this.PRODUCTS.filter((f) => f.gender === this.selected);
    },
  },

  beforeMount() {
    this.getItemSizeFromCard();
  },

  methods: {
    ...mapActions(['ADD_TO_CART']),

    getItemSizeFromCard(currentSize) {
      this.itemSize = currentSize;
    },

    changeCategory(category) {
      this.selected = category.name;
    },

    GetPopupData(id) {
      const arr = this.filteredProducts.filter((f) => f.id === id);
      this.currentItem = arr[0];
    },
  },
};
</script>

<style lang="scss"></style>
