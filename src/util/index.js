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
		Vue.prototype.openMessage = (arg, fn) =>{
		    let html='';
		    	if( !arg.bool){
		    		html = '<span style="color: #C44DDC">'+arg.str+'</span>';
		    	}else{
		    		html = '<i style="color: red">'+arg.str+'</i>';
		    	} 
		        arg.ele.$alert( html, arg.title,{
		          dangerouslyUseHTMLString: true,
		          showClose: false,
		          callback: () => {
		           	if(fn ) fn();
		          }
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
					if(save){
						save.style.left = pageWidth/2- 100+"px"
						this.fixed = true	
					}				
				}
			}
			scrolling()
			window.onresize = scrolling
			window.onscroll = scrolling
		};
		Vue.prototype.srcollTo = function(ele){
			let _top=0;
			do{
				_top += ele.offsetTop
				ele = ele.offsetParent
			} while ( ele.tagName !== 'BODY')
			window.scrollTo(0, _top)
			// setTimeout( function(){window.scrollTo(0, _top)} , 300)
		}
		Vue.prototype.totalTop = function(ele){
			let _top=0;
			do{
				_top += ele.offsetTop
				ele = ele.offsetParent
			} while ( ele.tagName !== 'BODY')
			return _top
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
		
		Vue.prototype.fadan = function(page){
			let zizhupage =  document.getElementById("zizhupage"),
				mainpage =  document.getElementById("mainpage"),
				indentpage =  document.getElementById("indentpage"),
				wuyoupage = document.getElementById("wuyoupage"),
				_classname = 'muneNav',
				classname = 'muneNav isactive';

			let pages = [mainpage, zizhupage, wuyoupage, indentpage]
			let classes = [_classname, _classname, _classname, _classname]
			if(page == 'main'){ classes[0] = classname }
			if(page == 'zizhu'){ classes[1] = classname }
			if(page == 'wuyou'){ classes[2] = classname }
			if(page == 'indent'){ classes[3] = classname }
			pages.forEach( (item, index)=>{
				item.className= classes[index]
			})
		},
		Vue.prototype.datas = JSON.parse('{"status":200,"msg":"请求成功","content":{"list":[{"order_id":"99","uid":"20","name":"红娘测试","front_picture":"Uploads/Images/2018-02-08/df29cb40555db88d0fa2b23a4aadcecf.jpg","demanding_account":"1","done_account":"0","fee":"0.10","expire_time":"2018-03-14 16:17:26","arrival_date":"2018-03-21","delivery_date":"2018-03-28","type":"2","cycle":"7","mode":"全加工","status":"3300","msg":"资料完备超时","msg_color":0,"state":"待发前期资料"},{"order_id":"98","uid":"20","name":"","front_picture":"Uploads/Images/2018-02-08/a92399997b266c154d73591171a5b65b.jpg","demanding_account":"0","done_account":"0","fee":"0.00","expire_time":"0000-00-00 00:00:00","arrival_date":"0000-00-00","delivery_date":"0000-00-00","type":"2","cycle":null,"mode":"","status":"-1","msg":"等待编辑","msg_color":0,"state":"草稿"},{"order_id":"97","uid":"20","name":"32132","front_picture":"Uploads/Images/2018-02-08/3b8d9bb3dd4b37cf49d89dabdaf43c3d.png","demanding_account":"3","done_account":"0","fee":"3123.02","expire_time":"0000-00-00 00:00:00","arrival_date":"0000-00-00","delivery_date":"0000-00-00","type":"2","cycle":null,"mode":"","status":"-1","msg":"等待编辑","msg_color":0,"state":"草稿"},{"order_id":"91","uid":"20","name":"qwe","front_picture":"Uploads/Images/2018-02-07/963585f140bcd0d66fbb3136fceb3cdd.png","demanding_account":"2","done_account":"0","fee":"32.50","expire_time":"0000-00-00 00:00:00","arrival_date":"0000-00-00","delivery_date":"0000-00-00","type":"1","cycle":null,"mode":"清加工（全加工）","status":"-1","msg":"等待编辑","msg_color":0,"state":"草稿"},{"order_id":"85","uid":"20","name":"132","front_picture":"Uploads/Images/2018-02-07/843604d9663ffe5ea7dee765f60e2638.png","demanding_account":"0","done_account":"0","fee":"0.00","expire_time":"0000-00-00 00:00:00","arrival_date":"0000-00-00","delivery_date":"0000-00-00","type":"1","cycle":null,"mode":"清加工（全加工）","status":"-1","msg":"等待编辑","msg_color":0,"state":"草稿"},{"order_id":"83","uid":"20","name":"3424","front_picture":"Uploads/Images/2018-02-06/8542e7ac540e252c03a985e0a07c7cf9.jpg","demanding_account":"0","done_account":"0","fee":"0.00","expire_time":"0000-00-00 00:00:00","arrival_date":"0000-00-00","delivery_date":"0000-00-00","type":"2","cycle":null,"mode":"","status":"-1","msg":"等待编辑","msg_color":0,"state":"草稿"},{"order_id":"82","uid":"20","name":"12312","front_picture":"Uploads/Images/2018-02-05/6188fa5ce0e0a3544cf4dad66000e66d.jpg","demanding_account":"0","done_account":"0","fee":"0.00","expire_time":"0000-00-00 00:00:00","arrival_date":"0000-00-00","delivery_date":"0000-00-00","type":"2","cycle":"0","mode":"","status":"-1","msg":"等待编辑","msg_color":0,"state":"草稿"},{"order_id":"81","uid":"20","name":"哒哒","front_picture":"","demanding_account":"0","done_account":"0","fee":"0.00","expire_time":"0000-00-00 00:00:00","arrival_date":"0000-00-00","delivery_date":"0000-00-00","type":"2","cycle":"0","mode":"全加工","status":"-1","msg":"等待编辑","msg_color":0,"state":"草稿"},{"order_id":"73","uid":"20","name":"无忧","front_picture":"Uploads/Images/2018-02-04/b09745844167890794e6f5ae055631f7.jpg","demanding_account":"1","done_account":"0","fee":"0.10","expire_time":"2018-02-07 19:40:28","arrival_date":"2018-02-21","delivery_date":"2018-02-28","type":"2","cycle":"7","mode":"全加工","status":"2000","msg":"抢单时间超时","msg_color":0,"state":"系统已派发1家M"},{"order_id":"72","uid":"20","name":"125","front_picture":"Uploads/Images/2018-02-04/8c9cd8419b0ece105fe760a4fb2ae900.jpg","demanding_account":"1","done_account":"0","fee":"0.10","expire_time":"2018-02-05 17:48:00","arrival_date":"2018-02-06","delivery_date":"2018-02-07","type":"2","cycle":"1","mode":"前加工","status":"9000","msg":"已取消","msg_color":-1,"state":"已取消"}],"totalRows":"16","pageSize":10}}')
		Vue.prototype.Schedule11 = JSON.parse('{"status":200,"msg":"请求成功","content":{"details":{"order_id":"73","front_picture":"Uploads/Images/2018-02-04/b09745844167890794e6f5ae055631f7.jpg","name":"无忧","fee":"0.10","total_fee":"0.10","expire_time":"2018-02-07 19:40:28","delivery_date":"2018-02-28","cycle":"7","arrival_date":"2018-02-21","code":"201802041941232233","mode":"全加工","done_account":"0","demanding_account":"1","is_deposited":"1","undertake_id":null,"status":"2000","uid":"20","style":"上衣","back_picture":"Uploads/Images/2018-02-04/ffa2e4e4028b79a728506e20137f0803.jpg","left_picture":"Uploads/Images/2018-02-04/2ffccfa81e9128a59f46c1d586b33b36.jpg","right_picture":"Uploads/Images/2018-02-04/572b4c524dfa06255e98051c17bcff49.jpg","part_picture":null,"type":"2","transaction_id":null,"publish_company":{"cert_id":"7","uid":"20","company":"哈哈哈","province":"上海","city":"上海市","county":"普陀区","address":"还长虹","star":5,"order_number":"0"},"undertake_company":"","remander":"","status_msg":"待选加工厂"},"history":[{"log_id":"263","operation":"系统安排M接单","create_time":"2018-02-06 17:18:36"},{"log_id":"226","operation":"哈哈哈发布了无忧订单","create_time":"2018-02-04 19:42:03"}]}}')
		Vue.prototype.detail11 = JSON.parse('{"status":200,"msg":"请求成功","content":{"details":{"order_id":"73","front_picture":"Uploads/Images/2018-02-04/b09745844167890794e6f5ae055631f7.jpg","name":"无忧","fee":"0.10","total_fee":"0.10","expire_time":"2018-02-07 19:40:28","delivery_date":"2018-02-28","cycle":"7 天","arrival_date":"2018-02-21","code":"201802041941232233","mode":"全加工","done_account":"0","demanding_account":"1","is_deposited":"1","undertake_id":null,"status":"2000","uid":"20","style":"上衣","back_picture":"Uploads/Images/2018-02-04/ffa2e4e4028b79a728506e20137f0803.jpg","left_picture":"Uploads/Images/2018-02-04/2ffccfa81e9128a59f46c1d586b33b36.jpg","right_picture":"Uploads/Images/2018-02-04/572b4c524dfa06255e98051c17bcff49.jpg","part_picture":null,"type":"2","transaction_id":null,"publish_company":{"cert_id":"7","uid":"20","company":"哈哈哈","province":"上海","city":"上海市","county":"普陀区","address":"还长虹","star":5,"order_number":"0"},"undertake_company":"","color":"红色"},"main":{"fabric_id":"85","name":"面料啊","component":null,"category":null,"grammage":"","width":"","units":"","weight":"0","picture":["Uploads/Images/2018-02-04/5360c63fe6dc3052ff83c1c6da9376f5.jpg"]},"auxiliary":[],"otherPic":[],"size":[{"size_id":"107","color":"红色","xs_demanding_account":"1","xs_done_account":"0","s_demanding_account":"0","s_done_account":"0","m_demanding_account":"0","m_done_account":"0","l_demanding_account":"0","l_done_account":"0","xl_demanding_account":"0","xl_done_account":"0","xxl_demanding_account":"0","xxl_done_account":"0","xxxl_demanding_account":"0","xxxl_done_account":"0","xxxxl_demanding_account":"0","xxxxl_done_account":"0","total_demanding_account":"1","total_done_account":"0"}],"quality":{"quality_id":"82","check":"第三方检查","error":"2cm","quality_requirement":"半精品","size_table":null,"process_list":null,"requirement":"","picture":null},"supplement":[],"address":{"address_id":"88","receiver":"哈哈","phone":"18271632203","province":"浙江省","city":"杭州市","county":"江干区","street":"二号大街"}}}')
	}
}