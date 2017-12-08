<template>
	<div class="about">
		<h6>其他要求</h6>
		<el-row :gutter="10"  class="space" >		 
		  <el-col :span="4">
		  	上传说明图片:
		  </el-col>	
		  <el-col :span="16">
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
		<div v-for="item in requires">
			<el-form-item label="信息要求" >
			    <el-input type="textarea" v-model="form.desc" placeholder="请填写要求信息"></el-input>
			</el-form-item>
		</div>
		
		<div>
			<el-button type="primary" icon="el-icon-plus" @click="addRequire"></el-button>
		</div>
	</div>
</template>
<script>
	export default{
		name: "quality",
		data(){
			return{
				requires: [0],
				form: {
					desc: ""
				},
				dialogVisible: false,
				dialogImageUrl: false
			}
		},
		methods:{
			 handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		    	this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    addRequire(){
		    	this.requires.push(this.requires.length)
		    }
		}
	}
</script>
<style scoped>
.quality{
	border: 1px solid #777;
}
</style>
