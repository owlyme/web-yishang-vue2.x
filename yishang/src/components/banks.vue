<template>	
<div>
	<b-row  align-v="center" class="msg">
        <b-col cols="2" class="border-right" >
			<div>
				支付费用：
			</div>
			<div>
				￥ <span class="serve-fee">{{receiptPayFront.service_fee}}</span>
			</div>
        </b-col>
        <b-col cols="9" class="login">
			<div>
				<span class="padding-right">订单名称：{{receiptPayFront.name}}</span>
				<span>订单编号：{{receiptPayFront.code}}</span>
			</div>
			<div>
				<span class="padding-right">订单状态：接单状态</span>
				<span>订单金额：{{receiptPayFront.total_fee}}</span>
			</div>
        </b-col>
    </b-row>
    <div v-if="!showWeiChat">
	    <b-col >
			<b-nav tabs>
			  <b-nav-item :active="(displayOrNot == 'thd')"						  
			  @click="toPayPage('thd')">第三方支付</b-nav-item>
			  <b-nav-item 

			  v-if="false"

			  :active=" (displayOrNot == 'bank') " 						  
			  @click="toPayPage('bank')">银行卡/信用卡支付</b-nav-item>
			</b-nav>
			<div class="pay-type">
				<div v-if="displayOrNot == 'thd'" class="padding-left-right padding-top-bottom">
					<ul class="padding-top">
						<label v-for="(item, index) in thirdParty"
				      			:key="'bank'+ index"
				       			:label="item.id" 
				       			@click="selected(index, thirdParty)"
				       			:class="{checked: item.check}"
				       			class="inputLabel size2">
							<input type="radio" name="bank" :value="item.payType" v-model="bank">
							<span class="banklogo"> <img :src="item.logo" /></span>
						</label>
					</ul>
					<div class="padding-top-bottom" @click="nextPay(bank)"><button class="next btn" > 下一步 </button></div>
				</div>
				<div v-if="displayOrNot == 'bank'">
					<div class="bank-box">
						<label v-for="(item, index) in bankList"
				      			:key="'bank'+ index"
				       			:label="item.id" 
				       			@click="selected(index, bankList)"
				       			:class="{checked: item.check}"
				       			class="inputLabel size1">
							<input type="radio" name="bank" :value="item.payType" v-model="bank">
							<span class="banklogo"> <img :src="item.logo" /></span>
						</label>
						<div class="padding-top-bottom" @click="nextPay()"><button class="next btn"> 下一步 </button></div>
					</div>
				</div>
			</div>
	    </b-col>
    </div>
    <div class="weichatpay" v-else>

    	<b-row >
    		<b-col >
    			<div class="weichatpayqrcode center">
    				<img :src="payQrcode">
    			</div>
    			<div class="weichatpaybutton center">
    				<img src="/static/weichat/weichatpaybutton.jpg">
    			</div>
    		</b-col>
    		<b-col>
    			<div>
					微信支付金额： <span class="serve-fee">{{receiptPayFront.service_fee}}</span>元
				</div>
				<div class="padding-top-bottom"> <el-button type="primary" @click.native="back()">改变支付方式</el-button> </div>
    		</b-col>
    	</b-row>   	
    </div>
  
</div>
</template>
<script >
import { mapGetters } from 'vuex'
import qs from 'qs';
import { mapMutations } from 'vuex'
    

export default{
	props:['submitReceipt','receiptContent'],
	data(){
		return{
			displayOrNot: 'thd',
			bank: "",
			payType: "",
			showWeiChat: false,
			payQrcode: '',
			thirdParty:[
				{
					name:'微信支付',
					payType:'wxpay',
					check:false,
					flag: false,
					logo: require('../assets/bank/weichat.jpg')
				},
				{
					name:'淘宝支付',
					payType:'alipay',
					check:false,
					flag: false,
					logo: require('../assets/bank/ali.jpg')
				}
			],
			bankList:[
				{
					name:'工商银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/gongshang.jpg')
				},
				{
					name:'建设银行',
					payType:'2',
					check:false,
					flag: false,
					logo: require('../assets/bank/jianshe.jpg')
				},
				{
					name:'农业银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/nongye.jpg')
				},
				{
					name:'招商银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/zhaoshang.jpg')
				},
				{
					name:'光大银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/guangda.jpg')
				},
				{
					name:'民生银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/minsheng.jpg')
				},
				{
					name:'中兴银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/zhongxing.jpg')
				},
				{
					name:'兴业银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/xingye.jpg')
				},
				{
					name:'浦东银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/shanghaipudong.jpg')
				},
				{
					name:'平安银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/pingan.jpg')
				},
				{
					name:'华夏银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/huaxia.jpg')
				},
				{
					name:'宁波银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/ningbo.jpg')
				},
				{
					name:'东亚银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/dongya.jpg')
				},
				{
					name:'上海银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/shanghai.jpg')
				},
				{
					name:'邮政银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/youzheng.jpg')
				},
				{
					name:'南京银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/nanjing.jpg')
				},
				{
					name:'渤海银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/bohai.jpg')
				},
				{
					name:'上海农商银行',
					payType:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/shanghainongshang.jpg')
				}
			],
			receiptPayFront:{

			}
		}
	},
	computed:{
		...mapGetters([
         'getUrl',
      	]),
		servantFee(){
			return submitReceipt.total_fee * receiptContents.deposit
		}
	},
	created(){
		this.getPayfront()
	},
	methods:{
		...mapMutations([
	      'setIndentBlock',
	    ]),
		toPayPage(val){
			this.displayOrNot= val
		},
		selected(index, list){
			list.forEach((item, _index)=>{
				if(index == _index){
					this.$set(item, "check", true)
					this.$emit('update:bankVal', index)
					this.payType = item.payType
				}else{
					this.$set(item, "check", false)
				}
			})
		},
		getPayfront(){
			let url = this.getUrl
			let args= { order_id: this.receiptContent.order_id}
			// console.log(this.receiptContent.order_id)
	        this.axios.post(url+'/Receipt/payfront',qs.stringify(args)).then((res)=>{	  
	        	console.log(res)
				if(res.data.status == 200 ){
					this.receiptPayFront = res.data.content
				}else {
					
				}
	      	})
		},
		back(){
			this.showWeiChat = false
			clearInterval(this.timer)
		},
		nextPay(payType){
			let url = this.getUrl
			let args= { order_id: this.receiptPayFront.order_id,
						pay_type: payType,
						service_fee: this.receiptPayFront.service_fee}
			if( payType == 'wxpay' ){
				this.setIndentBlock(true)
				this.showWeiChat= true;
				this.axios.post(url+'/Receipt/payBeforeSubmit',qs.stringify(args))
		       	.then((res)=>{
		       		// console.log(res)
					if(res.data.status == 200 ){
						this.payQrcode =  res.data.content.url
						this.afterWxpay()
					}else {
						
					}
		       	})		       	
			}else if(payType == 'alipay'){
				window.open(url+'/Receipt/payBeforeSubmit?pay_type='+args.pay_type
					 										 +'&service_fee'+args.service_fee
															 +'&order_id'+args.order_id)
			}	       	
		},
		afterWxpay(){
			let self = this
			let url = self.getUrl
			let args= { order_id: this.receiptPayFront.order_id}			
				self.timer = setInterval(()=>{
					this.axios.post(url+'/Receipt/IswxPay',qs.stringify(args))
			       	.then((res)=>{
						// console.log(res)
						if(res.data){
							clearInterval(self.timer)
							this.showWeiChat = false
							this.receiptContent.order_id =  null
							this.$router.push('/indent')
						}else {
							console.log('Waiting wxpay...')
						}
			       	})			   
			}, 2000)
		},
		alipay(){}
	}
}
</script>
<style scoped>
	.bank-box{
		padding: 30px;
	}
	.pay-type ,.msg{
		font-size: 16px;
		color: rgb(51, 51, 51);
		line-height: 1.2;
	}
	.msg{
		height: 100px;
		line-height: 30px;
		background: rgb(255, 252, 217);
		margin-bottom: 50px;
	}
	.inputLabel{
		position: relative;
		height: 60px;
		margin: 20px 0;
		line-height: 60px;
		text-indent:  30px;
	}
	.inputLabel:before{
		display: inline-block;
		position: absolute;
		left: 0;
    	top: 20px;
		content: '';
		width: 20px;
		height: 20px;
		border-radius: 10px;
		border:1px solid rgb(148, 46, 234);
	}
	.inputLabel:after{
		display: none;
		position: absolute;
		content: '';
		left: 3px;
    	top: 23px;
		width: 14px;
		height: 14px;
		border-radius: 7px;
		background: rgb(148, 46, 234);
		border:1px solid rgb(148, 46, 234);
	}
	.inputLabel input{
		display: none;
	}
	.checked.inputLabel:after{
		display: inline-block;
	}
	.banklogo{
		padding: 10px;
		padding-right: 30px;
		border: 2px solid rgba(70, 70, 70, 0.2);
	}
	.banklogo:hover{
		padding: 10px;
		padding-right: 30px;
		border: 2px solid rgb(148, 46, 234);
	}
	.checked .banklogo{
		border: 2px solid rgb(148, 46, 234);	
	}
  .size1{ 
  	width: 25%;
  	height: 46px;
  }
  .size2{
  	margin-right: 30px;
  }
  .size2.inputLabel{
  	height: 50px;
	line-height: 0px;
  	text-indent: 0;
  }
	.size2.inputLabel:before,
	.size2.inputLabel:after{
		display: none;
	}
	.checked.size2.inputLabel:after{
		display: block;
		position: absolute;
		content: '';
		left: initial;
    	top: initial;
    	right: 0;
    	bottom: 0;
		height: 16px;
	    width: 16px;
	    border-radius: 0;
	    background: initial;
	    border: none;
	    background-image: url(/static/bank/bank-icons.png);
	    background-repeat: no-repeat;
	    background-position: -122px -375px;
	}
 	.size2 .banklogo{
 		display: inline-block;
 		padding: 0;
 	}
 
  .inline{
  	display: inline-block;
  	padding: 2px;
  }
  .is-selected{
  	position: absolute;
  	width: 6px;
  	height:6px;
  	right: 0;
  	bottom: 0;
  }
  .next{
 	width: 139px;
  	height: 36px;
 	background: rgb(148, 46, 234);
 	color: #fff;
 	font-size: 1.1em;
 	font-weight: 600px;
 }
 .pay-type{
		border: 2px solid rgb(148, 46, 234);
		border-top: none;
	}
	.nav-tabs {
	    border-bottom: 2px solid #942eea;
	}
	.nav-tabs .nav-item {
	    margin-bottom: -3px;
	}
.nav-link.active{
    color: rgb(148, 46, 234);
    border-width: 2px;
    border-color: #942eea #942eea #fff !important;
  }
 .serve-fee{
 	font-size: 30px;
	color: rgb(255, 102, 0);
	font-weight: bold;
	line-height: 1.2;
	vertical-align: top;
 }
 .weichatpay .serve-fee{
 	vertical-align: middle;
 }
 .weichatpay{
 	padding: 60px;
 	color: rgb(51, 51, 51);
 	border: 2px solid rgb(148, 46, 234);
 }
 .weichatpayqrcode img{
 	padding: 30px;
 	border: 1px solid rgba(104,104, 104,0.5);
	width: 212px;
	height: 212px;
 }
 .weichatpaybutton{
 	margin-top: 60px;
 	padding: 3px; 
 	height: 82px;	
 }
 .weichatpaybutton img{
	width: 270px;
	height: 82px;
 }
.border-right{
	border-right: 1px solid #d5cfcf;
}
</style>