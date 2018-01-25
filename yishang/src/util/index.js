import Api from './api.js'
import axios from './http.js'
import qs from 'qs'

let post = ( reqstr, args, fn) => {
	axios.post( reqstr, qs.stringify(args) ).then( (res) =>{
		console.log(res)
		fn(res)
	})  
}
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
		};
		Vue.prototype.removeDomain= (arr)=>{
		  return  Array.from(arr , item => item.match(/uploads(\S*)/ig)[0] )
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
		Vue.prototype.windowSize = function(){
			let footerEle = document.getElementById("footer")
			window.onscroll = () => {
				var pageWidth=window.innerWidth,
			    pageHeight=window.innerHeight;
			    if ( typeof pageWidth !="number"){
			       if ( document.compatMode== "CSSICompat"){
				       pageWidth=document.documentElement.clientWidth;
				       pageHeight=document.documentElement.clientHeight;
			       } else{
				       pageWidth=document.body.clientWidth;
				       pageHeight=document.body.clientHeight;
			       }
			    }

				let scrolltop=document.documentElement.scrollTop||document.body.scrollTop
				if(scrolltop + pageHeight>= footerEle.offsetTop ){
					this.fixed = false					
				}else{
					this.fixed = true					
				}
			}
		}
		//objStringfy
		Vue.prototype.objStringfy =  function(args){ return JSON.parse( JSON.stringify(args) ) };
		//axios
		Vue.prototype.Api = Api;
		Vue.prototype.LoginCheck = function(args){return axios.post( Api.loginCheck, qs.stringify(args) ) };
		Vue.prototype.LogOut = function(args){	return axios.get( Api.logOut, qs.stringify(args) ) };
		Vue.prototype.Qrcode = function(args){	return axios.post( Api.qrcode, qs.stringify(args) ) };
		Vue.prototype.QrcodeLoop = function(args){	return axios.post( Api.qrcodeLoop, qs.stringify(args) ) };
		Vue.prototype.QrcodeLogin = function(args){	return axios.post( Api.qrcodeLogin, qs.stringify(args) ) };
		Vue.prototype.Index = function(args){	return axios.post( Api.index, qs.stringify(args) ) };
		Vue.prototype.Banner = function(args){	return axios.post( Api.getBanner, qs.stringify(args) ) };
		Vue.prototype.BeforeReceipt = function(args){	return axios.post( Api.beforeReceipt, qs.stringify(args) ) };
		Vue.prototype.ReceiptIndex = function(args){	return axios.post( Api.receiptIndex, qs.stringify(args) ) };
		Vue.prototype.GetRegion = function(args){	return axios.post( Api.getRegion, qs.stringify(args) ) };
		Vue.prototype.AddAddress = function(args){	return axios.post( Api.addAddress, qs.stringify(args) ) };
		Vue.prototype.SubmitReceipt = function(args){	return axios.post( Api.submitReceipt, qs.stringify(args) ) };
		Vue.prototype.Payfront = function(args){	return axios.post( Api.payfront, qs.stringify(args) ) };
		Vue.prototype.PayBeforeSubmit = function(args){	return axios.post( Api.payBeforeSubmit, qs.stringify(args) ) };
		Vue.prototype.WxPay = function(args){	return axios.post( Api.wxPay, qs.stringify(args) ) };
		Vue.prototype.SubmitDraft = function(args){	return axios.post( Api.submitDraft, qs.stringify(args) ) };
		Vue.prototype.OrderIndex = function(args){	return axios.post( Api.orderIndex, qs.stringify(args) ) };
		Vue.prototype.Schedule = function(args){	return axios.post( Api.schedule, qs.stringify(args) ) };
		Vue.prototype.Details = function(args){	return axios.post( Api.details, qs.stringify(args) ) };

	}
}