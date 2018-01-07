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
			    <el-input type="textarea" v-model="item.requirement" placeholder="请填写要求信息"></el-input>
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
				// aboutList:[
				// 	// {
				// 	// id: 0,
				// 	// imgUrls:[],
				// 	// showSrc: [require('../assets/back-pic.jpg')],
				// 	// requirement:"",
				// 	// dialogVisible: false,
				// 	// dialogImageUrl: false
				// 	// }
				// ],				
			}
		},


		// watch:{
		// 	aboutList:{
		// 		handler(curVal,oldVal){
		// 			let value = [];
		// 			curVal.forEach((item, index) =>{
		// 				value[index] = {
		// 					requirement : item.requirement,
		// 					picture: item.imgUrls
		// 				}
		// 			})
		// 			this.submitReceipt.supplements = value
		// 　　　　},
		// 　　　　deep:true
		// 	},
		// },
		computed:{
	        ...mapGetters([
	            'getUploadUrl'
	          ]),
	        actionUrl(){
	          return this.getUploadUrl +'/picture/upload'
	        },
	        aboutList(){
				let _aboutList = []
				this.submitReceipt.supplements.forEach( (item, index)=>{
					let list = {
								id: 0,
								imgUrls:[],
								showSrc: [require('../assets/back-pic.jpg')],
								requirement:"",
								dialogVisible: false,
								dialogImageUrl: false
							}
					
					_aboutList.push(list)
					if( item.picture){
						_aboutList[index].imgUrls = item.picture
						_aboutList[index].showSrc = item.picture.slice(0, item.picture.length) 
					}
					_aboutList[index].requirement = item.requirement			
				})
				return _aboutList
			}
	     },
		methods:{
			handleRemove(fileList,index) {
		    	if(!this.aboutList[index].imgUrls.length) return;
		        let imgs = [];
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})
		    	this.aboutList[index].imgUrls = imgs.slice(0, imgs.length)
		    },
		    uploadImgeSuccess(response,index){
		        if (response.status == 200 ) {
		        	 this.aboutList[index].imgUrls.push(response.content.url)
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
		    	this.picId--
		      	this.aboutList.splice(index,1)
		      	this.aboutList.forEach((item ,index) =>{
		          this.aboutList[index].id = index
		        })
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
