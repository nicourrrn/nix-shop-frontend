import { createStore } from 'vuex'

import user from './user'
import suppliers from './suppliers'

export default createStore({
  getters: {
    backendUrl: () => 'https://nix-shop-backend.herokuapp.com'
  },
  modules: {
    user,
    suppliers
  }
})
