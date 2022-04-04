import axios from 'axios'

export default {
  state: {
    basket: [],
    address: '',
    oldBaskets: []
  },
  getters: {
    basket: (state) => state.basket,
    address: (state) => state.address,
    oldBaskets: (state) => state.oldBaskets
  },
  mutations: {
    setOldBaskets (state, baskets) {
      state.oldBaskets = baskets
    },
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
      const savedProducts = context.getters.basket
        .map(v => ({
          count: v.count,
          productId: v.product.id
        }))
      const address = context.getters.address
      const backendUrl = context.rootGetters.backendUrl
      const tokenString = localStorage.getItem('Tokens')
      if (tokenString === null) {
        alert('You need login')
        return
      }
      const { access } = JSON.parse(tokenString)
      let response
      try {
        response = (await axios.post(
        `${backendUrl}/basket/new`, {
          address: address,
          products: savedProducts
        }, { headers: { 'Access-Token': access } })).data
      } catch (error) {
        const errorText = error.response.data
        const errorCode = error.response.status
        alert(`${errorCode}: ${errorText}`)
        return
      }
      alert(`Дякуємо за замовлення, ваш номер ${response.basketId}`)
      context.commit('clearBasket')
    },
    async getOldBaskets (context) {
      const tokenString = localStorage.getItem('Tokens')
      if (tokenString === null) {
        alert('You need login')
        return
      }
      const { access } = JSON.parse(tokenString)
      const backendUrl = context.rootGetters.backendUrl
      let response
      try {
        response = (await axios.get(`${backendUrl}/basket/all`,
          { headers: { 'Access-Token': access } })).data
      } catch (error) {
        const errorText = error.response.data
        const errorCode = error.response.status
        alert(`${errorCode}: ${errorText}`)
        return
      }
      context.commit('setOldBaskets', response)
    }
  }
}
