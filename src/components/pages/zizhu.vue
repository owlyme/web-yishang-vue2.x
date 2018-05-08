<template>
<div>	
	<div class="container bg-white" id='zizhu' >
		<!-- 加工单编辑 -->
		<h3 class="text-center padding-top-bottom">加工单编辑</h3>
		<el-form ref="form" label-width="25%"  >		
			<Sheet 
				:receiptContent='receiptContent'
				:submitReceipt="submitReceipt"
				></Sheet>
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
				<div class=" border-top padding-top-bottom text-center"	>
				<el-button type="primary" @click="onSubmit">自主发单</el-button>
			    <el-button id='save' class="fixed-btn" :class="{fixed: fixed}" @click="saveDraft">保存草稿</el-button>
				</div>
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
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
	name: "zizhu",
	components: { Sheet, ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About},
	data () {
		let self = this
		return {
			fixed: true,
		   	receiptContent:{},
		   	submitReceipt: {}
		}
	},
	computed:{
	  ...mapGetters([
	     'getReceiptContent',
	     'getSubmitReceipt',
	     'getPopup',
	     'getDraft'
	  ])      
	},
	beforeCreate(){
		console.log("beforeCreate")
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
		this.$set(this.submitReceipt, 'type', 1)
		this.getReceipt()
	},
	mounted(){
		// this.fadan('zizhu')
		this.windowSize()		
	},
	methods:{
		...mapMutations(['clearCustomer','setIndentBlock','switchPupop','setDraft']),
		getReceipt(){
			let args = {
				type: 1,
				order_id : this.$route.query.order_id
			}
			this.ReceiptIndex(args).then( (res)=>{
				// console.log(res)
			    if(res.data.status == 200){
			    	this.receiptContent = res.data.content
			    	if(!Array.isArray( this.receiptContent.done )){
			    		this.submitReceipt.order_id= this.receiptContent.done.details.order_id
			    	}
			    }
			})
		},
	    onSubmit(){	   	
	    	this.submitReceiptFn(this.submitReceipt);
	    },
	    submitReceiptFn(args){
	    	if( this.verfy() ){
			    this.SubmitReceipt(args).then((res)=>{
			       if(res.data.status == 200){
			        	this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
			        	this.$router.push("/indent")
			        }else{
			        	this.openMessage({str: res.data.msg, ele:this})
			        }
			    }) 
			}
	    },
	    saveDraft(){
	    	
			    this.SubmitDraft( this.submitReceipt ).then((res)=>{
			    	// console.log('save Draft>>',res)
			    	// console.log( res.data.status)
					if(res.data.status == 200){
						this.$router.push("/indent")
				    }else{
				        this.openMessage({str: res.data.msg, ele:this})
				    }
			    })
		    
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