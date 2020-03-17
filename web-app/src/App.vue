<template>
  <v-app id="app">
    <v-app-bar app class="nav" dark>
      <v-toolbar-title @click="$router.push({name: 'home'})">CarnivalApp</v-toolbar-title>
      <v-btn text @click="$router.push({name: 'vote'})">Votes</v-btn>
      <v-spacer></v-spacer>
      <v-btn text v-if="isLogged" @click="$router.push({name: 'login'})">LOGIN</v-btn>
      <v-btn text v-else @click="logout()">LOGOUT</v-btn>
    </v-app-bar>
    <router-view/>
  </v-app>
</template>
<script>
export default {
  computed: {
    isLogged() {
      return !localStorage.getItem('user')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 10px

.nav
  height 70px !important
</style>
