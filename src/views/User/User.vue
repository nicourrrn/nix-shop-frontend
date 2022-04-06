<template>
  <div v-if="userData.name === ''">
    {{ $router.push('/user/auth') }}
  </div>
  <input type="button" value="logout" @click="() => $store.dispatch('user/logOut')">
  <span>Name {{ userData.name }}</span>
  <span>Phone {{userData.phone}}</span>
  <span>Create at {{userData.create_at}} </span>
  <input type="button" value="remove account">
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserView',
  computed: {
    ...mapGetters({ userData: 'user/userData' })
  }

}
</script>

<style scoped>

</style>
