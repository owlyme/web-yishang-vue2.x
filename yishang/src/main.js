import Vue from 'vue'
import "babel-polyfill"
import VueCookies from 'vue-cookies'
import App from './App'
import store from './store'
import router from './router'
// import axios from './util/http.js'
// import VueAxios from 'vue-axios'
import Utils from './util'
console.log( "main js" )
console.log( Utils )

import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'

Vue.use(VueCookies)
// Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(ElementUI)
Vue.use(Utils)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'
require('./assets/css/myindex.css')

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: (createElement) => createElement(App)
})
