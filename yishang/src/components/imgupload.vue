<template>
	<div class="uploadimg">
		<div >
			<h5>样衣照片</h5>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="6" class="text-right text-style-sm">
			  	{{ uploadImgs[0].name }}
			  </el-col>	
			  <el-col :span="14">
			  		<el-upload
				        :action="getUploadUrl"
				        list-type="picture-card"
				        :on-success="uploadImgeSuccess0"				        
				        :on-remove="handleRemove0">
				        <span class="remind">点击上传</span>
				      </el-upload>
				      <el-dialog :visible.sync="uploadImgs[0].dialogVisible" size="tiny">
				        <img width="100%" :src="uploadImgs[0].dialogImageUrl" alt="">
				      </el-dialog>
			  </el-col>	    			  
			</el-row>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="6" class="text-right text-style-sm">
			  	{{ uploadImgs[1].name }}
			  </el-col>	
			  <el-col :span="14">
			  		<el-upload
				        :action="getUploadUrl"
				        list-type="picture-card"
				        :on-success="uploadImgeSuccess1"				        
				        :on-remove="handleRemove1">
				        <span class="remind">点击上传</span>
				      </el-upload>
				      <el-dialog :visible.sync="uploadImgs[1].dialogVisible" size="tiny">
				        <img width="100%" :src="uploadImgs[1].dialogImageUrl" alt="">
				      </el-dialog>
			  </el-col>	    			  
			</el-row>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="6" class="text-right text-style-sm">
			  	{{ uploadImgs[2].name }}
			  </el-col>	
			  <el-col :span="14">
			  		<el-upload
				        :action="getUploadUrl"
				        list-type="picture-card"
				        :on-success="uploadImgeSuccess2"				        
				        :on-remove="handleRemove2">
				        <span class="remind">点击上传</span>
				      </el-upload>
				      <el-dialog :visible.sync="uploadImgs[2].dialogVisible" size="tiny">
				        <img width="100%" :src="uploadImgs[2].dialogImageUrl" alt="">
				      </el-dialog>
			  </el-col>	    			  
			</el-row>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="6" class="text-right text-style-sm">
			  	{{ uploadImgs[3].name }}
			  </el-col>	
			  <el-col :span="14">
			  		<el-upload
				        :action="getUploadUrl"
				        list-type="picture-card"
				        :on-success="uploadImgeSuccess3"				        
				        :on-remove="handleRemove3">
				        <span class="remind">点击上传</span>
				      </el-upload>
				      <el-dialog :visible.sync="uploadImgs[3].dialogVisible" size="tiny">
				        <img width="100%" :src="uploadImgs[3].dialogImageUrl" alt="">
				      </el-dialog>
			  </el-col>	    			  
			</el-row>
			<el-row :gutter="10"  class="space" >		 
			  <el-col :span="6" class="text-right text-style-sm">
			  	{{ uploadImgs[4].name }}
			  </el-col>	
			  <el-col :span="14">
			  		<el-upload
				        :action="getUploadUrl"
				        list-type="picture-card"
				        :on-success="uploadImgeSuccess4"				        
				        :on-remove="handleRemove4">
				        <span class="remind">点击上传</span>
				      </el-upload>
				      <el-dialog :visible.sync="uploadImgs[4].dialogVisible" size="tiny">
				        <img width="100%" :src="uploadImgs[4].dialogImageUrl" alt="">
				      </el-dialog>
			  </el-col>	    			  
			</el-row>
		</div>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

	export	default{
		name: 'imageuplaod',
		data(){
			return{
				uploadImgs:[
					{
						name:'正面全览照',
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrls:[],
					},
					{
						name:'背面全览照',
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrls:[],
					},
					{
						name:'左侧面全览照',
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrls:[],
					},
					{
						name:'右侧面全览照',
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrls:[],
					},
					{
						name:'局部细节图',
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrls:[],
					},
				]
			}
		},
		watch:{
			uploadImgs:{
				handler(curVal,oldVal){
		　　　　　　　　//console.log(curVal)
						this.$emit("setClothePic",curVal)
		　　　　　　},
			　　　　deep:true
				}
		},
		computed:{
	      ...mapGetters([
	          'getUploadUrl'
	        ]),
	    },
		methods:{			
			handleRemove0(file, fileListS) {
		        let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[0].imgUrls = imgs.slice(0, imgs.length)
		    },
		    handleRemove1(file, fileListS) {
		        let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[1].imgUrls = imgs.slice(0, imgs.length)
		    },
		    handleRemove2(file, fileListS) {
		        let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[2].imgUrls = imgs.slice(0, imgs.length)
		    },
		    handleRemove3(file, fileListS) {
		        let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[3].imgUrls = imgs.slice(0, imgs.length)
		    },
		    handleRemove4(file, fileListS) {
		        let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[4].imgUrls = imgs.slice(0, imgs.length)
		    },
		    uploadImgeSuccess0(response, file, fileList){
		    	// console.log(response)
		    	// console.log(file)
		    	// console.log( fileList)
		    	//this.form.imageUrl = response.content.url
		    	let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[0].imgUrls = imgs.slice(0, imgs.length)
		    },
		    uploadImgeSuccess1(response, file, fileList){
		    	let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[1].imgUrls = imgs.slice(0, imgs.length)
		    },
		    uploadImgeSuccess2(response, file, fileList){
		    	let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[2].imgUrls = imgs.slice(0, imgs.length)
		    },
		    uploadImgeSuccess3(response, file, fileList){
		    	let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[3].imgUrls = imgs.slice(0, imgs.length)
		    },
		    uploadImgeSuccess4(response, file, fileList){
		    	let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgs[4].imgUrls = imgs.slice(0, imgs.length)
		    },

		}
	}
</script>
<style scoped>
.uploadimg{

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
	line-height: 145px;
  }
  .space{
  	margin-bottom:15px;
  }
</style>