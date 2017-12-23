<template>
	<div class="about border-top">
		<div v-for="(item, index) in aboutList" class="padding-right add-row uploadimg" :key=" 'about'+ index" >
		<h5>其他要求{{index +1}}</h5>
		<el-row :gutter="10"  class="space padding-bottom" >		 
		  <el-col :span="6"  class="text-right text-style-sm">
		  	上传说明图片:
		  </el-col>	
		  <el-col :span="14">
		  	<div  class="floatleft" v-if="item.showSrc">
			  			<img :src="item.showSrc" class="show-demo1">
			  </div>	
			<el-upload
				class="floatleft"			  			
	  			ref="supplements"
		        :action="actionUrl"
		        list-type="picture-card"
		        :on-preview="(file) =>{ return  handlePictureCardPreviewSingle(file, index)}"
		        :on-success="(response, file, fileList) =>{ return  uploadImgeSuccessSingle(response, index)}"		        
		        :on-remove="(file, fileList) =>{ return  handleRemoveSingle(file, index)}">	
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
		data(){
			return{
				aboutList:[
					{
					id: 0,
					imgUrl:'',
					showSrc: require('../assets/back-pic.jpg'),
					requirement:"",
					dialogVisible: false,
					dialogImageUrl: false
					}
				],				
			}
		},
		watch:{
			aboutList:{
				handler(curVal,oldVal){
					let value = [];
					curVal.forEach((item, index) =>{
						value[index] = {
							requirement : item.requirement,
							picture: item.imgUrl
						}
					})
					this.$emit("setAbout",value)
		　　　　　　},
		　　　　deep:true
			},
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
		    	this.aboutList[index].imgUrl = ''
		    },		      
		    uploadImgeSuccessSingle(response, index){
		        if (response.status == 200 ) {
		        	 this.aboutList[index].imgUrl = response.content.url
		        	}else{
		        		//response.msg
		        	}
		    },
		    handlePictureCardPreviewSingle(file,index) {
		        this.aboutList[index].dialogImageUrl = file.url;
		        this.aboutList[index].dialogVisible = true;
		    },
	        submitImg(index) {
	       	 	this.$refs.supplements[index].submit();
	     	}, 
			addAbout(){
		    	let about = {
		    		id: '',
					imgUrl:'',
					requirement:"",
					dialogVisible: false,
					dialogImageUrl: false
				}				
		    	this.aboutList.push(about)
		    	this.aboutList.forEach((item ,index) =>{
		          this.aboutList[index].id = index
		        })
		    },
		    clickDelete(index){
		    	this.picId--
		      	this.aboutList.splice(index,1)
		      	this.aboutList.forEach((item ,index) =>{
		          this.aboutList[index].id = index
		        })
		    },

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
