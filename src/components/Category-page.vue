<template>
  <product-popup>
    <product-popup-main :popup_data="currentItem" :popupItemSize="itemSize" />
  </product-popup>
  <div class="category-page">
    <div class="container">
      <h2 class="category-page__title">
        {{ pageGender }}
        <span v-if="pageCategory"> - {{ pageCategory }} </span>
      </h2>
      <section class="category-page__inner">
        <div class="attention" v-if="!filteredProducts.length">
          К сожалению данного типа товара нет на складе:(
        </div>
        <div
          class="category-page__item"
          v-for="(product, id) in filteredProducts"
          :key="id"
        >
          <Card
            :product_data="product"
            class="category-page__card"
            @popup_data="GetPopupData(id)"
            @chosenItemSize="getItemSizeFromCard"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      currentItem: null,
      itemSize: '',
      Error: false,
    };
  },
  components: {
    Card,
  },
  computed: {
    ...mapGetters(['PRODUCTS']),

    pageCategory() {
      return this.$route.params.category;
    },

    pageGender() {
      return this.$route.params.gender;
    },

    filteredProducts() {
      return this.pageCategory
        ? this.PRODUCTS.filter(
            (f) =>
              f.gender === this.pageGender && f.category === this.pageCategory
          )
        : this.PRODUCTS.filter((f) => f.gender === this.pageGender);
    },
  },

  methods: {
    ...mapActions(['ADD_TO_CART']),

    getItemSizeFromCard(currentSize) {
      return (this.itemSize = currentSize);
    },

    GetPopupData(id) {
      const arr = this.filteredProducts.filter((f) => f.id === id);
      this.currentItem = arr[0];
    },
  },

  mounted() {
    this.getItemSizeFromCard();
  },
};
</script>
