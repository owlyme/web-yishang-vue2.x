<template>
	<div >
		<div v-if="receiptContent.order_id" id="banks" class=" padding-top-bottom color border-top">			
			<div class="container " >		
				<Banks 
				:submitReceipt="submitReceipt" 
				:receiptContent="receiptContent" ></Banks>
			</div>
		</div>
		<div v-else>
			<div  id="wuyou">
				<div class="container bg-white">
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
							:receiptContent='receiptContent'
							:submitReceipt="submitReceipt"
						></Fabric>
						<!-- 其他要求1 -->
						<About class="padding-left-right border-top padding-top-bottom" 
							:receiptContent='receiptContent'
							:submitReceipt="submitReceipt"></About>
						<!-- 收货人信息 -->
						<Pay class="border-top padding-top-bottom" 
							:receiptContent='receiptContent'
							:submitReceipt="submitReceipt"
						></Pay>
						<!-- 提交订单 -->
						<div class="padding-left-right border-top padding-top-bottom text-center">
							<el-button type="primary" @click="onSubmit">无忧发单</el-button>
						    <el-button @click="saveDraft">保存草稿</el-button>
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
import Banks from "../banks"
import qs from 'qs';
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'


export default {
	name: "zizhu",
	components: { Sheet, ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About, Banks},
	data () {
		return {
			msg: '',			
			submitSuccess: true,
		   	receiptContent:{order_id:null},
		   	submitReceipt: {
				type: 2,
				cate_name: null,
				name: null,
				style_name: null,
				mode_name: null,
				size: [{
					color:null,
					xs_demanding_account    : 0,
					s_demanding_account     : 0,
					m_demanding_account     : 0,
					l_demanding_account     : 0,
					xl_demanding_account    : 0,
					xxl_demanding_account   : 0,
					xxxl_demanding_account  : 0,
					xxxxl_demanding_account : 0
					}],
				demanding_account: null,
				fee: null,
				total_fee: null,
				expire_time: null,
				arrival_date: null,
				delivery_date: null,
				front_picture: null,
				back_picture: 'Uploads/Images/2018-01-09/6fa119c9708ba49ba3e70275957eeac3.jpg',
				left_picture: null,
				right_picture: null,
				part_picture: [],
				other_picture: null,
				check: null,
				error: null,
				supplement: null,
				requirement: null,
				picture: [],
				fabric: [{
	                name: '',
	                component: '',
	                grammage:'',
	                width:'',  
	                units: '', 
	                weight:'',
	                picture:[],
	                is_main: 0
	              }],
				supplements: [
					{
						requirement : null,
						picture: null
					}					
				],
				is_deposited: 1,
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
    this.axios.post(url+'/Receipt/Index?type=2').then((res)=>{
        if(res.data.status == 200){
        	this.receiptContent = res.data.content
        }    
    })
    this.getpayfront();    
  },
  watch:{
		submitReceipt:{
			handler(curVal, oldVal){					
				console.log(curVal)
	　　　　},
			deep: true
		}
	},
	methods:{	
	    onSubmit(){
	    	this.getQuality()
	    	this.submitReceiptFn(this.submitReceipt)
	    },
	    getpayfront(){
	    	let url = this.getUrl    		
		    this.axios.post(url+'/Receipt/payfront?money').then((res)=>{
		        if(res.data.status == 200){
		        	this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
		        }        
		    }) 
	    },    
	    submitReceiptFn(args){
	    	let url = this.getUrl
		    this.axios.post(url+'/Receipt/submitReceipt',qs.stringify(args)).then((res)=>{
				if(res.data.status == 200){
		        	this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
		        	this.$set(this.receiptContent, 'order_id', res.data.content.order_id )
			    }else{
			        this.openMessage({str: res.data.msg, ele:this})
			    }
		    })
	    },
	    saveDraft(){
	    	let url = this.getUrl
	    	let args = this.submitReceipt
		    this.axios.post(url+'Receipt/submitDraft',qs.stringify(args)).then((res)=>{
				if(res.data.status == 200){
		        	this.openMessage({str: res.data.msg, ele:this})	        	
			    }else{
			        this.openMessage({str: res.data.msg, ele:this})
			    }
		    })
	    },   
	    getQuality(){
	    	let self = this;
			let _supplement = []
			this.submitReceipt.supplement.forEach((item, index)=> {
				if( item.name || item.err){	
					_supplement.push(item)
				}
			})
			self.$set(self.submitReceipt,'supplement' , _supplement)
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