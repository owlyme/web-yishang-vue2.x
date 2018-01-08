<template>
	<div class="about border-top">
		<div v-for="(item, index) in aboutList" class="padding-right add-row uploadimgs" :key=" 'about'+ index" >
		<h5>其他要求</h5>
		<el-row :gutter="10"  class="space padding-bottom" >		 
		  <el-col :span="6"  class="text-right text-style-sm">
		  	上传说明图片:
		  </el-col>	
		  <el-col :span="14">
		  	<div  class="floatleft" v-if="item.showSrc" v-for='(item1, index1) in item.showSrc'>
			  	<img :src="item1" class="show-demo1">
			</div>
			<el-upload
				class="floatleft"	
	  			ref="supplements"
		        :action="actionUrl"
		        list-type="picture-card"
		        :on-preview="(file) =>{ return  handlePictureCardPreview(file, index)}"
		        :on-success="(response, file, fileList) =>{ return  uploadImgeSuccess(response, index)}"		        
		        :on-remove="(file, fileList) =>{ return  handleRemove(fileList, index)}">	
		        <span  slot="trigger" class="remind" >点击上传</span>
		        <!-- <el-button class="click-submit"	 @click="submitImg(index)">点击上传</el-button> -->
		      </el-upload>
		      <el-dialog :visible.sync="item.dialogVisible" size="tiny">
		        <img width="100%" :src="item.dialogImageUrl" alt="">
		      </el-dialog>
		  </el-col>
		</el-row>		
			<el-form-item label="要求信息:" class="padding-top">
			    <el-input type="textarea" v-model="submitReceipt.supplements[index].requirement"  placeholder="请填写要求信息"></el-input>
			</el-form-item>
			<i v-if="index" class="el-icon-delete" @click.stop="clickDelete(index)"></i>
		</div>
		
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addAbout" class="circle-btn"></el-button>
		</div>
		
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
	export default{
		name: "quality",
		props:['receiptContent','submitReceipt'],
		data(){
			return{
				image :  require('../assets/back-pic.jpg'),	
				tempList: new Array()	
			}
		},
		computed:{
	        ...mapGetters([
	            'getUploadUrl'
	        ]),
	        actionUrl(){
	          return this.getUploadUrl +'/picture/upload'
	        },
	        aboutList(){
				let _aboutList = this.tempList
				this.submitReceipt.supplements.forEach( (item, index)=>{
					let list = {
								id: 0,
								imgUrls:[],
								showSrc: null,
								requirement:"",
								dialogVisible: false,
								dialogImageUrl: false,
								loaded: false,
								getImgUrl(val, clear){
										if(clear){	
											item.picture.splice(0, item.picture.length)
											val.forEach( (item1, index1)=>{
												item.picture.push( item1 )
											})
										}else{
											item.picture.push(val)
										}
									}
							}
					if( !_aboutList[index] ){
						 _aboutList.push(list)
						if( !item.picture ){ item.picture= [] }
						if(!_aboutList[index].loaded){
							_aboutList[index].imgUrls = item.picture.slice(0, item.picture.length)
							_aboutList[index].showSrc = item.picture.length ? item.picture.slice(0, item.picture.length) : [this.image]		
						}	
						_aboutList[index].loaded = true			
					}
				})
				return _aboutList
			}
	     },
		methods:{
			handleRemove(fileList,index) {
		        let imgs = [];
		        imgs = imgs.concat( this.aboutList[index].imgUrls )		      
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.aboutList[index].getImgUrl( imgs.slice(0, imgs.length), true )
		    },
		    uploadImgeSuccess(response,index){
		        if (response.status == 200 ) {
		        	this.aboutList[index].getImgUrl( response.content.url )
		        	}else{
		        		//response.msg
		        	}
		    },
		    handlePictureCardPreview(file,index) {
		        this.aboutList[index].dialogImageUrl = file.url;
		        this.aboutList[index].dialogVisible = true;
		    },	
			addAbout(){
		    	let about = {
		    		picture: [],
					requirement: null
				}
		    	this.submitReceipt.supplements.push(about)
		    },
		    clickDelete(index){
		      	this.submitReceipt.supplements.splice(index,1)
		      	this.tempList.splice(index,1)
		    }
		}
	}
</script>
<style scoped>

.el-icon-delete:hover{
	color: #C44DDC;
}
.add-row{
	position: relative;
}
.add-row .el-icon-delete{
	position: absolute;
	display: none;
	right: 0px;
	top: 10px;
	cursor: pointer;
}
.add-row:hover .el-icon-delete {
	position: absolute;
	display: block;
	right: 0px;
	top: 10px;
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
