import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBtlYx88n_gzIV5bJD7ao9A_SxeCA0CVCI',
    libraries: 'places',
    // v: '3.26',
  },
  // autobindAllEvents: false,
  installComponents: true
})


new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
