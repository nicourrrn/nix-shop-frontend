import axios from 'axios'
import basket from './basket'

export default {
  namespaced: true,
  state: {
    name: '',
    phone: ''
  },
  getters: {
    userData: (state) => ({
      name: state.name,
      phone: state.phone
    })
  },
  mutations: {
    setUser (state, user) {
      for (const [key, value] of Object.entries(user)) {
        if (['name', 'phone'].includes(key)) {
          state[key] = value
        }
      }
    }
  },
  actions: {
    async signIn (context, userForm) {
      const backendUrl = context.rootGetters.backendUrl
      let response
      try {
        response = (await axios.post(`${backendUrl}/user/signin`, {
          phone: userForm.phone,
          password: userForm.password
        })).data
      } catch (error) {
        const errorText = error.response.data
        const errorCode = error.response.status
        alert(`${errorCode}: ${errorText}`)
        return
      }
      context.commit('setUser', {
        name: response.name,
        phone: userForm.phone
      })
      localStorage.setItem('Tokens', JSON.stringify({
        refresh: response.refreshToken,
        access: response.accessToken
      }))
    },
    async signUp (context, userForm) {
      const backendUrl = context.rootGetters.backendUrl
      let response
      try {
        response = (await axios.post(
          `${backendUrl}/user/signup`,
          { name: userForm.name, phone: userForm.phone, password: userForm.password }
        )).data
      } catch (error) {
        const errorText = error.response.data
        const errorCode = error.response.status
        alert(`${errorCode}: ${errorText}`)
        return
      }
      context.commit('setUser', {
        name: response.name,
        phone: userForm.phone
      })
      localStorage.setItem('Tokens', JSON.stringify({
        refresh: response.refreshToken,
        access: response.accessToken
      }))
    },
    async refresh (context) {
      const tokensString = localStorage.getItem('Tokens')
      if (tokensString === undefined) {
        return
      }
      const { access, refresh } = JSON.parse(tokensString)
      if (refresh === undefined || access === undefined) {
        return
      }

      const backendUrl = context.rootGetters.backendUrl
      let response
      try {
        response = (await axios.post(`${backendUrl}/user/refresh`, {
          accessToken: access,
          refreshToken: refresh
        })).data
      } catch (error) {
        const errorText = error.response.data
        const errorCode = error.response.status
        alert(`${errorCode}: ${errorText}`)
        return
      }
      localStorage.setItem('Tokens', JSON.stringify({
        refresh: response.refreshToken,
        access: response.accessToken
      }))
    },
    async logOut (context) {
      const { access, refresh } = JSON.parse(localStorage.getItem('Tokens'))
      if (refresh !== undefined && access !== undefined) {
        const backendUrl = context.rootGetters.backendUrl
        axios
          .get(`${backendUrl}/user/logout`, { headers: { 'Access-Token': access } })
          .catch(error => {
            const errorText = error.response.data
            const errorCode = error.response.status
            alert(`${errorCode}: ${errorText}`)
          })
      }
      context.commit('clearBasket')
      context.commit('setUser', { name: '', phone: '' })
      localStorage.removeItem('userData')
      localStorage.removeItem('Tokens')
    }

  },
  modules: {
    basket
  }
}
