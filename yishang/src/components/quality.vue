<template>
	<div class="quality">
		<h5>品质要求</h5>
		<el-form-item label="查获选择" >
		    <el-select v-model="form.region" placeholder="请选择你的查货模式" style="width:100%">
		      <el-option label="针织" value="zhengzhi"></el-option>
		      <el-option label="梭织" value="suozhi"></el-option>
		      <el-option label="毛衫" value="maoshan"></el-option>
		      <el-option label="牛仔" value="liuzai"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="整体允许误差范围" >
		    <el-select v-model="form.region" placeholder="请选择你的误差标准" style="width:100%">
		      <el-option label="针织" value="zhengzhi"></el-option>
		      <el-option label="梭织" value="suozhi"></el-option>
		      <el-option label="毛衫" value="maoshan"></el-option>
		      <el-option label="牛仔" value="liuzai"></el-option>
		    </el-select>
		</el-form-item>
		<el-row :gutter="10" v-for="(item,index) in details">		 
		  <el-col :span="12">
		  	<el-form-item :label="'细节部位'+ (index+1)" label-width="33.33%">
			    <el-input v-model="form.user" placeholder="请输入细节部位"></el-input>
			</el-form-item>
		  </el-col>	
		  <el-col :span="12">
		  		<el-form-item :label="'误差标准范围'+ (index+1)" label-width="33.33%">
			    <el-input v-model="form.user" placeholder="请输入误差标准"></el-input>
			  </el-form-item>	
		  </el-col>
		</el-row>
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addDetail" class="circle-btn"></el-button>
		</div>
		<el-form-item label="信息要求">
		    <el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>

		<el-row :gutter="10"  class="space" >
		  <h6>版型图(若有版型图请上传)</h6>
	      <el-col :span="16" :offset="4">
	      <el-upload
	        action="https://jsonplaceholder.typicode.com/posts/"
	        list-type="picture-card"
	        :on-preview="handlePictureCardPreview"
	        :on-remove="handleRemove">
	        <span class="remind">点击上传</span>
	      </el-upload>
	      <el-dialog :visible.sync="dialogVisible" size="tiny">
	        <img width="100%" :src="dialogImageUrl" alt="">
	      </el-dialog>
	      </el-col>             
	    </el-row>
	</div>
</template>
<script>
	export default{
		name: "quality",
		data(){
			return{
				form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        details:[0]
			}
		},
		methods:{
			addDetail(){
				this.details.push(this.details.length)
			},
		}
	}
</script>
<style scoped>
.quality{
	border: 1px solid #777;
}
</style>
