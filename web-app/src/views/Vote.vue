<template>
  <div class="app-container">
    <v-card class="panel">
      <h1>Concours carnavalesque</h1>
      <div class="toolbar">
        <v-select class="field" v-if="parades.length > 0" :items="parades" v-model="selectedParade"
        item-value="name" item-text="name" label="Parade" outlined return-object
        @input="fetchGroupVotes()"></v-select>
        <v-select class="field" v-if="groups.length > 0" :items="groups" v-model="selectedGroup"
        item-value="name" item-text="name" label="Groupe" outlined return-object
        @input="fetchGroupVotes()"></v-select>
      </div>
      <div class="avg-container" v-if="this.votes.length > 0">
        <p>Harmonie des couleurs : {{avg("colorHarmony")}}</p>
        <p>Costumes: {{avg("costumes")}}</p>
        <p>Ambiance / entrain : {{avg("ambiance")}}</p>
        <p>Mouvements d'ensemble : {{avg("movements")}}</p>
        <p>Originalité du thème : {{avg("originality")}}</p>
      </div>
      <p v-else>Pas de vote trouvé</p>
      <v-form id="vote-form" ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-layout column align-item justify-content>
            <v-text-field v-model="form.colorHarmony" label="Harmonie des couleurs" required></v-text-field>
            <v-text-field v-model="form.costumes" label="Costumes" required></v-text-field>
            <v-text-field v-model="form.ambiance" label="Ambiance / entrain" required></v-text-field>
            <v-text-field v-model="form.movements" label="Mouvements d'ensemble" required></v-text-field>
            <v-text-field v-model="form.originality" label="Originalité du thème" required></v-text-field>
            <v-btn class="vote-btn" :disabled="!valid" color="info" @click="vote" @keyup.native.enter="vote">
              Voter pour ce groupe
            </v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
    <v-snackbar v-if="snackbar === true" v-model="snackbar" :timeout="3000" bottom right>{{ text }}</v-snackbar>
  </div>
</template>
<script>
import qs from 'qs'
import $http from '../services/http'

export default {
  name: 'Vote',
  props: {
    parade: Object,
    group: Object,
    paradesProps: Array,
    groupsProps: Array
  },
  data() {
    return {
      selectedParade: null,
      selectedGroup: null,
      parades: [],
      groups: [],
      votes: [],
      form: {
        colorHarmony: 0,
        costumes: 0,
        ambiance: 0,
        movements: 0,
        originality: 0
      },
      valid: true,
      snackbar: true,
      text: ''
    }
  },
  mounted() {
    if (this.parade !== undefined) {
      this.selectedParade = this.parade
      this.selectedGroup = this.group
      this.parades = this.paradesProps
      this.groups = this.groupsProps
      this.fetchGroupVotes()
    } else {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      this.fetchParades()
      this.fetchGroups()
    },
    fetchParades() {
      const params = {
        populate: [
          { path: 'circuits', select: 'positions uuid' },
        ]
      }
      $http.get(`/parades?${qs.stringify(params)}`)
        .then((res) => {
          if (res.status === 200) {
            this.parades = res.data.parades
            this.fetchCount += 1
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchGroups() {
      $http.get(`/groups?${qs.stringify(this.params)}`)
        .then((res) => {
          if (res.status === 200) {
            this.groups = res.data.groups
            this.fetchCount += 1
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchGroupVotes() {
      if (this.selectedParade === null || this.selectedGroup === null) { return }

      this.snackbar = false
      this.text = ''
      const params = {
        queryParams: {
          parade: this.selectedParade.uuid,
          group: this.selectedGroup.uuid
        },
        populate: [
          { path: 'user', select: 'uuid' },
          { path: 'parade', select: 'uuid' },
          { path: 'group', select: 'uuid' }
        ]
      }
      $http.get(`/votes?${qs.stringify(params)}`)
        .then((res) => {
          if (res.status === 200) {
            this.votes = res.data.votes
          } else if (res.status === 400) {
            if (res.data.msg) {
              this.snackbar = true
              this.text = 'Vous avez déjà voté pour ce groupe'
            }
          } else if (res.status === 404) {
            this.text = 'Pas de vote trouvé'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    avg(key) {
      let sum = 0
      for (let i = 0; i < this.votes.length; i++) {
        sum += this.votes[i][key]
      }

      return sum / this.votes.length
    },
    vote() {
      if (this.selectedParade === null || this.selectedGroup === null) { return }

      const token = localStorage.getItem('token')

      $http.post('/votes', {
        ids: {
          token,
          parade: this.selectedParade.uuid,
          group: this.selectedGroup.uuid
        },
        data: { ...this.form }
      }, { headers: { Authorization: `JWT ${token}` } })
        .then((res) => {
          if (res.status === 201) {
            this.snackbar = true
            this.text = 'Vote bien enregistré'
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.snackbar = true
            this.text = 'Vous avez déjà voté pour ce groupe'
          } else if (err.response.status === 401) {
            this.$router.push({ name: 'login' })
          }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.app-container
  display flex
  justify-content center
  align-items center
  height 100vh
  margin-top 30px

.panel
  width 90%
  height 90vh
  display flex
  flex-direction column
  align-items center

.toolbar
  width 100%
  height 100px
  display flex
  justify-content space-around
  align-items center
  & > .field
    width 40%

#vote-form
  width 50%
</style>
