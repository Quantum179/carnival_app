<template>
  <div class="home" v-if="fetchCount === 2">
    <div class="toolbar">
      <v-select class="field" v-if="parades.length > 0" :items="parades" v-model="selectedParade"
      item-value="name" item-text="name" label="Parade" outlined return-object
      @input="updateCenter(0)"></v-select>
      <v-select class="field" v-if="groups.length > 0" :items="groups" v-model="selectedGroup"
      item-value="name" item-text="name" label="Groupe" outlined return-object
      @input="updateCenter(1)"></v-select>
    </div>
    <p><span @click="updateCenter(3)" style="color:blue;cursor:pointer">Position actuelle</span>{{nearGroupText}}</p>
    <GmapMap :center="center" :zoom="17" map-type-id="roadmap" style="width: 90%; height: 75vh">
      <GmapMarker v-for="(group, index) in groups" :key="index" :position="group.position" :clickable="true" @click="selectedGroup = group"/>
      <GmapMarker :position="currentPosition"/>
      <div v-for="(parade, indexP) in parades" :key="'par-' +indexP">
        <GmapPolyline v-for="(circuit, indexC) in parade.circuits" :key="'chi' + indexC" :path="circuit.positions"/>
      </div>
      <GmapCircle v-if="currentPosition !== null" :center="currentPosition" :radius="150"/>
    </GmapMap>
    <v-snackbar v-if="updatedGroup !== null" v-model="snackbar" :timeout="5000" bottom right>{{ text }}</v-snackbar>
    <v-card class="infos" v-if="selectedGroup !== null">
      <p>{{selectedGroup.name}}</p>
      <p>{{selectedGroup.typeGroup.name}}</p>
      <v-btn large :disabled="!arePointsNear(selectedGroup.position, currentPosition, 10)" @click="goToVote()">Voter</v-btn>
      <p v-if="errorText" style="color:red">{{errorText}}</p>
    </v-card>
    <v-dialog v-model="isLogged" max-width="600">
      <v-card>
        <v-card-title class="headline">Connexion</v-card-title>
        <v-card-text>
          Il est nécessaire de s'inscrire pour utiliser cette application
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$router.push({ name: 'login' })">Se connecter</v-btn>
          <v-btn text @click="$router.push({ name: 'login', params: { register: true }})">S'inscrire</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// AIzaSyBtlYx88n_gzIV5bJD7ao9A_SxeCA0CVCI
import qs from 'qs'
import io from 'socket.io-client'
import $http from '../services/http'

export default {
  name: 'Home',
  data() {
    return {
      params: {},
      center: { lat: 15.993001, lng: -61.729295 },
      parades: [],
      selectedParade: null,
      groups: [],
      selectedGroup: null,
      currentPosition: null,
      updatedGroup: null,
      snackbar: false,
      fetchCount: 0,
      nearGroupText: '',
      errorText: '',
    }
  },
  computed: {
    text() {
      return `La position du groupe ${this.updatedGroup.name} a été mise à jour.`
    },
    isLogged() {
      return !localStorage.getItem('user')
    }
  },
  mounted() {
    this.fetchParades()
    this.fetchGroups()
    this.setUserPosition()
    this.initSocket()

    setInterval(() => {
      this.setUserPosition()
    }, 10000)
  },
  methods: {
    setUserPosition() {
      const that = this
      navigator.geolocation.getCurrentPosition((position) => {
        that.currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
        that.checkGroups()
      })
    },
    initSocket() {
      const that = this
      const socket = io.connect('http://localhost:5000')
      socket.on('groupPositionUpdated', (data) => {
        const group = this.groups.filter((g) => g.uuid === data.id)[0]

        if (!group) { return }

        group.position = data.position
        that.updatedGroup = group
        this.snackbar = true
      })
    },
    updateCenter(type) {
      switch (type) {
        case 0:
          this.center = this.selectedParade.position
          break
        case 1:
          this.center = this.selectedGroup.position
          break
        case 2:
          this.center = this.updatedGroup
          break
        case 3:
          this.center = this.currentPosition
          break
        default:
          break
      }
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
      const params = {
        populate: [
          { path: 'typeGroup', select: 'name' },
        ]
      }
      $http.get(`/groups?${qs.stringify(params)}`)
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
    goToVote() {
      if (this.selectedParade === null || this.selectedGroup === null) {
        this.errorText = 'Choisissez une parade'
        return
      }
      // todo : error message

      const params = {
        parade: this.selectedParade,
        group: this.selectedGroup,
        paradesProps: this.parades,
        groupsProps: this.groups
      }

      this.$router.push({ name: 'vote', params })
    },
    checkGroups() {
      let count = 0

      for (let i = 0; i < this.groups.length; i++) {
        if (this.arePointsNear(this.groups[i].position, this.currentPosition, 0.150)) {
          count += 1
        }
      }

      if (count) {
        this.nearGroupText = ` - Il y a ${count} groupe${count > 1 ? 's' : ''} à proximité. Cliquez dessus pour voter.`
      } else {
        this.nearGroupText = ''
      }
    },
    arePointsNear(checkPoint, centerPoint, km) {
      // https://stackoverflow.com/questions/24680247/check-if-a-latitude-and-longitude-is-within-a-circle-google-maps
      const ky = 40000 / 360;
      const kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
      const dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
      const dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
      return Math.sqrt(dx * dx + dy * dy) <= km;
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  display flex
  flex-direction column
  align-items center
  margin-top 75px

.toolbar
  width 95%
  height 100px
  display flex
  justify-content space-around
  align-items center

.field
  width 40%
  height 70px

.popup
  width 100%
  height 100%
  & > div
    width 80%
    height 80%

.user-icon
  position fixed
  left 10%
  bottom 10%

.infos
  position fixed
  top 20%
  left 20%
  width 200px
  height 300px
</style>
