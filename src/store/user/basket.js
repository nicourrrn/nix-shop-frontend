import axios from 'axios'

export default {
  state: {
    basket: [],
    address: ''
  },
  getters: {
    basket: (state) => state.basket,
    address: (state) => state.address
  },
  mutations: {
    clearBasket (state) {
      state.address = ''
      state.basket = []
    },
    addProduct (state, product) {
      // TODO пересмотреть компоновку product
      const productsIds = state.basket.map(value => value.product.id)
      if (!productsIds.includes(product.product.id)) {
        state.basket.push(product)
      }
    },
    removeProduct (state, productId) {
      state.basket = state.basket.filter(value => value.product.id !== productId)
    },
    setAddress (state, address) {
      state.address = address
    }
  },
  actions: {
    async sendBasket (context) {
      let savedProducts = context.getters.basket

      savedProducts = savedProducts.map(v => ({
        count: v.count,
        productId: v.product.id,
        priceOne: v.product.price
      }))

      const user = context.rootGetters.userData
      const backendUrl = context.rootGetters.backendUrl
      let response
      try {
        response = (await axios.post(
        `${backendUrl}/basket/new`,
        JSON.stringify({
          address: user.address,
          products: savedProducts
        }),
        { headers: { 'Access-Token': user.accessToken } }
        )).data
      } catch (e) {
        alert(e)
        return
      }

      alert(`Дякуємо за замовлення, ваш номер ${response.basketId}`)
      context.commit('clearBasket')
    }
  }
}
