<template>
	<div id="zizhu" >	
		<div class="container bg-white" >
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
					zizhu='true'
					:addressList="receiptContent.address"
					v-on:setNewAddr="getNewAddr"
				></Pay>
				<!-- 提交订单 -->
				<div class=" border-top padding-top-bottom text-center">
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

export default {
	name: "zizhu",
	components: { Sheet, ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About },
	data () {
		return {
	        imageUrl: null,
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
  },
  mounted(){
    if( getCookie('phone') == ''){
      this.$router.push("/login")
    }    
    let url = this.getUrl
    this.axios.post(url+'/Home/Receipt/Index?type=1').then((res)=>{
        if(res.data.status == 200){
        	this.receiptContent = res.data.content
        }else{

        }          
    })
  },
	methods:{
	    onSubmit(){
	    	this.$set(this.submitReceipt, 'type', 1)
	    	this.beforeReceipt(submitReceipt);
	    },
	    beforeReceipt(arg){
	    	let url = this.getUrl
		    this.axios.post(url+'/Home/Receipt/beforeReceipt').then((res)=>{
		        if(res.data.status == 200){
		        	this.submitReceiptFn(arg)
		        }else{
					
		        }          
		    }) 
	    },
	    submitReceiptFn(args){
	    	let url = this.getUrl
		    this.axios.post(url+'/Home/Receipt/submitReceipt',qs.stringify(args)).then((res)=>{
		        if(res.data.status == 200){
		        	
		        }else{
					
		        }          
		    }) 
	    },
	    getWorkSheet(val){
	    	let self = this;
	    	self.$set(this.submitReceipt, 'name', val.name)
	    	self.$set(this.submitReceipt, 'cate_name', val.fabricType)
	    	self.$set(this.submitReceipt, 'style_name', val.kindType)
	    	self.$set(this.submitReceipt, 'mode_name', val.status)
	    },    
	    getColornumber(val,total){
	    	let self = this; 
	    	self.$set(this.submitReceipt, 'size', val)
	    	self.$set(this.submitReceipt, 'demanding_account', total)
	    	self.$set(self.receiptContent, 'demanding_account', total)    	
	    },
	    getPeriod(val){
	    	let self = this;
	    	self.$set(this.submitReceipt, 'fee', val.fee)
	    	self.$set(this.submitReceipt, 'total_fee', val.total_fee)
	    	self.$set(this.submitReceipt, 'expire_time', val.expire_time)
	    	self.$set(this.submitReceipt, 'arrival_date', val.arrival_date)
	    	self.$set(this.submitReceipt, 'delivery_date', val.delivery_date)
	    },
	    getClothePic(val){
	    	let self = this;
			self.$set(this.submitReceipt,'front_picture', val.front_picture)
			self.$set(this.submitReceipt,'back_picture' , val.back_picture)
			self.$set(this.submitReceipt,'left_picture' , val.left_picture)
			self.$set(this.submitReceipt,'right_picture', val.right_picture)
			self.$set(this.submitReceipt,'part_picture' , val.part_picture)
			self.$set(this.submitReceipt,'other_picture', val.other_picture)
	    },
	    getQuality(val){
	    	let self = this;
			self.$set(this.submitReceipt,'check', val.check)
			self.$set(this.submitReceipt,'error' , val.error)
			self.$set(this.submitReceipt,'supplement' , val.supplement)
			self.$set(this.submitReceipt,'requirement', val.requirement)
			self.$set(this.submitReceipt,'picture' , val.imageUrls)
	    },
	    getFabric(val){
	    	let self = this;
	    	self.$set(this.submitReceipt,'fabric', val)
	    },
	    getAbout(val){
	    	let self = this;
	    	self.$set(this.submitReceipt,'supplements', val)
	    },
	    getNewAddr(val){
	    	let self = this;
			self.$set(this.submitReceipt,'is_deposited', val.is_deposited)
			self.$set(this.submitReceipt,'phone', val.phone)
			self.$set(this.submitReceipt,'province', val.province)
			self.$set(this.submitReceipt,'city', val.city)
			self.$set(this.submitReceipt,'county', val.county)
			self.$set(this.submitReceipt,'street', val.street)
			self.$set(this.submitReceipt,'receiver', val.name)
	    }
	}
}
</script>
<style scoped>
	#zizhu{
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