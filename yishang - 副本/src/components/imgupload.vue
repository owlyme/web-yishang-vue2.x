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
			  	<input 
			  	v-if="index ==  0 "
			  	v-model="item.title" 
			  	type="text" name="" class="input-name" placeholder="请输入标题"
			  	:class="{'el-input__inner': !item.title}"			
			  	>
				<input 
			  	v-else
			  	v-model="submitReceipt.other_picture[index-1].title" 
			  	type="text" name="" class="input-name" placeholder="请输入标题"
			  	:class="{'el-input__inner': !item.title}"			
			  	>
			  </el-col>	
			  <el-col :span="14">
			  	<!-- 	<div  class="floatleft" v-if="item.showSrc1">
			  			<img :src="item.showSrc1" class="show-demo1">
			  			<img :src="item.showSrc2" class="show-demo1">
			  		</div> -->
			  		<div  class="floatleft" v-if="item.showSrc" v-for='(item1, index1) in item.showSrc'>
					  	<img :src="item1" class="show-demo1">
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
			  <i v-if="index" class="el-icon-delete" @click.stop="clickDelete(index)"></i>			  
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
		props:['receiptContent','submitReceipt'],
		data(){
			return{
				ref: 'upload',
				imageUrl: '',
				pictures:{
					front_picture: '',
					back_picture:'',
					left_picture:'',
					right_picture:'', 
					part_picture:[],
					other_picture:[]
				},
				tempList : [
					{
						name:'局部细节图',
						title:'局部细节图',
						showSrc: [require('../assets/part1-pic.jpg'), require('../assets/part2-pic.jpg')],
						dialogVisible: false,
						dialogImageUrl: false,
						imgUrls:[],
						loaded: false
					}
				]
			}
		},
		computed:{
			...mapGetters([
			  'getUploadUrl'
			]),
			actionUrl(){
				return this.getUploadUrl +'/picture/upload'
			},
			uploadSingleImg(){
				let self = this
				let _aboutList = this.tempList
				_aboutList = [{
						name:'正面全览照',
						showSrc: self.submitReceipt.front_picture || require('../assets/front-pic.jpg'),
						dialogVisible: false,
						dialogImageUrl: false,						
						getImgUrl(val){
							self.submitReceipt.front_picture = val 
						}
					},
					{
						name:'背面全览照',
						showSrc: self.submitReceipt.back_picture || require('../assets/back-pic.jpg'),
						dialogVisible: false,
						dialogImageUrl: false,						
						getImgUrl(val){
							self.submitReceipt.back_picture = val 
						}
					},
					{
						name:'左侧面全览照',
						showSrc: self.submitReceipt.left_picture || require('../assets/left-pic.jpg'),
						dialogVisible: false,
						dialogImageUrl: false,						
						getImgUrl(val){
							self.submitReceipt.left_picture = val 
						}
					},
					{
						name:'右侧面全览照',
						showSrc: self.submitReceipt.right_picture || require('../assets/right-pic.jpg'),
						dialogVisible: false,
						dialogImageUrl: false,						
						getImgUrl(val){
							console.log(self.submitReceipt)
							self.submitReceipt.right_picture = val 
						}
					}]
				return _aboutList
			},
			uploadImgArr(){
				let self = this
				
				let index0 = self.tempList[0]
				let part_picture = self.submitReceipt.part_picture
				if( !part_picture ){ part_picture= [] }
				if( !index0.loaded ){
					index0.showSrc = part_picture.length ? part_picture.slice(0, part_picture.length) : index0.showSrc
					index0.imgUrls = !index0.imgUrls.length ? part_picture.slice(0, part_picture.length) : []
					index0.getImgUrl = (val, clear)=>{
						if(clear){	
							part_picture.splice(0, part_picture.length)
							val.forEach( (item, index)=>{
								part_picture.push( item )
							})
						}else{
							part_picture.push(val)
						}
					}
					index0.loaded = true
				}

				let _aboutList = self.tempList
				if( !self.submitReceipt.other_picture ){ self.submitReceipt.other_picture = [] }
					self.submitReceipt.other_picture.forEach( (item, index)=>{
						let list = {
									name:'',
									title:'',
									showSrc: [],
									dialogVisible: false,
									dialogImageUrl: false,
									imgUrls:[],
									loaded: false,
									getImgUrl(val, clear){
										if(clear){	
											item.sub_picture.splice(0, item.sub_picture.length)
											val.forEach( (item1, index1)=>{
												item.sub_picture.push( item1 )
											})
										}else{
											item.sub_picture.push(val)
										}
									}
								}

						if( !_aboutList[index+1] ){
							_aboutList.push(list)
							if( !item.sub_picture ){ item.sub_picture= [] }
							if( !_aboutList[index+1].loaded ){							
								_aboutList[index+1].imgUrls = item.sub_picture.slice(0, item.sub_picture.length)
								_aboutList[index+1].showSrc = item.sub_picture.length ? item.sub_picture.slice(0, item.picture.length) : []
							}
							_aboutList[index+1].loaded = true
						}
					})
				return _aboutList
			}
	    },
		methods:{
			handleRemoveSingle(file,index) {
		    	this.uploadSingleImg[index].getImgUrl('')
		    },		      
		    uploadImgeSuccessSingle(response, index){
		        if (response.status == 200 ) {
		        	 this.uploadSingleImg[index].getImgUrl(response.content.url)
		        	}else{
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
		        let imgs = [];
		       	imgs = imgs.concat( this.uploadImgArr[index].imgUrls )		       
		    	fileList.forEach((item , _index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.uploadImgArr[index].getImgUrl( imgs.slice(0, imgs.length), true )
		    },
		    uploadImgeSuccess(response,index){
		        if (response.status == 200 ) {
		        	 this.uploadImgArr[index].getImgUrl( response.content.url )
		        	}else{
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
				let otherPics = {
						title:'',
						sub_picture:[]
					}
				this.submitReceipt.other_picture.push(otherPics)
	     	},
	     	clickDelete(index){
		      	this.submitReceipt.other_picture.splice(index-1,1)
		      	this.uploadImgArr.splice(index,1)
		    }
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
 .el-icon-delete:hover{
	color: #C44DDC;
}
.space .el-icon-delete{
	position: absolute;
	display: none;
	right: 0px;
	top: 10px;
	cursor: pointer;
}
.space:hover .el-icon-delete {
	position: absolute;
	display: block;
	right: 15%;	
	top: 10px;
}
.input-name{	
    outline: none;
    border: none;
    text-align: right;
    color: #5a5e66;
}


</style>