<template>
  <div class="product-popup__main">
    <div class="product-popup__image-wrapper">
      <img
        :src="require('@/assets/images/Catalog/' + popup_data.image)"
        alt="cloth"
        class="product-popup__image"
      />
      <div class="product-popup__sale" id="sale" v-if="popup_data.sale">
        -{{ popup_data.sale }}%
      </div>
    </div>
    <div class="product-popup__content">
      <h2 class="product-popup__title">
        {{ popup_data.title }}
      </h2>
      <div class="product-popup__price-wrapper">
        <span class="product-popup__price"
          >{{ popup_data.price * popupItemQuantity }} ₽</span
        >
        <span class="product-popup__old-price" v-if="popup_data.sale_oldPrice">
          {{ popup_data.sale_oldPrice * popupItemQuantity }}₽</span
        >
      </div>
      <div class="product-popup__size">
        <div
          class="product-popup__size-item"
          :class="{ 'active-size': this.productSize == 'S' }"
          @click="clickOnSizeButton($event)"
        >
          S
        </div>
        <div
          class="product-popup__size-item"
          :class="{ 'active-size': this.productSize == 'M' }"
          @click="clickOnSizeButton($event)"
        >
          M
        </div>
        <div
          class="product-popup__size-item"
          :class="{ 'active-size': this.productSize == 'L' }"
          @click="clickOnSizeButton($event)"
        >
          L
        </div>
        <div
          class="product-popup__size-item"
          :class="{ 'active-size': this.productSize == 'XL' }"
          @click="clickOnSizeButton($event)"
        >
          XL
        </div>
      </div>
      <section
        class="product-popup__add-to-cart__section"
        v-if="!this.productAlreadyInCart"
      >
        <div class="product-popup__counter">
          <div class="product-popup__counter__wrapper">
            <button
              class="product-popup__counter__button"
              @click="decrementPopupItemQuantity()"
            >
              −
            </button>
            <span class="product-popup__counter__quantity">
              {{ popupItemQuantity }}
            </span>
            <button
              class="product-popup__counter__button"
              @click="incrementPopupItemQuantity()"
            >
              +
            </button>
          </div>
        </div>
        <button class="product-popup__button" @click="addToCart()">
          В корзину
        </button>
      </section>

      <section
        class="product-popup__add-to-cart__section"
        v-if="this.productAlreadyInCart"
      >
        <div @click="destroyPopup">
          <router-link :to="{ name: 'cart' }">
            <div class="product-popup__route-to-cart__button">
              <span class="product-popup__route-to-cart__button__text"
                >Перейти в Корзину
              </span>
              <fa
                icon="check"
                class="product-popup__route-to-cart__button__icon"
              />
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      productSize: 'M',
      popupItemQuantity: 1,
    };
  },
  props: {
    popup_data: {
      type: Object,
      default: () => {},
    },
    popupItemSize: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    ...mapGetters(['CART']),

    productAlreadyInCart: function() {
      return this.CART.find(
        (item) =>
          `${item.product.id}${item.size}` ===
          `${this.popup_data.id}${this.productSize}`
      );
    },
  },
  methods: {
    ...mapActions(['CLOSE_PRODUCT_POPUP']),
    destroyPopup() {
      this.CLOSE_PRODUCT_POPUP();
    },
    incrementPopupItemQuantity() {
      return this.popupItemQuantity++;
    },
    decrementPopupItemQuantity() {
      if (this.popupItemQuantity >= 2) {
        return this.popupItemQuantity--;
      }
    },
    getSizeFromCard() {
      if (this.popupItemSize.length) {
        return (this.productSize = this.popupItemSize);
      }
    },
    clickOnSizeButton(event) {
      this.productSize = event.target.innerHTML.trim();
    },

    addToCart() {
      this.$store.dispatch('ADD_TO_CART', {
        product: this.popup_data,
        quantity: this.popupItemQuantity,
        size: this.productSize,
        uniqueCartItemIndex: String(this.popup_data.id + this.productSize),
      });
    },
  },
  mounted() {
    this.getSizeFromCard();
  },
};
</script>

<style lang="scss"></style>
