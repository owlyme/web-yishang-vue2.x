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
Vue.directive('focus', {
        // 当绑定元素插入到 DOM 中。        
        inserted: function (el) {
            // 聚焦元素
            el.focus()
        },
        //也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
        //有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
        //update: function (el) {
            //el.focus()
        //}
});

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
