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
		    }



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
