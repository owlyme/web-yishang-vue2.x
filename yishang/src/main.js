import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'

Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(ElementUI) 

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
