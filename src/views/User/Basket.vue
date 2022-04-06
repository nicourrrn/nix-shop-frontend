<template>
  <div v-if="$store.getters['user/userData'].name === ''">
    <h1>Необхідна авторизація!</h1>
  </div>
  <div v-else>
      <span> До сплати: {{ forPaymant.toFixed(2) }} </span>
      <div class="buy-menu">
        <span>Адресс:</span>
        <input type="text" v-model="address"/>
        <input type="button" value="Замовити" @click="buy"/>
      </div>
      <div class="product-list">
        <div class="product" v-for="(product, index) in $store.getters['user/basket']" :key="index">
          <ProductListElement :product="product" :withCount="true"></ProductListElement>
          <input type="number" @change="() => watchCount(product.count)" v-model="product.count" min="1" max="20" />
          <input type="button" value="Видалити" @click="() => $store.commit('user/removeProduct', product.id)">
        </div>
      </div>
  </div>
</template>

<script>
import ProductListElement from '../../components/MenuElement'

export default {
  name: 'BasketView',
  components: {
    ProductListElement
  },
  data () {
    return {
      address: ''
    }
  },
  methods: {
    buy () {
      if (this.address !== '') {
        this.$store.commit('user/setUser', { address: this.address })
        this.$store.dispatch('user/sendBasket')
        this.$router.push('/products')
      }
    },
    watchCount (productCount) {
      productCount = Math.round(productCount)
      if (productCount > 20) {
        productCount = 20
      } else if (productCount < 1) {
        productCount = 1
      }
    }
  },
  computed: {
    forPaymant () {
      const basket = this.$store.getters['user/basket']
      return basket.length === 0 ? 0 : basket.reduce((total, value) => total + (value.count * value.price), 0)
    }
  }
}
</script>

<style scoped lang="sass">

.product-list
  display: flex
  flex-wrap: wrap

.buy-menu
  margin-bottom: 10px
  input
    margin: 0 10px
.product
  display: flex
  flex-direction: column
  margin: 10px
  width: 300px
  input
    width: 50%
    align-self: center
  margin-bottom: 10px
</style>
