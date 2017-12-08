<template>
	<div class="pay">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="16.667%" class="demo-ruleForm">
		<el-form-item label="是否支付定金" prop="resource">
		    <el-radio-group v-model="ruleForm.resource">
		      <el-radio label="是"></el-radio>
		      <el-radio label="否"></el-radio>
		    </el-radio-group>
		</el-form-item>
		<el-form-item label="确认收货地址" prop="resource">
		    <el-radio-group v-model="ruleForm.resource">
		      <el-radio label="是速度发斯蒂芬发斯蒂芬士大夫撒反对"></el-radio>
		      <br>
		      <el-radio label="是速度发斯蒂芬发斯蒂芬士大夫"></el-radio>
		    </el-radio-group>
		</el-form-item>
		<h6>添加新地址</h6>
		<div class='newAddr'>
			<el-form-item label="姓名" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="手机" prop="name">
			    <el-input v-model="ruleForm.mobile"></el-input>
			  </el-form-item>
			  <el-form-item label="详细地址" prop="desc">
			  <China></China>
			  </el-form-item>
			  <el-form-item label="详细地址" prop="desc">
			    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
			  </el-form-item>
		</div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
		  <el-form-item label="审批人">
		    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
		  </el-form-item>
		  <el-form-item label="活动区域">
		    <el-select v-model="formInline.region" placeholder="活动区域">
		      <el-option label="区域一" value="shanghai"></el-option>
		      <el-option label="区域二" value="beijing"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">查询</el-button>
		  </el-form-item>
		</el-form>

		  <el-form-item>
		  	<el-button @click="resetForm('ruleForm')">取消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
		    
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
import China from "./address/china.vue"
	export default{
		name: "pay",
		components:{ China},
		data(){
			return{
				formInline: {
          user: '',
          region: ''
        },
				ruleForm: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        rules: {
		          name: [
		            { required: true, message: '请输入活动名称', trigger: 'blur' },
		            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		          ],
		          region: [
		            { required: true, message: '请选择活动区域', trigger: 'change' }
		          ],
		          date1: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		          date2: [
		            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
		          ],
		          type: [
		            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
		          ],
		          resource: [
		            { required: true, message: '请选择活动资源', trigger: 'change' }
		          ],
		          desc: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ]
		        },
			}
		},
		methods:{
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		     },
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
		    onSubmit() {
		        console.log('submit!');
		    }
		}
	}
</script>
<style scoped>
.pay{
	border: 1px solid #777;
}
</style>
