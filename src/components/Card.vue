<template>
  <div class="card">
    <div class="card__inner">
      <div class="card__content-wrapper">
        <div class="card__content-link">
          <img
            :src="require('@/assets/images/Catalog/' + product_data.image)"
            alt="cloth"
            class="card__content-image"
          />
          <div
            class="card__content-sale"
            id="cardSale"
            v-if="product_data.sale"
          >
            -{{ product_data.sale }}%
          </div>
        </div>
        <div class="card__content-buttons">
          <button
            class="card__content-buttons-link"
            @click="clickToShowPopup()"
          >
            <span class="card__content-buttons-item"><fa icon="eye"/></span>
          </button>
        </div>
        <div class="card__content-footer">
          <div class="card__content-footer-item" @click="chosenSize($event)">
            S
          </div>
          <div class="card__content-footer-item" @click="chosenSize($event)">
            M
          </div>
          <div class="card__content-footer-item" @click="chosenSize($event)">
            L
          </div>
          <div class="card__content-footer-item" @click="chosenSize($event)">
            XL
          </div>
        </div>
      </div>
    </div>
    <div class="card__footer">
      <router-link
        :to="{ name: 'productPage', params: { id: product_data.id} }"
      >
        <span class="card__footer-title">
          {{ product_data.title }}
        </span>
      </router-link>
      <div class="card__footer-price">
        {{ product_data.price }} грн
        <span
          class="card__footer-price__sale"
          v-if="product_data.sale_oldPrice"
        >
          {{ product_data.sale_oldPrice }} грн
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Card',

  props: {
    product_data: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      itemInCart: false,
      chosenItemSize: '',
    };
  },

  methods: {
    ...mapActions(['SHOW_PRODUCT_POPUP']),
    chosenSize(event) {
      this.chosenItemSize = event.target.innerHTML;

      this.$emit('chosenItemSize', this.chosenItemSize);
      this.clickToShowPopup();
    },
    clickToShowPopup() {
      this.SHOW_PRODUCT_POPUP();
      this.$emit('popup_data');
      return;
    },
  },
  computed: {
    ...mapGetters(['GET_POPUP']),
  },
};
</script>

<style lang="scss"></style>
