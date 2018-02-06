<template>
	<div>
		<div v-show="getShowBanks" id="banks" class=" padding-top-bottom color border-top">	
			<div class="container" v-if="getShowBanks">		
				<Banks 
				:serverfee="receiptContent.service_fee"
				:orderId="receiptContent.order_id" ></Banks>
			</div>
		</div>
		<div v-show="!getShowBanks">
			<div  id="wuyou">
				<div class="container bg-white">
					<!-- 加工单编辑 -->
					<h3 class="text-center padding-top-bottom">加工单编辑</h3>
					<el-form ref="form" label-width="25%"  >		
						<Sheet 	:receiptContent= 'receiptContent' 
								:submitReceipt= "submitReceipt"></Sheet>
						<!-- 颜色数量 -->		
						<ColorAndNumber class="padding-left-right border-top padding-top-bottom" 
							:receiptContent='receiptContent'
							:submitReceipt="submitReceipt"></ColorAndNumber>
						<!-- 加工详情与信息-->
						<Date class="padding-left-right border-top padding-top-bottom" 
							:receiptContent='receiptContent'
							:submitReceipt="submitReceipt"
						></Date>
						<!-- 上传图片 -->
						<Imgupload class="padding-left-right border-top padding-top-bottom" 
							:receiptContent='receiptContent'
							:submitReceipt="submitReceipt"
						></Imgupload>		
						<!-- 品质要求 quality -->
						<Quality class="padding-left-right border-top padding-top-bottom" 
							:receiptContent='receiptContent'
							:submitReceipt="submitReceipt"
						></Quality>	
						<!-- 面料 -->
						<Fabric class="padding-left-right border-top padding-top-bottom" 
							:component='receiptContent.component'
							:doneFabric='receiptContent.done.fabric'
							:submitReceiptFabric.sync = 'submitReceipt.fabric'
						></Fabric>
						<!-- 其他要求1 -->
						<About class="padding-left-right border-top padding-top-bottom" 
							:doneSupplements='receiptContent.done.supplement'
							:submitReceiptSupplements.sync="submitReceipt.supplements"></About>
						<!-- 收货人信息 -->
						<Pay class="border-top padding-top-bottom" 
							:receiptContent='receiptContent'
							:submitReceipt="submitReceipt"
						></Pay>
						<!-- 提交订单 -->
						<div style="height:103px">
							<div class=" border-top padding-top-bottom text-center">
								<el-button type="primary" @click="onSubmit">无忧发单</el-button>
							    <el-button id='save'  class="fixed-btn" :class="{fixed: fixed}"@click="saveDraft">保存草稿</el-button>						   
							</div>
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
import Banks from "../banks"
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
	name: "wuyou",
	components: { Sheet, ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About, Banks},
	data () {
		return {
			fixed: true,
		   	receiptContent:{},
		   	submitReceipt: {},
		}
	},
	computed:{
		...mapGetters([
		 'getReceiptContent',
		 'getSubmitReceipt',
		 'getPopup',
		 'getShowBanks',
		 'getDraft'
		])
	},
	beforeCreate(){
    	this.BeforeReceipt().then( (res)=>{
	        if(res.data.status ==200){		            
	          }else {
	          	this.switchPupop()
	            this.$router.push('/')
	        }
	 })	    
	},
  created(){
	this.receiptContent = this.objStringfy( this.getReceiptContent)
	this.submitReceipt = this.objStringfy( this.getSubmitReceipt)
	this.$set(this.submitReceipt, 'type', 2)
	this.getReceipt()
	this.getpayfront()
  }, 
  mounted(){
  	this.fadan('wuyou')
	this.fixed = this.windowSize()
	},   
	// watch:{
	// 	submitReceipt:{
	// 		handler(curVal, oldVal){
	// 			this.setDraft('wuyou')
	// 			console.log('current draft >>', curVal)
	// 　　　　},
	// 		deep: true
	// 	}
	// },
	methods:{
		...mapMutations(['clearCustomer','setIndentBlock','switchPupop','closeBanks','setDraft']),
		getReceipt(){
			let args = {
				type: 2,
				order_id : this.$route.query.order_id
			}
			this.ReceiptIndex(args).then((res)=>{
				// console.log('Receipt/Index' ,res)
			    if(res.data.status == 200){
			    	this.receiptContent = res.data.content
			    	if(!Array.isArray( this.receiptContent.done )){
			    		this.submitReceipt.order_id= this.receiptContent.done.details.order_id
			    	}
			    }         
			})
		},
	    onSubmit(){	    	
	    	this.submitReceiptFn(this.submitReceipt)
	    },
	    getpayfront(){
		    this.Payfront("money").then( (res)=>{
		        if(res.data.status == 200){
		        	this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
		        }
			})
	    },    
	    submitReceiptFn(args){
	    	//--------------------------------------------------------------------------------------------------------------
	    	if( this.verfy() ){
		    this.SubmitReceipt(args).then((res)=>{
				if(res.data.status == 200){
					this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
					this.$set(this.receiptContent, 'order_id', res.data.content.order_id )
					this.closeBanks(true)
			    }else{
			        this.openMessage({str: res.data.msg, ele:this})
			    }
		    })
			}
	    },
	    saveDraft(){
	    	if( this.verfy() ){
	    	let args = this.submitReceipt
		    this.SubmitDraft(args).then((res)=>{
		    	// console.log('save Draft',res)
				if(res.data.status == 200){
					// this.openMessage({str: res.data.msg, ele:this})
					this.$router.push('/indent')
			    }else{
			        this.openMessage({str: res.data.msg, ele:this})
			    }
		    })
			}
	    },
	    verfy(){
	    	let flag= true
	    	if(!this.submitReceipt.quality_requirement){
	    		this.openMessage({str: '请选择你的品质要求', ele:this})
	    		flag= false
	    	}
	    	if(!this.submitReceipt.check_id){
	    		this.openMessage({str: '请选择你的查货模式', ele:this})
	    		flag= false
	    	}
	    	if(!this.submitReceipt.error_id){
	    		this.openMessage({str: '请选择你的误差标准', ele:this})
	    		flag= false
	    	}
	    	this.submitReceipt.fabric.forEach((item, index)=>{
	    		if(!item.name){
	    			this.openMessage({str: "请填写面料" + String.fromCharCode( index+65 )+"的名称", ele:this})
	    			flag= false
	    		}
	    		if(!item.picture.length){
	    			this.openMessage({str: "请上传面料" + String.fromCharCode( index+65 )+"的图片", ele:this})
	    			flag= false
	    		}
	    	})
	    	
	    	return flag
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