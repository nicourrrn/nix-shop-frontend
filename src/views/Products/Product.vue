<template>
<div class="product">
  <h1 v-if="product.name === ''">
    Product not found
  </h1>
  <div v-else class="product">
    <div class="main-info">
      <h2 class="name">{{product.name}}</h2>
      <span class="supplier" @click="() => $router.push('/suppliers/'+product.supplier.id)">Постачальник: {{product.supplier.name}}</span>
      <img :src="product.image" class="img" alt="Image not loaded"/>
    </div>
    <div class="sub-info">
      <span class="ingredients">Ingredients: {{ product.ingredients.join(", ") }}</span>
      <div class="info">
        <span class="type">Type: {{product.type}}</span>
        <span class="price">Price: {{ (product.price * product.count).toFixed(2) }}</span>
      </div>
      <div class="add">
        <input type="button" :disabled="inBasket" :value=" inBasket ? 'exist' : 'Додати до кошика'" @click="addToBasket" />
        <input type="number" v-model="product.count" min="1" max="20">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductView',
  data () {
    return {
      inBasket: false,
      product: {
        count: 0,
        supplier: {
          id: 0,
          name: ''
        },
        ingredients: [],
        name: '',
        price: 0,
        type: ''
      }
    }
  },
  methods: {
    addToBasket () {
      this.$store.commit('user/addProduct', this.product)
      this.$router.push('/user/basket')
    }
  },
  mounted () {
    for (const value of this.$store.getters['suppliers/products']) {
      if (value.id === Number(this.$route.params.id)) {
        console.log(value)
        this.product = value
        break
      }
    }
    if (this.product.name === '') {
      return
    }
    if (this.product.count === undefined) {
      this.product.count = 1
    }

    this.inBasket = this.$store.getters['user/basket'].map(value => value.id).includes(this.product.id)
  },
  watch: {
    'product.count' (newValue) {
      newValue = Math.round(newValue)
      if (newValue > 20) {
        this.product.count = 20
      } else if (newValue < 1) {
        this.product.count = 1
      }
    }
  }

}
</script>

<style scoped lang="sass">
.product
  display: flex
.main-info
  display: flex
  flex-direction: column
  h2
    margin-bottom: 1px
img
  max-width: 100%
  max-height: 100%
.supplier
  color: royalblue
  cursor: pointer
  &:hover
    color: blueviolet
.sub-info
  margin: 70px 10px
  display: flex
  flex-direction: column
.info
  display: flex
  justify-content: space-around
.add
  display: flex
  flex-direction: column
</style>
