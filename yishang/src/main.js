// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Resource from "vue-resource"
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import store from './store'

Vue.use(Resource)
Vue.use(Vuex)
Vue.use(VueCookies)
// Vue.use(VueAxios, axios)


// Vue.http.interceptors.push((request, next) => {
//   console.log(request)
// 　　next((response) => {
// 		console.log(response)

//  　　　　return response;
//   });
// });
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)  

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: (createElement) => createElement(App)
})
