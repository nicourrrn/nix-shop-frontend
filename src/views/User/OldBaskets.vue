<template>
  <div class="baskets">
    <Basket
    v-for="basket of baskets"
    :key="basket.id"
    :basket="basket"
    >
    </Basket>
  </div>
</template>

<script>
import Basket from '../../components/OldBasketElement'

export default {
  name: 'CompletedBasketsView',
  data () {
    return {
      baskets: []
    }
  },
  mounted () {
    this.$store.dispatch('user/getOldBaskets')
    this.baskets = this.$store.getters['user/oldBaskets']
  },
  components: { Basket }
}
</script>

<style scoped lang="sass">
.baskets
  display: flex
  flex-wrap: wrap
  *
    margin: 10px
</style>
