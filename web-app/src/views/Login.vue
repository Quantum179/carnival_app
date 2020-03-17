<template>
  <div class="app-container">
    <v-card class="panel" v-if="!isRegister">
      <h1>Connexion</h1>
      <v-text-field v-model="form.name" label="Username"></v-text-field>
      <v-text-field v-model="form.password" label="Password" type="password"></v-text-field>
      <v-btn @click="login">Se connecter</v-btn>
      <p>Pas encore inscrit ? Cliquez <span @click="isRegister = true" style="color: red">ici</span></p>
    </v-card>
    <v-card v-else class="panel">
      <h1>Inscription</h1>
      <v-text-field v-model="form.name" label="Username"></v-text-field>
      <v-text-field v-model="form.email" label="Email"></v-text-field>
      <v-text-field v-model="form.password" label="Password" type="password"></v-text-field>
      <v-btn @click="registerUser()">S'inscrire</v-btn>
      <p>Vous possédez un compte ? Cliquez <span @click="isRegister = false" style="color: red">ici</span></p>
    </v-card>
  </div>
</template>
<script>
import $http from '../services/http'

export default {
  name: 'Login',
  props: {
    register: Boolean
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      isRegister: false
    }
  },
  mounted() {
    this.isRegister = !!this.register
  },
  methods: {
    login() {
      $http.post('/auth/login', { name: this.form.name, password: this.form.password })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', res.data.user)
            this.$router.push({ name: 'home' })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    registerUser() {
      $http.post('/auth/register', this.form)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', res.data.user)
            this.$router.push({ name: 'home' })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="stylus">
.app-container
  display flex
  justify-content center
  align-items center
  height 100vh
  margin-top 30px

.panel
  width 90%
  height 90vh
</style>
