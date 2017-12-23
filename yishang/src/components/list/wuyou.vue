<template>
	<div id="wuyou" >
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
import {setCookie,getCookie} from '../../cookies.js'



const receiptContent={
	cate: {// true array[object] 商品类别下拉
		cate_id:null,// true string
		cate_name:null// true string
	},
	mode:{//true array[object]  加工模式下拉
		mode_id: null,//true string
		mode_name:null// true string 
	},
	style:{// true array[object]服装类型下拉
		style_id:null,// true string
		style_name:null// true string
	},
	check:{ //true array[object]查货模式下拉
		check_id:null,// true string
		check_name:null// true string
	},
	error:{//true array[object]误差标准下拉
		error_id:null,// true string
		value:null// true string
	},
	component:{//true array[object]面料成分下拉
		component_id:null,// true string
		component_name:null,// true string
	},
	category:{//true array[object]面料类别下拉
		category_id:null,// true string
		category_name:null,// true string
	},
	address:{//true array[object]
		id:null,// true string收货人id
		receiver:null,// true string收货人
		phone:null,// true string手机号
		province:null,// true string省city true string市
		county:null,// true string区
		street:null,// true string
	}	
}	


export default {
	name: "zizhu",
	components: { Sheet, ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About },
	data () {
		return {
			zizhuIndent: {
	         	workSheet:{},
				colorNum:{},
				period:{},
				clothePic:{},
				quality:{},
				fabric:{},
				about:{},
				newAddr:{}
	        },
	        formInline: {
	          user: '',
	          region: ''
	        },
	        imageUrl: null,
			types: [
		        'text', 'password', 'email', 'number', 'url','tel', 'date', `time`, 'range', 'color'
		      ],
		   	activeNames: ['1'],
		   	value:null,
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
    if( getCookie('phone') == ''){
      this.$router.push("/login")
    }    
    let url = this.getUrl
    this.axios.post(url+'/Home/Receipt/Index?type=2').then((res)=>{
        if(res.data.status == 200){
        	this.receiptContent = res.data.content
        }else{
        	
        }          
    })
    this.getpayfront();
  },
methods:{
    onSubmit(){
    	this.$set(this.submitReceipt, 'type', 2)
    	this.beforeReceipt(this.submitReceipt);

    },
    getpayfront(){
    	let url = this.getUrl    		
	    this.axios.post(url+'/Home/Receipt/payfront?money').then((res)=>{
	        if(res.data.status == 200){
	        	this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
	        }else{
				
	        }          
	    }) 
    },
    beforeReceipt(arg){
    	let url = this.getUrl    		
	    this.axios.post(url+'/Home/Receipt/beforeReceipt').then((res)=>{
	    	console.log(this.submitReceipt)
	        if(res.data.status == 200){
	        	this.submitReceiptFn(arg)
	        }else{
				
	        }          
	    }) 
    },
    submitReceiptFn(args){
    	let url = this.getUrl
	    this.axios.post(url+'/Home/Receipt/submitReceipt',qs.stringify(args)).then((res)=>{
	        console.log(res.data.content)
	        if(res.data.status == 200){
	        	
	        }else{
				
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
</style>