<template>
	<div>
		<div v-if="receiptContent.order_id" id="banks" class=" padding-top-bottom color border-top">	
			<div class="container">		
				<Banks 
				:serverfee="receiptContent.service_fee"
				:orderId="receiptContent.order_id" ></Banks>
			</div>
		</div>
		<div v-else>
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
						<div class="padding-left-right border-top padding-top-bottom text-center">
							<el-button type="primary" @click="onSubmit">无忧发单</el-button>
						    <el-button @click="saveDraft">保存草稿</el-button>
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
		   	receiptContent:{},
		   	submitReceipt: {},
		}
	},
	computed:{
	      ...mapGetters([
	         'getUploadUrl',
	         'getReceiptContent',
	         'getSubmitReceipt'
	      ])
	},
  created(){
	this.receiptContent = this.objStringfy( this.getReceiptContent)
	this.submitReceipt = this.objStringfy( this.getSubmitReceipt)
	this.getReceipt()
	this.getpayfront()
  }, 
  mounted(){
		var str = '{"category":[{"category_id":"1","category_name":"针织"},{"category_id":"2","category_name":"梭织"},{"category_id":"3","category_name":"毛呢"},{"category_id":"4","category_name":"牛仔"},{"category_id":"5","category_name":"皮革"},{"category_id":"6","category_name":"户外装"},{"category_id":"7","category_name":"无缝衫"},{"category_id":"8","category_name":"制服"},{"category_id":"9","category_name":"私人定制"},{"category_id":"10","category_name":"饰品"},{"category_id":"11","category_name":"其他"}],"mode":[{"mode_id":"2","mode_name":"前加工"},{"mode_id":"3","mode_name":"全加工"},{"mode_id":"4","mode_name":"后加工"}],"style":[{"style_id":"1","style_name":"T恤"},{"style_id":"2","style_name":"卫衣"},{"style_id":"3","style_name":"polo衫"},{"style_id":"4","style_name":"上衣"},{"style_id":"5","style_name":"裤子"},{"style_id":"6","style_name":"连衣裙"},{"style_id":"7","style_name":"短裙"},{"style_id":"8","style_name":"衬衫"},{"style_id":"9","style_name":"羽绒服"},{"style_id":"10","style_name":"羽绒裤"},{"style_id":"11","style_name":"棉服"},{"style_id":"12","style_name":"棉裤"},{"style_id":"13","style_name":"外套"},{"style_id":"14","style_name":"两件套"},{"style_id":"15","style_name":"三件套"},{"style_id":"16","style_name":"马甲"},{"style_id":"17","style_name":"打底衫"},{"style_id":"18","style_name":"打底裤"},{"style_id":"19","style_name":"旗袍"},{"style_id":"20","style_name":"婚纱"},{"style_id":"21","style_name":"单西"},{"style_id":"22","style_name":"披肩"},{"style_id":"23","style_name":"帽子"},{"style_id":"24","style_name":"袜子"},{"style_id":"25","style_name":"手套"},{"style_id":"26","style_name":"领带"},{"style_id":"27","style_name":"口罩"}],"check":[{"check_id":"1","check_name":"发单方自检"},{"check_id":"2","check_name":"第三方检查"},{"check_id":"3","check_name":"厂家自检"}],"error":[{"error_id":"1","error_value":"0.5cm"},{"error_id":"2","error_value":"1cm"},{"error_id":"3","error_value":"2cm"},{"error_id":"4","error_value":"3cm"},{"error_id":"5","error_value":"4cm"},{"error_id":"6","error_value":"5cm"}],"component":[{"component_id":"1","component_name":"麻"},{"component_id":"2","component_name":"桑蚕丝"},{"component_id":"3","component_name":"粘胶"},{"component_id":"4","component_name":"涤纶"},{"component_id":"5","component_name":"锦纶"},{"component_id":"6","component_name":"醋酯纤维"}],"address":[{"id":"53","receiver":"22","phone":"13156565656","province":"北京市","city":"市辖区","county":"东城区","street":"11"},{"id":"30","receiver":"寻菜","phone":"123456","province":"广东省","city":"深圳市","county":"宝安区","street":"龙华大浪街"},{"id":"31","receiver":"哈哈","phone":"18271632203","province":"浙江省","city":"杭州市","county":"江干区","street":"二号大街"},{"id":"47","receiver":"xy","phone":"13156521718","province":"浙江省","city":"杭州市","county":"上城区","street":"gongshu"},{"id":"52","receiver":"22","phone":"13156521718","province":"北京市","city":"市辖区","county":"东城区","street":"222"}],"deposit":0.1,"done":{"details":{"order_id":"113","uid":"20","name":"113","category":"针织","style":"T恤","mode":"后加工","demanding_account":"2","fee":"88.00","total_fee":"176.00","expire_time":"2018-01-15 14:09:37","arrival_date":"2018-01-23","delivery_date":"2018-01-31","front_picture":"http://101.132.187.244:8083/Uploads/Images/2018-01-14/97fbf32258ee81bec7cdb2fc2bf16aff.jpg","back_picture":"http://101.132.187.244:8083/Uploads/Images/2018-01-14/5425bc86ce3c835432992ef19f288916.jpg","left_picture":"http://101.132.187.244:8083/Uploads/Images/2018-01-14/d6d6f52ad2ae1075c6f1ac657968ebba.jpg","right_picture":"http://101.132.187.244:8083/Uploads/Images/2018-01-14/500883091fb4356ff6327d869f1497f3.jpg","part_picture":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/ae36b63d436fbbccf7cffcdabd3fb871.jpg"],"is_deposited":"1","type":"2","category_id":"1","style_id":"1","mode_id":"4"},"size":[{"color":"88","xs_demanding_account":1,"s_demanding_account":1,"m_demanding_account":0,"l_demanding_account":0,"xl_demanding_account":0,"xxl_demanding_account":0,"xxxl_demanding_account":0,"xxxxl_demanding_account":0,"total_demanding_account":"2"}],"part":[{"title":"","sub_picture":[]}],"quality":{"check":null,"error":null,"quality_requirement":"普通","size_table":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/9eb9bf184cdcc6d1c4aebafcc1329b55.jpg"],"process_list":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/05ac67d0280d64e1f4435918942e57f6.jpg"],"requirement":"777","picture":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/2e5f00e2657e0b0d34312caa760045ec.jpg"],"check_id":"1","error_id":"1"},"fabric":[{"name":"111","component":"麻","grammage":"11","width":"11","units":"厘米","weight":"11","picture":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/e28546f1e792e4541faad70161b7ee5e.jpg"],"is_main":"1","component_id":"1"}],"supplement":[{"requirement":"444","picture":["http://101.132.187.244:8083/Uploads/Images/2018-01-14/bae0ffe9e4f2cbfb1fe8430a3ce5f5a4.jpg"]}],"address_id":"53"},"service_fee":0}'
		var obj = JSON.parse(str)
		setTimeout( ()=>{
			this.receiptContent =  obj
		},2000)		
	},   
  watch:{
		submitReceipt:{
			handler(curVal, oldVal){					
				console.log('current draft >>',curVal)
	　　　　},
			deep: true
		}
  },
	methods:{
		getReceipt(){
			let args = {
				type: 2,
				order_id : this.$route.query.order_id
			}
			this.ReceiptIndex(args).then((res)=>{
				console.log('Receipt/Index' ,res)
			    if(res.data.status == 200){
			    	this.receiptContent = res.data.content
			    }         
			})
		},
	    onSubmit(){
	    	this.$set(this.submitReceipt, 'type', 2)
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
	    	//----------------------------------------------------------------------------------------------------------------
	    	this.$set(this.receiptContent, 'order_id',111 )
		    this.SubmitReceipt(args).then((res)=>{
				if(res.data.status == 200){
		        	this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
		        	this.$set(this.receiptContent, 'order_id', res.data.content.order_id )
			    }else{
			        this.openMessage({str: res.data.msg, ele:this})
			    }
		    })
	    },
	    saveDraft(){
	    	let args = this.submitReceipt
		    thisSubmitDraft(args).then((res)=>{
		    	console.log('save Draft',res)
		    	console.log( res.data.status)
				if(res.data.status == 200){
					// this.openMessage({str: res.data.msg, ele:this})
					this.$router.push('/indent')
			    }else{
			        this.openMessage({str: res.data.msg, ele:this})
			    }
		    })
	    },   
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