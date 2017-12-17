<template>
	<div class="pay" >
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="16.667%" class="demo-ruleForm">
		<el-form-item label="是否支付定金:" v-if='zizhu'>
		    <el-radio-group v-model="ruleForm.cash" style="padding-top:8px">
		      <el-radio  :label="1">是</el-radio>
		      <el-radio  :label="0">否</el-radio>
		    </el-radio-group>
		</el-form-item>
		<el-form-item label="支付服务费用(订单的金额的10%):" v-else>
		    <el-radio-group v-model="ruleForm.per" style="padding-top:8px">
		      	<span class="color">{{3000}}</span> 元
		    </el-radio-group>
		</el-form-item>
		<el-form-item label="确认收货地址:" >
		    <el-radio-group v-model="ruleForm.address" >
		    	<div v-for="(item, index) in addressList">
		    		<el-radio :label="item" :key="'address'+ index" ></el-radio>
		    	</div>		     
		    </el-radio-group>
		</el-form-item>
		<h6>添加新地址</h6>
		<div class='newAddr'>
			<el-form-item label="姓名:" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="手机:" prop="mobile">
			    <el-input v-model="ruleForm.mobile"></el-input>
			  </el-form-item>
			  <el-form-item label="所在地区:" prop="region">
			  	<!-- cheng shi di dian  -->
			  <China v-on:setCity="getCity"></China>

			  </el-form-item>
			  <el-form-item label="详细地址:" prop="desc">
			    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
			  </el-form-item>
		</div>


		  <el-form-item class="text-right padding-top">
		  	<el-button @click="resetForm('ruleForm')">取消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
const address={
	receiver: null,
	phone: null,
	province: null,
	city: null,
	county: null,
	street: null,
	is_default: null
}

import China from "./address/china.vue"
import qs from 'qs';

import { mapGetters } from 'vuex'

	export default{
		name: "pay",
		components:{ China},
		props:['zizhu','addressList'],
		data(){
			return{				
				ruleForm: {
				  cash:1,
				  address: '',
		          name: '',
		          mobile: '',
		          city: "",
		          delivery: false,
		          desc: ''
		        },
		        newAddress:{
		        	receiver: null,
					phone: null,
					province: null,
					city: null,
					county: null,
					street: null,
					is_default: null
		        },
		       	// addressList:["rwerwerwer","qwerqwrwqerwqe"],
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
			}
		},
		mounted(){
			// console.log(this.zizhu)
			let self = this;
			//Slet receiver = { pay : 1, address: self.addressList}
			//this.$emit('setNewAddr', receiver)
		},		
		watch:{
			ruleForm:{
				handler(curVal,oldVal){
					let self = this;
					let receiver = { pay : self.ruleForm.cash, address: self.ruleForm.address}
					this.$emit('setNewAddr', receiver)
					// console.log(receiver)
		　　　　},
		　　　　deep:true
			}
		},
		computed:{
		      ...mapGetters([
		         'getUrl'
		      ]),
		  },
		methods:{
			submitForm(formName) {				
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            let address = this.ruleForm.city+this.ruleForm.desc+' ('+this.ruleForm.name+') '+this.ruleForm.mobile;
		            	this.addressList.push(address)		            	    
		            	this.addAddress()
		          } else {
		            // console.log('error submit!!');
		            return false;
		          }
		        });		           
		     },
		     addAddress(){
		     	this.newAddress.receiver= this.ruleForm.name
				this.newAddress.phone= this.ruleForm.mobile							
				this.newAddress.street= this.ruleForm.desc

		     	let url = this.getUrl+ '/Home/Address/addAddress';
		        let args = this.newAddress
			    this.axios.post(url, qs.stringify(args)).then((res)=>{
		        	console.log(res)
			        if(res.data.status == 200){
			        	//添加成功
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
		    	if( !bool){
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
		    	 // console.log("get addr:"+ val)	
		    	let self= this;
					self.$set(self.newAddress,'province', val.province.name)
					self.$set(self.newAddress,'city', val.city.name)
					self.$set(self.newAddress,'county', val.block.name)
		    		self.$set(self.ruleForm,'city', val)
		    },

		}
	}
</script>
<style scoped>
.pay{
	
}
.newAddr{
	border: 1px solid rgb(238,238,238);
	padding: 10px 40px;
}
.btns {

}
</style>
