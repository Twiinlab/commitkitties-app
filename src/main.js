import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/scss/app.scss'
import 'vue-material/dist/vue-material.min.css'

import VueMaterial from 'vue-material'
Vue.use(VueMaterial)

import { MdButton, MdContent, MdTabs, MdCard } from 'vue-material/dist/components'

const fb = require('./firebaseConfig.js')

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdCard)

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

