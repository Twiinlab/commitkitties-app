import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/scss/app.scss'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueMaterial from 'vue-material'
import { MdButton, MdContent, MdTabs, MdCard } from 'vue-material/dist/components'

import filters from './plugins/filters'


const fb = require('./firebaseConfig.js')

Vue.use(VueMaterial)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdCard)
Vue.use(filters)

Vue.config.productionTip = false

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})

