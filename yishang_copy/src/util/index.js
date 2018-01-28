import Api from './api.js'
import axios from './http.js'
import qs from 'qs'

let post = ( reqstr, args, fn) => {
	axios.post( reqstr, qs.stringify(args) ).then( (res) =>{
		console.log(res)
		fn(res)
	})  
}

let str = '{"category":[{"category_id":"1","category_name":"针织"},{"category_id":"2","category_name":"梭织"},{"category_id":"3","category_name":"毛呢"},{"category_id":"4","category_name":"牛仔"},{"category_id":"5","category_name":"皮革"},{"category_id":"6","category_name":"户外装"},{"category_id":"7","category_name":"无缝衫"},{"category_id":"8","category_name":"制服"},{"category_id":"9","category_name":"私人定制"},{"category_id":"10","category_name":"饰品"},{"category_id":"11","category_name":"其他"}],"mode":[{"mode_id":"2","mode_name":"前加工"},{"mode_id":"3","mode_name":"全加工"},{"mode_id":"4","mode_name":"后加工"}],"style":[{"style_id":"1","style_name":"T恤"},{"style_id":"2","style_name":"卫衣"},{"style_id":"3","style_name":"polo衫"},{"style_id":"4","style_name":"上衣"},{"style_id":"5","style_name":"裤子"},{"style_id":"6","style_name":"连衣裙"},{"style_id":"7","style_name":"短裙"},{"style_id":"8","style_name":"衬衫"},{"style_id":"9","style_name":"羽绒服"},{"style_id":"10","style_name":"羽绒裤"},{"style_id":"11","style_name":"棉服"},{"style_id":"12","style_name":"棉裤"},{"style_id":"13","style_name":"外套"},{"style_id":"14","style_name":"两件套"},{"style_id":"15","style_name":"三件套"},{"style_id":"16","style_name":"马甲"},{"style_id":"17","style_name":"打底衫"},{"style_id":"18","style_name":"打底裤"},{"style_id":"19","style_name":"旗袍"},{"style_id":"20","style_name":"婚纱"},{"style_id":"21","style_name":"单西"},{"style_id":"22","style_name":"披肩"},{"style_id":"23","style_name":"帽子"},{"style_id":"24","style_name":"袜子"},{"style_id":"25","style_name":"手套"},{"style_id":"26","style_name":"领带"},{"style_id":"27","style_name":"口罩"}],"check":[{"check_id":"1","check_name":"发单方自检"},{"check_id":"2","check_name":"第三方检查"},{"check_id":"3","check_name":"厂家自检"}],"error":[{"error_id":"1","error_value":"0.5cm"},{"error_id":"2","error_value":"1cm"},{"error_id":"3","error_value":"2cm"},{"error_id":"4","error_value":"3cm"},{"error_id":"5","error_value":"4cm"},{"error_id":"6","error_value":"5cm"}],"component":[{"component_id":"1","component_name":"麻"},{"component_id":"2","component_name":"桑蚕丝"},{"component_id":"3","component_name":"粘胶"},{"component_id":"4","component_name":"涤纶"},{"component_id":"5","component_name":"锦纶"},{"component_id":"6","component_name":"醋酯纤维"}],"address":[{"id":"53","receiver":"22","phone":"13156565656","province":"北京市","city":"市辖区","county":"东城区","street":"11"},{"id":"30","receiver":"寻菜","phone":"123456","province":"广东省","city":"深圳市","county":"宝安区","street":"龙华大浪街"},{"id":"31","receiver":"哈哈","phone":"18271632203","province":"浙江省","city":"杭州市","county":"江干区","street":"二号大街"},{"id":"47","receiver":"xy","phone":"13156521718","province":"浙江省","city":"杭州市","county":"上城区","street":"gongshu"},{"id":"52","receiver":"22","phone":"13156521718","province":"北京市","city":"市辖区","county":"东城区","street":"222"}],"deposit":0.1,"done":{"details":{"order_id":"113","uid":"20","name":"113","category":"针织","style":"T恤","mode":"后加工","demanding_account":"2","fee":"88.00","total_fee":"176.00","expire_time":"2018-01-15 14:09:37","arrival_date":"2018-01-23","delivery_date":"2018-01-31","front_picture":"http://101.132.187.244:8083/Uploads/Images/2018-01-14/97fbf32258ee81bec7cdb2fc2bf16aff.jpg","back_picture":"http://101.132.187.244:8083/Uploads/Images/2018-01-14/5425bc86ce3c835432992ef19f288916.jpg","left_picture":"http://101.132.187.244:8083/Uploads/Images/2018-01-14/d6d6f52ad2ae1075c6f1ac657968ebba.jpg","right_picture":"http://101.132.187.244:8083/Uploads/Images/2018-01-14/500883091fb4356ff6327d869f1497f3.jpg","part_picture":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/ae36b63d436fbbccf7cffcdabd3fb871.jpg"],"is_deposited":"1","type":"2","category_id":"1","style_id":"1","mode_id":"4"},"size":[{"color":"88","xs_demanding_account":1,"s_demanding_account":1,"m_demanding_account":0,"l_demanding_account":0,"xl_demanding_account":0,"xxl_demanding_account":0,"xxxl_demanding_account":0,"xxxxl_demanding_account":0,"total_demanding_account":"2"}],"part":[{"title":"","sub_picture":[]}],"quality":{"check":null,"error":null,"quality_requirement":"普通","size_table":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/9eb9bf184cdcc6d1c4aebafcc1329b55.jpg"],"process_list":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/05ac67d0280d64e1f4435918942e57f6.jpg"],"requirement":"777","picture":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/2e5f00e2657e0b0d34312caa760045ec.jpg"],"check_id":"1","error_id":"1"},"fabric":[{"name":"111","component":"麻","grammage":"11","width":"11","units":"厘米","weight":"11","picture":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/e28546f1e792e4541faad70161b7ee5e.jpg"],"is_main":"1","component_id":"1"}],"supplement":[{"requirement":"444","picture":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/bae0ffe9e4f2cbfb1fe8430a3ce5f5a4.jpg"]}],"address_id":"53"},"service_fee":0}'

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
			let save = document.getElementById("save")			
			let scrolling = () => {
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
					save.style.left = pageWidth/2- 100+"px"
					this.fixed = true					
				}
			}
			scrolling()
			window.onresize = scrolling
			window.onscroll = scrolling
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

		Vue.prototype.str = str;

	}
}