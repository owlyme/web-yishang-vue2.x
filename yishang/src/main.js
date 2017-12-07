// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { Upload,  DatePicker,Collapse, CollapseItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Upload)  
Vue.use( DatePicker )
Vue.use( Collapse )
Vue.use( CollapseItem )

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  render: (createElement) => createElement(App)
})
