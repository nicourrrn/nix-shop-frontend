<template>
    <nav>
      <div class="center">
        <router-link to="/products">Menu</router-link> |
        <router-link to="/suppliers">Suppliers</router-link>
      </div>
      <div class="right-side">
        <router-link to="/user/basket">Basket</router-link> |
        <router-link to="/user/basket/old">Old baskets</router-link> |
        <router-link to="/user/auth">{{ LoginText }}</router-link> |
      </div>
    </nav>
    <router-view />
</template>

<script>

export default {
  computed: {
    LoginText () {
      const user = this.$store.getters['user/userData']
      return user.name.length > 0 ? `Привіт, ${user.name}` : 'Login'
    }
  },
  mounted () {
    setInterval(() => this.$store.dispatch('user/refresh'), 50000)
    setInterval(() => this.$store.dispatch('suppliers/getData'), 10000)
  }
}

</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

nav
  display: flex
  justify-content: flex-end
  padding: 30px
  a
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983

  .right-side
    margin-left: 10%

</style>
