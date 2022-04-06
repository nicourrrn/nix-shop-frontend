import { createStore } from 'vuex'

import user from './user/user'
import suppliers from './suppliers'

export default createStore({
  getters: {
    backendUrl: () => 'https://nix-shop-backend.herokuapp.com'
  },
  actions: {
    update (context) {
      context.dispatch('user/refresh')
      context.dispatch('user/getOldBaskets')
      context.dispatch('suppliers/getData')
    }
  },
  modules: {
    user,
    suppliers
  }
})
