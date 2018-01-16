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
				:receiptContent='receiptContent'
				:submitReceipt="submitReceipt"

		
				:submitReceiptFabric.sync = 'submitReceipt.fabric'
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
			<div class=" border-top padding-top-bottom text-center">
				<el-button type="primary" @click="onSubmit">自主发单</el-button>
			    <el-button @click="saveDraft">保存草稿</el-button>
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

export default {
	name: "zizhu",
	components: { Sheet, ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About},
	data () {
		let self = this
		return {
			msg: '',
			passBefore: false,
		   	receiptContent:{
		   		address: []
		   	},
		   	submitReceipt: {
				type: 1,
				cate_id: null,
				name: null,
				style_id: null,
				mode_id: null,
				size: [],
				demanding_account: 0,
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
				check_id: null,
				error_id: null,
				quality_requirement: null,
				requirement: null,
				picture: null,
				size_table:null,
				process_list: null,
				fabric: [],
				supplements: [],
				is_deposited: "1",
				receiver: null,
				phone: null,
				province: null,
				city: null,
				county: null,
				street: null,
				address_id: null
		   	}
		}
	},
	computed:{
	  ...mapGetters([
	     'getUrl',
	      'getUploadUrl'
	  ])      
	},  
	mounted(){
		// setTimeout( ()=>{
		// 	this.list =[this.getUploadUrl + '/Uploads/Images/2018-01-15/1870ce5610ea93610c1f5d9dad90c071.jpg',this.getUploadUrl + '/Uploads/Images/2018-01-15/1870ce5610ea93610c1f5d9dad90c071.jpg',this.getUploadUrl + '/Uploads/Images/2018-01-15/1870ce5610ea93610c1f5d9dad90c071.jpg' ]
		// },5000)
		this.getReceipt()
	},
	watch:{
		submitReceipt:{
			handler(curVal, oldVal){					
				console.log('submitReceipt draft >>',curVal)
	　　　　},
			deep: true
		}
	},
	methods:{
		getReceipt(){
			console.log(this.$route.query.order_id)
			let url = this.getUrl
			let args = {
				type: 1,
				order_id : this.$route.query.order_id
			}
			this.axios.post(url+'/Receipt/Index',qs.stringify(args)).then((res)=>{
				console.log(res)
			    if(res.data.status == 200){
			    	this.receiptContent = res.data.content
			    	this.matchObj()
			    	console.log(this.submitReceipt)
			    }else{
			    	this.matchObj()
			    }          
			})
		},
	    onSubmit(){
	    	this.$set(this.submitReceipt, 'type', 1)
	    	this.submitReceiptFn(this.submitReceipt);
	    },	   
	    submitReceiptFn(args){
	    	let url = this.getUrl
		    this.axios.post(url+'/Receipt/submitReceipt',qs.stringify(args)).then((res)=>{
		       if(res.data.status == 200){
	        	this.$set(this.receiptContent, 'service_fee', res.data.content.service_fee )
	        	this.$router.push("/indent")
		        }else{
		        	this.openMessage({str: res.data.msg, ele:this})
		        }         
		    }) 
	    },
	    saveDraft(){
	    	let url = this.getUrl
	    	let args = this.submitReceipt
		    this.axios.post(url+'/Receipt/submitDraft',qs.stringify(args)).then((res)=>{
		    	console.log('save Draft>>',res)
		    	console.log( res.data.status)
				if(res.data.status == 200){
					this.$router.push("/indent")
			    }else{
			        this.openMessage({str: res.data.msg, ele:this})
			    }
		    })
	    },	  
	    matchObj(){
	    	if( !this.receiptContent.done || Array.isArray( this.receiptContent.done ) ){
	    		console.log('receiptContent false') 
	    		this.$set(this.submitReceipt,'size', [{
								color:null,
								xs_demanding_account    : 0,
								s_demanding_account     : 0,
								m_demanding_account     : 0,
								l_demanding_account     : 0,
								xl_demanding_account    : 0,
								xxl_demanding_account   : 0,
								xxxl_demanding_account  : 0,
								xxxxl_demanding_account : 0
							}])
	    		this.$set(this.submitReceipt,'fabric', [{
				                name: '',
				                component_id: '',
				                grammage:'',
				                width:'',  
				                units: '', 
				                weight:'',
				                picture:[],
				                is_main: 1
			              }])
	    		this.$set(this.submitReceipt,'supplements', [{
								requirement : null,
								picture: []
							}])
	    		this.$set(this.submitReceipt,'part_picture', [])
	    		this.$set(this.submitReceipt,'other_picture', [])
	    		this.$set(this.submitReceipt,'picture', [])
	    		this.$set(this.submitReceipt,'size_table', [])
	    		this.$set(this.submitReceipt,'process_list', [])
	    		this.$set(this.submitReceipt,'is_deposited', '1')
	    		this.$set(this.submitReceipt,'address_id', '0')
	    		
	    	}else{
	    		console.log('receiptContent sucess')  
		    	let done = this.receiptContent.done
		    	let details = done.details
		    	let quality = done.quality
		    	this.$set(this.submitReceipt,'type', details.type)
		    	this.$set(this.submitReceipt,'arrival_date', details.arrival_date)
		    	this.$set(this.submitReceipt,'back_picture', details.back_picture)	
		    	this.$set(this.submitReceipt,'cate_id', details.category_id)
		    	this.$set(this.submitReceipt,'delivery_date', details.delivery_date)
		    	this.$set(this.submitReceipt,'demanding_account', details.demanding_account)
		    	this.$set(this.submitReceipt,'expire_time', details.expire_time)
		    	this.$set(this.submitReceipt,'fee', details.fee)	    
		    	this.$set(this.submitReceipt,'front_picture', details.front_picture)
		    	this.$set(this.submitReceipt,'is_deposited', details.is_deposited)
		    	this.$set(this.submitReceipt,'left_picture', details.left_picture)
		    	this.$set(this.submitReceipt,'mode_id', details.mode_id)
		    	this.$set(this.submitReceipt,'name', details.name)
		    	this.$set(this.submitReceipt,'part_picture', details.part_picture)
		    	this.$set(this.submitReceipt,'right_picture', details.right_picture)
		    	this.$set(this.submitReceipt,'style_id', details.style_id)
		    	this.$set(this.submitReceipt,'total_fee', details.total_fee)
		    	this.$set(this.submitReceipt,'order_id', details.order_id)
		    	this.$set(this.submitReceipt,'other_picture', done.part)
		    	this.$set(this.submitReceipt,'fabric', done.fabric)
		    	this.$set(this.submitReceipt,'part', done.part)
		    	this.$set(this.submitReceipt,'size', done.size)
		    	this.$set(this.submitReceipt,'address_id', done.address_id)
		    	this.$set(this.submitReceipt,'check_id', quality.check_id)
		    	this.$set(this.submitReceipt,'error_id', quality.error_id)
		    	this.$set(this.submitReceipt,'requirement', quality.requirement)
		    	this.$set(this.submitReceipt,'quality_requirement', quality.quality_requirement)
		    	this.$set(this.submitReceipt,'picture', quality.picture)
		    	this.$set(this.submitReceipt,'size_table', quality.size_table)
		    	this.$set(this.submitReceipt,'process_list', quality.process_list)
		    	this.$set(this.submitReceipt,'supplements', done.supplement)
			   	console.log('macthed *****')
			   	console.log(this.submitReceipt)
			}	    	
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