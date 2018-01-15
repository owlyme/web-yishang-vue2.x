import Vue from 'vue'
import "babel-polyfill"
import VueCookies from 'vue-cookies'
import App from './App'
import store from './store'
import router from './router'
import axios from './util/http.js'
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
Vue.prototype.openMessage = (arg) =>{
          let html='';
          if( !arg.bool){
            html = '<span style="color: #C44DDC">'+arg.str+'</span>';
          }else{
            html = '<i style="color: red">'+arg.str+'</i>';
          } 
            arg.ele.$alert( html, {
              dangerouslyUseHTMLString: true,
              showClose: false
            });
        };
Vue.prototype.addUploadUrl= (url, arr)=>{
    let _arr = [];
    arr.forEach( (item, index)=>{
      _arr.push(url+ item)
    })
    return _arr
}
Vue.directive('focus', {
      inserted: function (el) {
          el.focus()
      }
});

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: (createElement) => createElement(App)
})
