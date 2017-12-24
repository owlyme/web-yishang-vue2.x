<template>
	<div>
		<h5>样衣照片</h5>
		<div class="uploadimg ">
			<el-row :gutter="10"  class="space " 
				v-for="(item, index) in uploadSingleImg" :key="'uploadSingleImg'+ index"	>		 
			  <el-col :span="6" class="text-right text-style-sm"> 	{{ item.name }}	  </el-col>	
			  <el-col :span="14" >
			  		<div  class="floatleft">
			  			<img :src="item.showSrc" class="show-demo1">
			  		</div>			  		
			  		<el-upload	
			  			class="floatleft"
			  					  			
			  			ref="imgSingle"
				        :action="actionUrl"
				        
				        list-type="picture-card"
				        :on-preview="(file) =>{ return  handlePictureCardPreviewSingle(file, index)}"
				        :on-success="(response, file, fileList) =>{ return  uploadImgeSuccessSingle(response, index)}"    
				        :on-remove="(file, fileList) =>{ return  handleRemoveSingle(file, index)}">

				        <span  slot="trigger" class="remind" >点击上传</span>
				       <!--  <el-button class="click-submit"	 @click="submitImg(index)">点击上传</el-button> -->
				      </el-upload>
				      <el-dialog :visible.sync="item.dialogVisible" size="tiny">
				        <img width="100%" :src="item.dialogImageUrl" alt="">
				      </el-dialog>
			  </el-col>	    			  
			</el-row>			
		</div>

		<div class="uploadimgs">
			<el-row :gutter="10"  class="space" v-for="(item, index) in uploadImgArr" :key="'uploadImgArr'+ index">		 
			  <el-col :span="6" class="text-right text-style-sm">
			  	{{ item.name }}
			  </el-col>	
			  <el-col :span="14">
			  		<div  class="floatleft" v-if="item.showSrc1">
			  			<img :src="item.showSrc1" class="show-demo1">
			  			<img :src="item.showSrc2" class="show-demo1">
			  		</div>	
			  		<el-upload
			  			ref="imgArr"
				        :action="actionUrl"
				        list-type="picture-card"
				        :on-preview="(file) =>{ return  handlePictureCardPreview(file, index)}"
				        :on-success="(response, file, fileList) =>{ return  uploadImgeSuccess(response, index)}"		        
				        :on-remove="(file, fileList) =>{ return  handleRemove(fileList, index)}">

				        <span  slot="trigger" class="remind" >点击上传</span>
				        <!-- <el-button class="click-submit"	 @click="submitImgArr(index)">点击上传</el-button> -->
				      </el-upload>
				      <el-dialog :visible.sync="item.dialogVisible" size="tiny">
				        <img width="100%" :src="item.dialogImageUrl" alt="">
				      </el-dialog>
			  </el-col>	    			  
			</el-row>
		</div>
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addImgArr" class="circle-btn"></el-button>
		</div>
	</div>

</template>
<script>

import { mapGetters } from 'vuex'

	export	default{
		name: 'imageuplaod',
		data(){
			return{
				ref: 'upload',
				imageUrl: '',
				uploadSingleImg:[
					{
						name:'正面全览照',
						showSrc: require('../assets/front-pic.jpg'),
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrl: ''						
					},
					{
						name:'背面全览照',
						showSrc: require('../assets/back-pic.jpg'),
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrl: ''
					},
					{
						name:'左侧面全览照',
						showSrc: require('../assets/left-pic.jpg'),
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrl: ''
					},
					{
						name:'右侧面全览照',
						showSrc: require('../assets/right-pic.jpg'),
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrl: ''
					}		
				],
				uploadImgArr:[
					{
						name:'局部细节图',
						showSrc1: require('../assets/part1-pic.jpg'),
						showSrc2: require('../assets/part2-pic.jpg'),
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrls:[],
					},
				],
				pictures:{
					front_picture: '',
					back_picture:'',
					left_picture:'',
					right_picture:'', 
					part_picture:[],
					other_picture:[]
				}
			}
		},
		watch:{
			uploadSingleImg:{
				handler(curVal,oldVal){									
					this.pictures.front_picture = curVal[0].imgUrl
					this.pictures.back_picture =  curVal[1].imgUrl
					this.pictures.left_picture =  curVal[2].imgUrl
					this.pictures.right_picture = curVal[3].imgUrl
				},
				deep:true
			},
			uploadImgArr:{
				handler(curVal,oldVal){
					this.pictures.part_picture = curVal[0].imgUrls
					let otherImgs = []
					curVal.forEach((item, index)=>{						
						if (index >0 ) {
							otherImgs[index -1] = {title: item.title, sub_picture: item.imgUrls }
						}
					})
					this.pictures.other_picture = otherImgs
				},
				deep:true
			},			
			pictures:{
				handler(curVal,oldVal){
					this.$emit("setClothePic",curVal)
				},
				deep:true
			}
		},
		computed:{
	      ...mapGetters([
	          'getUploadUrl'
	        ]),
	      actionUrl(){
	      	return this.getUploadUrl +'/picture/upload'
	      }
	    },
		methods:{
			handleRemoveSingle(file,index) {
		    	this.uploadSingleImg[index].imgUrl = ''
		    },		      
		    uploadImgeSuccessSingle(response, index){
		        if (response.status == 200 ) {
		        	 this.uploadSingleImg[index].imgUrl = response.content.url
		        	}else{
		        		//response.msg
		        	}
		    },
		    handlePictureCardPreviewSingle(file,index) {
		        this.uploadSingleImg[index].dialogImageUrl = file.url;
		        this.uploadSingleImg[index].dialogVisible = true;
		    },
	        submitImg(index) {
	       	 	this.$refs.imgSingle[index].submit();
	     	},
		    handleRemove(fileList,index) {
		    	if(!this.uploadImgArr[index].imgUrls.length) return;
		        let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgArr[index].imgUrls = imgs.slice(0, imgs.length)
		    },
		    uploadImgeSuccess(response,index){
		        if (response.status == 200 ) {
		        	 this.uploadImgArr[index].imgUrls.push(response.content.url)
		        	}else{
		        		//response.msg
		        	}
		    },
		    handlePictureCardPreview(file,index) {
		        this.uploadImgArr[index].dialogImageUrl = file.url;
		        this.uploadImgArr[index].dialogVisible = true;
		    },	    
	     	submitImgArr(index) {
	       	 	this.$refs.imgArr[index].submit();
	     	},
	     	addImgArr(){
	     		let len = this.uploadImgArr.length
				let otherPics = {
						name:'其他细节图',
						title:'细节图'+len,
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrls:[],
						
					}
				this.uploadImgArr.push(otherPics)
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
  .show-demo1{
  	border:1px solid #e0e0e0;
  	height: 145px;
  	width: 145px;
  }
  .floatleft{
  	float: left;
  	margin-right: 10px;
  }
</style>