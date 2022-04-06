<template>

  <div v-if="userData.name !== ''">
    {{ $router.push('/user') }}
  </div>

  <div class="login">
    <div v-if="!newUser" class="login-form">
      <p>Phone</p>
      <div class="phone">
        <span>+380</span><input type="text" v-model="phone"/>
      </div>
      <p>Password</p>
      <input type="password" v-model="password">
      <input type="button" @click="this.SignIn" value="SignIn" :disabled="phone.length === 0 || password.length === 0">
    </div>
    <div v-else class="login-form">
      <p>Name</p>
      <input type="text" v-model="name">
      <p>Phone</p>
      <span>+380</span><input type="text" v-model="phone"/>
      <p>Password</p>
      <input type="password" v-model="password">
      <p>Password again</p>
      <input type="password" v-model="copyPassword">
      <input type="button" @click="this.SignUp" value="SignUp" :disabled="status !== ''">
    </div>
    <p class="status">{{ status }}</p>
    <input type="button" :value="newUser ? 'SingIn' : 'SingUp'" @click="() => newUser = !newUser"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LoginView',
  data () {
    return {
      name: '',
      phone: '',
      password: '',
      copyPassword: '',
      newUser: false
    }
  },
  methods: {
    SignIn () {
      this.$store.dispatch('user/signIn', { phone: '+380' + this.phone, password: this.password })
    },
    SignUp () {
      this.$store.dispatch('user/signUp', { name: this.name, phone: '+380' + this.phone, password: this.password })
    }
  },
  computed: {
    ...mapGetters({ userData: 'user/userData' }),
    status () {
      if (this.name === '' && this.newUser) {
        return 'Введите имя'
      } else if (this.phone === '') {
        return 'Введите Номер телефона формата'
      } else if (this.phone.length !== 9 || isNaN(this.phone)) {
        return 'Неверный формат'
      } else if (this.password === '') {
        return 'Введите пароль'
      } else if (this.password !== this.copyPassword && this.newUser) {
        return 'Пароли не равны'
      }
      return ''
    },
    authed () {
      return this.$store.getters['user/userData'].name !== ''
    }
  },
  mounted () {
    const user = this.$store.getters['user/userData']
    console.log(user)
    this.name = user.name
    this.phone = user.phone
  }
}
</script>

<style scoped lang="sass">
.login
  display: flex
  flex-direction: column
  align-content: center
  margin: 0 30%
  p
    margin: 0
  input
    margin-bottom: 10px
.login-form
  display: flex
  flex-direction: column
  align-content: center
.phone
  display: flex
  *
    margin-right: 10px
</style>
