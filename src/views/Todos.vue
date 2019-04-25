<template lang="pug">
  .todos-container
    h1 Hey {{ name }}!
    h2 page where users will manage their to do's
    button(@click="logOut") Log Out
</template>

<script>
import JwtDecode from 'vue-jwt-decode'

export default {
  name: 'todos',
  data() {
    return {
      name: ''
    }
  },
  created() {
    let token = this.$cookie.get('jwt')
    let decodedToken = JwtDecode.decode(token)
    this.name = decodedToken.first_name
  },
  methods: {
    logOut() {
      this.$cookie.delete('jwt')
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
