<template>
  <div v-if="ProductList.length === 0">
    <h1>Loading</h1>
  </div>
  <div v-else class="menu">
    <div class="menu-setting">
      <div class="ingredients-setting">
        <input
          v-model="ingredients.input"
          placeholder="Название ингредиента"
          type="text"
          class="ingredient-input"
        />
        <div class="ingredients-to-select">
          <div
            v-for="(ingredient, index) in IngredientToSelect.slice(0, 10)"
            :key="index"
            class="ingredient-to-select"
            @click="ingredients.selected.push(ingredient)"
          >
            {{ ingredient }}
          </div>
        </div>
        <h4>Обрані фільтри</h4>
        <div class="selected-ingredients">
          <div
            v-for="(ingredient, index) in this.ingredients.selected"
            :key="index"
            class="selected-ingredient"
            @click="ingredients.selected.pop(index)"
          >
            {{ ingredient }}
          </div>
        </div>
      </div>
      <div class="type-setting">
        <input
          v-model="type.input"
          placeholder="type of product"
          type="text"
          class="type-input"
        />
        <div class="type-to-select">
          <div
            v-for="(type, index) in TypesToSelect.slice(0, 5)"
            :key="index"
            class="type"
            @click="() => this.type.selected = type"
          >
            {{ type }}
          </div>
        </div>
        <h4>Обрані фільтри</h4>
        <div class="selected-type">
          <div
            class="type"
            @click="() => type.selected = ''"
          >
            {{ type.selected }}
          </div>
        </div>
      </div>
    </div>
    <div class="menu-list">
      <ProductListElement
        v-for="(product, index) in ProductList"
        :product = product
        :key="index"
      ></ProductListElement>
    </div>
  </div>
</template>

<script>
import ProductListElement from '../../components/MenuElement'

export default {
  name: 'MenuView',
  data () {
    return {
      ingredients: {
        input: '',
        selected: []
      },
      type: {
        input: '',
        selected: ''
      }
    }
  },
  computed: {
    IngredientToSelect () {
      return this.$store.getters['suppliers/ingredients'].filter(
        (value) =>
          !this.ingredients.selected.includes(value) &&
          value.startsWith(this.ingredients.input)
      )
    },
    TypesToSelect () {
      return this.$store.getters['suppliers/product_types'].filter(
        (value) =>
          (!(this.type.selected === value) || this.type.selected === '') &&
          value.startsWith(this.type.input)
      )
    },
    ProductList () {
      return this.$store.getters['suppliers/products'].filter(
        product => this.ingredients.selected.every(ingredient => product.ingredients.includes(ingredient)) &&
          (this.type.selected === '' || product.type === this.type.selected)
      )
    }
  },
  components: {
    ProductListElement
  }
}
</script>

<style lang="sass" scoped>
.menu
  display: grid
  grid-template-columns: 30% 68%

.menu-setting
  display: flex
  margin: 2vh 2vw
  .ingredient-input
    width: 100%

.ingredients-preview
  .ingredient
    margin: 1vw 0
    &:hover
      color: dodgerblue
      cursor: cell
.checked-ingredients
  .ingredient
    margin: 1vw 0
    &:hover
      color: red
      cursor: alias

.menu-list
  display: grid
  grid-template-columns: 1fr 1fr
  column-gap: 5px
  row-gap: 5px
</style>
