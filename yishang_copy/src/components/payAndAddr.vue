<template>
	<div class="pay" >
		<el-form  ref="selectAddress" label-width="30%" >
			<el-form-item label="是否支付定金:" v-if='submitReceipt.type == 1'>
			    <el-radio-group v-model="computedDeposited" style="padding-top:8px">
			    	<el-radio label="1">是</el-radio>
					<el-radio label="0">否</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item :label="percent" v-else  >
			    	<span class="color size">{{ depositFee }}</span> 元	
			</el-form-item>
			<el-form-item label="确认收货地址:" >
			    <el-radio-group v-model="computedId">
			    	<transition-group tag='div' name="el-fade-in">
			    	<div v-for="(item, index) in computedList" :key="index">			    		
			    		<el-radio :label="item.id" :key="'address'+ index" > 
			    			{{item.province + item.city  + item.county + item.street  + ' (' +item.receiver + ') ' +item.phone}} </el-radio>			    		
			    	</div>
			    	</transition-group>
			    </el-radio-group>
			</el-form-item>
		</el-form>
		<h6 class="padding-left-right" >
			<el-button @click.native="emptyAddressList = !emptyAddressList" >添加新地址</el-button>
		</h6>
		<transition name="el-zoom-in-top">
		<el-form 
		v-if="emptyAddressList"
		:model="ruleForm" 
		:rules="rules" 
		ref="ruleForm" 
		label-width="16.667%"  
		class="padding-left-right">
			<div class='newAddr'>
				<el-form-item label="姓名:" prop="name">
				    <el-input v-model="ruleForm.name" placeholder="请输入您的名字"></el-input>
				  </el-form-item>
				  <el-form-item label="手机:" prop="mobile">
				    <el-input v-model="ruleForm.mobile" placeholder="请输入您的手机号"></el-input>
				  </el-form-item>
				  <el-form-item label="所在地区:" prop="region">
				  	<!-- cheng shi di dian  -->
				  	<China v-on:setCity="getCity"></China>
				  </el-form-item>
				  <el-form-item label="详细地址:" prop="street">
				    <el-input type="textarea" v-model="ruleForm.street" placeholder="请填写您的详细地址"></el-input>
				  </el-form-item>
			</div>
			<el-form-item class="text-right padding-top">
			  	<el-button @click="resetForm('ruleForm')">取消</el-button>
			    <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
			</el-form-item>
		</el-form>
		</transition>
	</div>
</template>
<script>
import China from "./address/china.vue"
	export default{
		name: "pay",
		components:{ China},
		props:['receiptContent','submitReceipt'],
		data(){
			return{
				emptyAddressList:false,
				ruleForm: {	
				  address: '',
		          name: '',
		          mobile: '',
		          delivery: false,
		          province: null,
				  city: null,
				  county: null,
				  street: null,
				  is_default: null
		        },
		        rules: {
		          name: [
		            { required: true, message: '请输入收货人姓名', trigger: 'blur' },
		            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
		          ],
		          mobile: [
		            { required: true, message: '请输入手机号码', trigger: 'blur' },
		            { min: 11, max:11, message: '长度在11个字符', trigger: 'blur' }
		          ],
		          desc: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ]
		        },
		        is_deposited: null,
		        addressList:[],
		        address_id: null
			}
		},
		watch:{
			address_id:{
				handler(curVal,oldVal){	
					this.computedList.forEach((item, index)=>{
						if(curVal == item.id){
							this.$set(this.submitReceipt,'phone',item.phone)
							this.$set(this.submitReceipt,'province',item.province)
							this.$set(this.submitReceipt,'city',item.city)
							this.$set(this.submitReceipt,'county',item.county)
							this.$set(this.submitReceipt,'street',item.street)
							this.$set(this.submitReceipt,'receiver',item.receiver)
						}
					})
				},
				deep:true
			},
			is_deposited:{
				handler(curVal,oldVal){	
					this.submitReceipt.is_deposited= curVal
				},
				deep:true
			}
		},		
		computed:{
	      depositFee(){
	      	return (( this.receiptContent.deposit -0 ) * (this.submitReceipt.total_fee || 0)).toFixed(2)
	      },
	      percent(){
	      	return '支付服务费用(订单的金额的'+ ((this.receiptContent.deposit-0) * 100) + '%):'
	      },
	      computedList(){
	      	if(  Array.isArray( this.receiptContent.address ) && !this.addressList.length ){
	      		this.emptyAddressList = !this.emptyAddressList
		        this.addressList = this.receiptContent.address
		    }
		    return this.addressList
	      },
	      computedId:{
			    get: function () {
			       if( !Array.isArray( this.receiptContent.done ) && !this.address_id ){
				       this.address_id = this.receiptContent.done.address_id
				    }
				    return this.address_id
			    },
			    set: function (v) {
			       this.address_id = v
			    }
	      },
	      computedDeposited:{
	      		get: function () {
			        if( !Array.isArray( this.receiptContent.done ) && !this.is_deposited ){
			        	this.is_deposited = this.receiptContent.done.details.is_deposited
				    }
				    return this.is_deposited
			    },
			    set: function (v) {
			       this.is_deposited = v
			    }
	      }
		},
		methods:{
			submitForm(formName) {				
		        this.$refs[formName].validate((valid) => {
		          if (valid) {		
		            this.addAddress(formName)
		          } else {
		            return false;
		          }
		        });
		     },
		    addAddress(formName){
		        let args = {
		        		receiver: this.ruleForm.name,
						phone: this.ruleForm.mobile,
						province: this.ruleForm.province,
						city: this.ruleForm.city,
						county: this.ruleForm.county,
						street: this.ruleForm.street,
						id: Date.now()
			        }
			    this.AddAddress(args).then((res)=>{
			    	// console.log(res)
			        if(res.data.status == 200){
			        	//添加成功
			        	this.addressList.push(args)
			        	this.resetForm(formName)
			        	this.openMessage( res.data.msg )
			        }else{
			        	this.openMessage( res.data.msg, true)
			        }
			    }) 		      
		     },
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
		    openMessage(str,bool) {
		    	let html='';
		    	if( !bool ){
		    		html = '<i style="color: green">'+str+'</i>';
		    	}else{
		    		html = '<i style="color: red">'+str+'</i>';
		    	}
		        this.$alert( html, {
		          dangerouslyUseHTMLString: true,
		          showClose: false
		        });
		    },
		    getCity(val){
				this.$set(this.ruleForm,'province', val.province.name)
				this.$set(this.ruleForm,'city', val.city.name)
				this.$set(this.ruleForm,'county', val.block.name)
		    },
		}
	}
</script>
<style scoped>
.newAddr{
	border: 1px solid rgb(238,238,238);
	padding: 10px 40px;
}
.btns {
}
</style>