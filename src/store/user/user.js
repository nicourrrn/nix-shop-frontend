import axios from 'axios'
import basket from './basket'

export default {
  namespaced: true,
  state: {
    name: '',
    phone: '',
    accessToken: ''
  },
  getters: {
    userData: (state) => ({
      name: state.name,
      phone: state.phone,
      accessToken: state.accessToken
    })
  },
  mutations: {
    setUser (state, user) {
      for (const [key, value] of Object.entries(user)) {
        if (!['name', 'phone', 'accessToken'].includes(key)) {
          console.log(`Error key ${key} with value ${value}`)
        } else {
          console.log(key)
          state[key] = value
        }
      }
      localStorage.setItem('userData', JSON.stringify({
        name: state.name,
        phone: state.phone,
        accessToken: state.accessToken
      }))
    }
  },
  actions: {
    loadUser (context) {
      const savedUser = JSON.parse(localStorage.getItem('userData'))
      if (savedUser !== null) {
        context.commit('setUser', savedUser)
      }
    },
    async signIn (context, userForm) {
      const phone = userForm.phone
      const password = userForm.password

      if (phone.length === 0 || password.length === 0) {
        alert('Empty line')
        return
      }
      const backendUrl = context.rootGetters.backendUrl
      let response
      try {
        response = (await axios.post(`${backendUrl}/user/signin`,
          JSON.stringify({
            phone: phone,
            password: password
          }))).data
      } catch (e) {
        alert(e)
        return
      }

      const newUser = {
        name: response.name,
        phone: phone,
        accessToken: response.accessToken
      }
      localStorage.setItem('refreshToken', response.refreshToken)
      context.commit('setUser', newUser)
    },
    async signUp (context, userForm) {
      const name = userForm.name
      const phone = userForm.phone
      const password = userForm.password

      if (name.length === 0 || phone.length === 0 || password.length === 0) {
        alert('Empty line')
        return
      }
      const backendUrl = context.rootGetters.backendUrl
      let response
      try {
        response = (await axios.post(
          `${backendUrl}/user/signup`,
          JSON.stringify({ name: name, phone: phone, password: password })
        )).data
      } catch (e) {
        alert(e)
        return
      }
      const newUser = {
        name: name,
        phone: phone,
        accessToken: response.accessToken
      }
      localStorage.setItem('refreshToken', response.refreshToken)
      context.commit('setUser', newUser)
    },
    async refresh (context) {
      context.dispatch('loadUser')
      const user = context.getters.userData
      const refreshToken = localStorage.getItem('refreshToken')
      if (user.accessToken === '') {
        console.log('access is null')
        return
      }
      const backendUrl = context.rootGetters.backendUrl
      let response
      try {
        response = (await axios.post(`${backendUrl}/user/refresh`, JSON.stringify(
          {
            accessToken: user.accessToken,
            refreshToken: refreshToken
          }
        ))).data
      } catch (e) {
        alert(e)
        return
      }

      const newUser = {
        accessToken: response.accessToken
      }
      localStorage.setItem('refreshToken', response.refreshToken)
      context.commit('setUser', newUser)
    },
    async logOut (context) {
      localStorage.removeItem('userData')
      localStorage.removeItem('refreshToken')
      const token = context.getters.userData.accessToken
      if (token === '') {
        return
      }
      const backendUrl = context.rootGetters.backendUrl
      axios
        .get(`${backendUrl}/user/logout`, { headers: { 'Access-Token': token } })
        .catch(err => alert(err))
      context.commit('clearBasket')
      context.commit('setUser', { address: '', name: '', phone: '', accessToken: '' })
    }
  },
  modules: {
    basket
  }
}
