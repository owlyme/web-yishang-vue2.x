<template>
<div>
	<div>{{now}} <span @click="change = !change"> change</span></div>
	<!-- <img :src="imageUrl" class="avatar"> -->
	<ul>
		<li v-for="(img, index) in computedImgList" key="index">			
			<img :src="img" class="avatar">
		</li>
	</ul>
	<el-upload
	  class="avatar-uploader"
	   multiple
	  :action="actionUrl"
	  :show-file-list="false"
	  :on-success="handleAvatarSuccess"
	  :before-upload="beforeAvatarUpload">		
	  <i  class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
</div>

</template>
<script>

import { mapGetters } from 'vuex'
	export	default{
		name: 'test',
		props: {
		    getImgList: {
		      type: Object,
		      default: function () {
		        return { message: 'hello' }
		      }
		    },
		    returnImgList: {
		    	type: Array,
		      validator: function (value) {
		        return []
		      }
		    }		    
		},
		data(){
			return{
				now: Date.now(),
				change: false,
				imageUrl: '',
				imgList: []
			}
		},
		computed:{
			...mapGetters([
			  'getUploadUrl'
			]),
			actionUrl(){
				return this.getUploadUrl +'picture/upload'
			},
			computedImgList(){
				return this.imgList
			},
			
	    },
	    wacth:{
	    	now:{
	    		
	    	}
	    }
	    methods:{
		   	handleAvatarSuccess(res, file) {
		   		console.log(file)
		        this.imgList.push(this.getUploadUrl+file.response.content.url)
		        
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
			deleteImg(index){
				this.computedImgList.slice(index,1)
			}

	    }

	}
</script>
<style scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
</style>
