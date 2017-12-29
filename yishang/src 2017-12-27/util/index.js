import Api from './api.js'
import Http from './http.js'

export default{
	install(Vue, options){
		Vue.prototype.setCookie = function (userInfo) {
	      let cookieStr = 'mlogin0001=' + userInfo;
	      let date = new Date;
				date.setDate(date.getDate() + 1);
	      this.$cookies.set('yiyiphone', encodeURI(cookieStr), date);
	    };
	    Vue.prototype.getCookie = function () {
	      return decodeURI( this.$cookies.get('yiyiphone') ).replace(/mlogin0001=/, '');
	    };
	    Vue.prototype.removeCookie = function () {
	    	this.$cookies.remove('yiyiphone')
	    };
		Vue.prototype.Api = Api;
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
	}
}