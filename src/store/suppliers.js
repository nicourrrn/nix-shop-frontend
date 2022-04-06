import axios from 'axios'

export default {
  namespaced: true,
  state: {
    ingredients: [],
    products: [],
    suppliers: []
  },
  getters: {
    ingredients: (state) => state.ingredients,
    products: (state) => state.products,
    product_types: (state) => [...(new Set(state.products.map(value => value.type)))],
    suppliers: (state) => state.suppliers
  },
  mutations: {
    setIngredients (state, newIngredients) {
      state.ingredients = newIngredients
    },
    setSuppliers (state, newSuppliers) {
      state.suppliers = newSuppliers.map(v => { v.menu = []; return v })
    },
    addProduct (state, product) {
      state.products.push(product)
    }
  },
  actions: {
    async getData (context) {
      const backendUrl = context.rootGetters.backendUrl
      axios.get(`${backendUrl}/ingredients`)
        .then(value => context.commit('setIngredients', value.data))
        .catch(error => {
          const errorText = error.response.data
          const errorCode = error.response.status
          alert(`${errorCode}: ${errorText}`)
        })
      let suppliers
      try {
        suppliers = (await axios.get(`${backendUrl}/suppliers`)).data
      } catch (error) {
        const errorText = error.response.data
        const errorCode = error.response.status
        alert(`${errorCode}: ${errorText}`)
        return
      }
      context.commit('setSuppliers', suppliers)
      for (const s of suppliers) {
        axios.get(`${backendUrl}/products?id=${s.id}`)
          .then(value => {
            value.data.forEach(p => {
              p.supplier = { id: s.id, name: s.name }
              p.count = 1
              context.commit('addProduct', p)
            })
          })
          .catch(error => {
            const errorText = error.response.data
            const errorCode = error.response.status
            alert(`${errorCode}: ${errorText}`)
          })
      }
    }
  }
}
