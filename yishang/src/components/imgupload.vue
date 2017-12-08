<template>
	<div class="uploadimg">
			<h5>样衣照片</h5>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="4">
			  	正面全览照
			  </el-col>	
			  <el-col :span="16">
			  		<el-upload
						class="avatar-uploader"
						action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<span  v-else class="remind">点击上传</span>
					</el-upload>
			  </el-col>	    			  
			</el-row>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="4">
			  	背面全览照
			  </el-col>	
			  <el-col :span="16">
			  		<el-upload
						class="avatar-uploader"
						action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<span  v-else class="remind">点击上传</span>
					</el-upload>
			  </el-col>	    			  
			</el-row>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="4">
			  	左侧面全览照
			  </el-col>	
			  <el-col :span="16">
			  		<el-upload
						class="avatar-uploader"
						action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<span  v-else class="remind">点击上传</span>
					</el-upload>
			  </el-col>	    			  
			</el-row>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="4">
			  	右侧面全览照
			  </el-col>	
			  <el-col :span="16">
			  		<el-upload
						class="avatar-uploader"
						action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						 <span  v-else class="remind">点击上传</span>
					</el-upload>
			  </el-col>	    			  
			</el-row>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="4">
			  	局部细节图
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
		</div>
</template>
<script>
	export	default{
		name: 'imageuplaod',
		data(){
			return{
				imageUrl: '',
				dialogVisible: false,
				dialogImageUrl: false
			}
		},
		methods:{
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			 handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		    	this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    }
		}
	}
</script>
<style scoped>
.uploadimg{
	border-top: 1px solid #777;
}
	.avatar-uploader .el-upload {
	border: 1px solid #e0e0e0;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .remind{
  	font-size: 1.2em;
	color: #8c939d;
  }
  .space{
  	margin-bottom:15px;
  }
</style>