<template>
	<div >
		<div v-if="submitSuccess" class=" padding-top-bottom color border-top">			
			<div class="container servicefee" >
			    <b-row  align-v="center" >
			        <b-col cols="3" >
						<div>
							支付费用：
						</div>
						<div>
							￥ 2000.00
						</div>
			        </b-col>
			        <b-col cols="9" class="login">
						<div>
							<span>订单名称：3000大棉袄</span>
							<span>订单编号：3000大棉袄</span>
						</div>
						<div>
							<span>订单状态：3000大棉袄</span>
							<span>订单金额：3000大棉袄</span>
						</div>
			        </b-col>
			    </b-row>
			    <b-col >
					<div>
						<b-nav tabs>
						  <b-nav-item :active="(displayOrNot == 'thd')"						  
						  @click="toPayPage('thd')">第三方支付</b-nav-item>
						  <b-nav-item :active="displayOrNot == 'bank' " 						  
						  @click="toPayPage('bank')">银行卡/信用卡支付</b-nav-item>
						</b-nav>
						<div class="pay-type">
							<div v-if="displayOrNot == 'thd'" class="padding-left-right padding-top-bottom">
								<ul class="padding-top">
									<li class="inline selected margin-right">
										<div class="bg-bank size2 bg-weichat "></div>
									</li>
									<li class="inline selected margin-right">
										<div class="bg-bank size2 bg-ali"></div>
									</li>
								</ul>
								<div class="padding-top"><button class="next btn"> 下一步 </button></div>
							</div>
							<div v-if="displayOrNot == 'bank'">
								
							</div>
						</div>
					</div>
			    </b-col>  
			</div>
		</div>
		<div v-else>
			<div  id="wuyou">
				<div class="container bg-white">
					<!-- 加工单编辑 -->
					<h3 class="text-center padding-top-bottom">加工单编辑</h3>
					<el-form ref="form" label-width="25%"  >		
						<Sheet v-on:setWorkSheet="getWorkSheet" 
							:category = "receiptContent.category" 
							:styles="receiptContent.style"
							:mode="receiptContent.mode"	
							></Sheet>
						<!-- 颜色数量 -->		
						<ColorAndNumber class="padding-left-right border-top padding-top-bottom" v-on:setColor="getColornumber"></ColorAndNumber>
						<!-- 加工详情与信息-->
						<Date class="padding-left-right border-top padding-top-bottom" 
							v-on:setPeriod="getPeriod"
							:total="receiptContent.demanding_account || 0 "					
						></Date>
						<!-- 上传图片 -->
						<Imgupload class="padding-left-right border-top padding-top-bottom" v-on:setClothePic="getClothePic"></Imgupload>		
						<!-- 品质要求 quality -->
						<Quality class="padding-left-right border-top padding-top-bottom" 
							v-on:setQuality="getQuality"
							:check="receiptContent.check" 
							:error="receiptContent.error"
						></Quality>	
						<!-- 面料 -->
						<Fabric class="padding-left-right border-top padding-top-bottom" 
							v-on:setFabric="getFabric"
							:component = "receiptContent.component"
							:category = "receiptContent.category"
						></Fabric>
						<!-- 其他要求1 -->
						<About class="padding-left-right border-top padding-top-bottom" v-on:setAbout="getAbout"></About>
						<!-- 收货人信息 -->
						<Pay class="border-top padding-top-bottom" 
							:deposit="receiptContent.deposit"
							:totalFee="submitotalFee"
							:addressList="receiptContent.address"
							v-on:setNewAddr="getNewAddr"
						></Pay>
						<!-- 提交订单 -->
						<div class="padding-left-right border-top padding-top-bottom text-center">
							<el-button type="primary" @click="onSubmit">自主发单</el-button>
						    <el-button >保存草稿</el-button>
						  </el-form-item>
						</div>			   
					</el-form>			
				</div>
			</div>				
		</div>
	</div>
	
</template>

<script>
import Sheet from "../workSheet"
import ColorAndNumber from "../colorAndNumber"
import Quality from "../quality"
import Date from "../date"
import Imgupload from "../imgupload"
import Pay from "../payAndAddr"
import Fabric from "../fabric"
import About from "../about"

import qs from 'qs';
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'


export default {
	name: "zizhu",
	components: { Sheet, ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About },
	data () {
		return {
			msg: '',
			displayOrNot: 'thd',
			submitSuccess: true,
		   	receiptContent:{},
		   	submitReceipt: {
				type: null,
				cate_name: null,
				name: null,
				style_name: null,
				mode_name: null,
				size: null,
				demanding_account: null,
				fee: null,
				total_fee: null,
				expire_time: null,
				arrival_date: null,
				delivery_date: null,
				front_picture: null,
				back_picture: null,
				left_picture: null,
				right_picture: null,
				part_picture: null,
				other_picture: null,
				check: null,
				error: null,
				supplement: null,
				requirement: null,
				picture: null,
				fabric: null,
				supplements: null,
				is_deposited: null,
				receiver: null,
				phone: null,
				province: null,
				city: null,
				county: null,
				street: null,
			}
		}
	},
  computed:{
      ...mapGetters([
         'getUrl',
      ]),
      submitotalFee(){
      	return this.submitReceipt.total_fee
      } 
  },
  mounted(){  
    let url = this.getUrl
    this.axios.post(url+'/Home/Receipt/Index?type=2').then((res)=>{
        if(res.data.status == 200){
        	this.receiptContent = res.data.content
        }         
    })
    this.getpayfront();    
  },
methods:{
	toPayPage(val){
		this.displayOrNot= val
	},
    onSubmit(){
    	this.$set(this.submitReceipt, 'type', 2)
    	this.submitReceiptFn(this.submitReceipt)
    },
    getpayfront(){
    	let url = this.getUrl    		
	    this.axios.post(url+'/Home/Receipt/payfront?money').then((res)=>{
	        if(res.data.status == 200){
	        	this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
	        }        
	    }) 
    },    
    submitReceiptFn(args){
    	let url = this.getUrl
	    this.axios.post(url+'/Home/Receipt/submitReceipt',qs.stringify(args)).then((res)=>{
	        console.log(res.data.content)
	        if(res.data.status == 200){
	        	this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
	        	this.$router.push("/indent")
		        }else{
		        	this.openMessage({str: res.data.msg, ele:this})
		    }            
	    }) 
    },
    getWorkSheet(val){
    	let self = this;
    	self.$set(self.submitReceipt, 'name', val.name)
    	self.$set(self.submitReceipt, 'cate_name', val.fabricType)
    	self.$set(self.submitReceipt, 'style_name', val.kindType)
    	self.$set(self.submitReceipt, 'mode_name', val.status)
    },    
    getColornumber(val,total){
    	let self = this;
    	self.$set(self.submitReceipt, 'size', val)    	
    	self.$set(self.submitReceipt, 'demanding_account', total)
    	self.$set(self.receiptContent, 'demanding_account', total)    	
    },
    getPeriod(val){
    	let self = this;
    	self.$set(self.submitReceipt, 'fee', val.fee)
    	self.$set(self.submitReceipt, 'total_fee', val.total_fee)
    	self.$set(self.submitReceipt, 'expire_time', val.expire_time)
    	self.$set(self.submitReceipt, 'arrival_date', val.arrival_date)
    	self.$set(self.submitReceipt, 'delivery_date', val.delivery_date)
    },
    getClothePic(val){
    	let self = this;
		self.$set(self.submitReceipt,'front_picture', val.front_picture)
		self.$set(self.submitReceipt,'back_picture' , val.back_picture)
		self.$set(self.submitReceipt,'left_picture' , val.left_picture)
		self.$set(self.submitReceipt,'right_picture', val.right_picture)
		self.$set(self.submitReceipt,'part_picture' , val.part_picture)
    	self.$set(self.submitReceipt,'other_picture', val.other_picture)
    },
    getQuality(val){
    	let self = this;    	
		self.$set(self.submitReceipt,'check', val.check)
		self.$set(self.submitReceipt,'error' , val.error)
		self.$set(self.submitReceipt,'supplement' , val.supplement)
		self.$set(self.submitReceipt,'requirement', val.requirement)
		self.$set(self.submitReceipt,'picture' , val.imageUrls)
    },
    getFabric(val){
    	let self = this;
    	self.$set(self.submitReceipt,'fabric', val)
    },
    getAbout(val){
    	let self = this;
    	self.$set(self.submitReceipt,'supplements', val)
    },
    getNewAddr(val){
    	let self = this;
		self.$set(self.submitReceipt,'is_deposited', val.is_deposited)
		self.$set(self.submitReceipt,'phone', val.phone)
		self.$set(self.submitReceipt,'province', val.province)
		self.$set(self.submitReceipt,'city', val.city)
		self.$set(self.submitReceipt,'county', val.county)
		self.$set(self.submitReceipt,'street', val.street)
		self.$set(self.submitReceipt,'receiver', val.name)
		self.$set(self.submitReceipt,'fee', val.per)
    }
}

}

</script>
<style scoped>
	#wuyou{		
		margin-top: 20px;
		background: rgb(248,248,248);
	}
	.submit button{
		width: 188px;
		margin: auto 20px;
	} 
	.submit button:second-child{
		background: rgb(204,204,204);
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
    border-color: #942eea #942eea #fff;
  }
  .bg-bank{
  	background-image: url(/static/bank/bank-icons.png);
  	background-repeat: no-repeat;
  	cursor: pointer;
  }
  .bg-gongshang{
	background-position: 1px 1px;
  }
  .bg-jianshe{
	background-position: 1px 1px;
  }
  .bg-nongye{
	background-position: 1px 1px;
  }
  .bg-zhaoshang{
	background-position: 1px 1px;
  }
  .bg-guangda{
	background-position: 1px 1px;
  }
  .bg-mingsheng{
	background-position: 1px 1px;
  }
  .bg-zhongxin{
	background-position: 1px 1px;
  }
  .bg-xingye{
	background-position: 1px 1px;
  }
  .bg-pudong{
	background-position: 1px 1px;
  }
  .bg-pingan{
	background-position: 1px 1px;
  }
  .bg-huaxia{
	background-position: 1px 1px;
  }
  .bg-ningbo{
	background-position: 1px 1px;
  }
  .bg-beijing{
	background-position: 1px 1px;
  }
  .bg-dongya{
	background-position: 1px 1px;
  }
  .bg-shanghai{
	background-position: 1px 1px;
  }
  .bg-youzheng{
	background-position: 1px 1px;
  }
  .bg-nanjin{
	background-position: 1px 1px;
  }
  .bg-bohai{
	background-position: 1px 1px;
  }
  .bg-shanghainongshang{
	background-position: 1px 1px;
  }
  .bg-weichat{
	background-position: 0px -280px;
  }
  .bg-ali{
	background-position: -164px -280px;
  }
  .selected{
  	position: relative;
  	border: 2px solid rgba(211, 201, 218, 0.18);
  }
  .selected:hover{
  	border: 2px solid rgb(148, 46, 234);
  }

  .size1{
  	width: 196px;
  	height: 46px;
  }
  .size2{
  	width: 139px;
  	height: 48px;
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
</style>