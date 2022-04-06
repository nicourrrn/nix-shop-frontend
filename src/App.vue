<template>
    <nav>
      <div class="center">
        <router-link to="/products">Menu</router-link> |
        <router-link to="/suppliers">Suppliers</router-link>
      </div>
      <div class="right-side">
        <router-link to="/user/basket">Basket</router-link> |
        <router-link to="/user/basket/old">Old baskets</router-link> |
        <router-link v-if="!isLoggined" to="/user/auth" > Login </router-link>
        <router-link v-if="isLoggined" to="/user"> Hello, {{ $store.getters['user/userData'].name }} </router-link>
        |
      </div>
    </nav>
    <router-view />
</template>

<script>

export default {
  computed: {
    isLoggined () {
      const user = this.$store.getters['user/userData']
      return user.name.length !== 0
    }
  },
  beforeCreate () {
    this.$store.dispatch('user/getName')
    this.$store.dispatch('update')
    setInterval(() => this.$store.dispatch('update'), 30000)
  }
}

</script>

<style lang="sass">
//img
//  background-image: url('https://i1.wp.com/techdirectarchive.com/wp-content/uploads/2020/06/1_pUEZd8z__1p-7ICIO1NZFA.png?fit=978%2C542&ssl=1')
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
