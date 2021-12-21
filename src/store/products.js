import axios from 'axios';

export default {
  state: {
    products: [],
    cart: [
      {
        image: 'w1.webp',
        title: 'Твидовый кардиган из хлопка',
        price: '7490',
        sale: '',
        sale_oldPrice: '',
        category: 'Женщинам',
        id: 1,
      },
    ],
  },

  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    CART(state) {
      return state.cart;
    },
  },

  actions: {
    async GET_PRODUCTS_FROM_API({ commit }) {
      try {
        const { data } = await axios('http://localhost:3000/products', {
          method: 'GET',
        });

        commit('SET_PRODUCTS_TO_STATE', data);
        return data;
      } catch (e) {
        console.log(e);
      }
    },

    ADD_TO_CART({ commit }, product) {
      commit('SET_TO_CART', product);
    },
  },

  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    SET_TO_CART: (state, product) => {
      state.cart.push(product);
    },
  },
};