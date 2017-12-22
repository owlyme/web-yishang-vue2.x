<template>
	<div class="pay" >
		<el-form :model="selectAddress"  ref="selectAddress" label-width="30%" >
			<el-form-item label="是否支付定金:" v-if='zizhu'>
			    <el-radio-group v-model="selectAddress.is_deposited" style="padding-top:8px">
			      <el-radio  :label="1">是</el-radio>
			      <el-radio  :label="0">否</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item :label="percent" v-else  v-model="selectAddress.per">			
			    	 <span class="color size">{{ depositFee }}</span> 元			   
			</el-form-item>
			<el-form-item label="确认收货地址:" >
			    <el-radio-group v-model="selectAddress.address" >
			    	<div v-for="(item, index) in addressList">
			    		<el-radio :label="item" :key="'address'+ index" > 
			    			{{item.province + item.city  + item.county
						          + item.street  +' (' +item.receiver + ') '	+item.phone}}</el-radio>
			    	</div>		     
			    </el-radio-group>
			</el-form-item>
		</el-form>
		<h6 class="padding-left-right">添加新地址</h6>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="16.667%"  class="padding-left-right">
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
	</div>
</template>
<script>
import China from "./address/china.vue"
import qs from 'qs';
import { mapGetters } from 'vuex'
	export default{
		name: "pay",
		components:{ China},
		props:['zizhu','addressList',"deposit","totalFee"],
		data(){
			return{
				selectAddress: {
					is_deposited:1,
				  	address: null,
				  	per: '0'
				},
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
			}
		},
		mounted(){
			let self = this;
		},
		watch:{
			selectAddress:{
				handler(curVal,oldVal){
					if( this.addressList ){
						let receiver = {
							is_deposited : curVal.is_deposited,
							per :         curVal.per,
							province:  curVal.address.province,
							city :     curVal.address.city,
							county :   curVal.address.county,
							street:    curVal.address.street,
							name :     curVal.address.receiver,
							phone :    curVal.address.phone
						}
						this.$emit('setNewAddr', receiver)
					}
		　　　　},
		　　　　deep:true
			}
		},
		computed:{
		      ...mapGetters([
		         'getUrl'
		      ]),
		      depositFee(){		 
		      	return (this.deposit -0) * (this.totalFee || 0)
		      },
		      percent(){
		      	return '支付服务费用(订单的金额的'+ ((this.deposit-0) * 100) + '%):'
		      }
		  },
		methods:{
			submitForm(formName) {				
		        this.$refs[formName].validate((valid) => {
		          if (valid) {		
		            this.addAddress()
		          } else {
		            // console.log('error submit!!');
		            return false;
		          }
		        });		           
		     },
		     addAddress(){
		     	let url = this.getUrl+ '/Home/Address/addAddress';
		        let args = {
		        		receiver: this.ruleForm.name,
						phone: this.ruleForm.mobile,
						province: this.ruleForm.province,
						city: this.ruleForm.city,
						county: this.ruleForm.county,
						street: this.ruleForm.street,
						is_default: 1
			        }
			    this.axios.post(url, qs.stringify(args)).then((res)=>{
			    	console.log(res)
			        if(res.data.status == 200){
			        	//添加成功
			        	console.log(args)
			        	this.addressList.push(args)
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
		    	// console.log("get addr:"+ val)	
		    	let self= this;
					self.$set(self.ruleForm,'province', val.province.name)
					self.$set(self.ruleForm,'city', val.city.name)
					self.$set(self.ruleForm,'county', val.block.name)
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
