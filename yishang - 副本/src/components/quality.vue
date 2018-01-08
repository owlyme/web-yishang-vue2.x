<template>
	<div class="quality">
		<h5 class="padding-bottom">品质要求</h5>
		<el-form-item label="查货选择:" >
		    <el-select v-model="submitReceipt.check" placeholder="请选择你的查货模式" style="width:75%">
		    	<el-option 
		    				v-for="(item, index) in receiptContent.check"
				    		:key="'check'+index"
				    		:label="item.check_name" :value="item.check_id">
				</el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="整体允许误差范围:" >
		    <el-select v-model="submitReceipt.error" placeholder="请选择你的误差标准" style="width:75%">
		      <el-option 
		    				v-for="(item, index) in receiptContent.error"
				    		:key="'error'+index"
				    		:label="item.error_value" :value="item.error_id">
				</el-option>
		    </el-select>
		</el-form-item>
		<el-form label-width="30%"  >
		<el-row  v-for="(item, index) in submitReceipt.supplement" class='padding-right details-row'  
		:key="item+index">		 
		  <el-col :span="12">
		  	<el-form-item label="细节部位" label-width="50%">
			    <el-input v-model="item.name" placeholder="请输入细节部位" ></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
		  	  <el-form-item label="误差标准范围"  style="width:100%" >
			    <el-input v-model="item.err" placeholder="请输入误差标准" style="width:60%"></el-input>
			  </el-form-item>	
			</el-form-item>
		  </el-col>
		  <i v-if="index" class="el-icon-delete" @click.stop="clickDelete(index)"></i>
		</el-row>
		</el-form>
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addDetail" class="circle-btn"></el-button>
		</div>
		<el-form-item label="要求信息:">
		    <el-input type="textarea" v-model="submitReceipt.requirement"></el-input>
		</el-form-item>

		<el-row :gutter="10"  class="space" >
		  <h6>版型图(若有版型图请上传)</h6>
	      <el-col :span="14" :offset="6">
			<div  class="floatleft" v-if="showSrc" v-for='(item1, index1) in showSrc'>
              <img :src="item1" class="show-demo2">
            </div>
			 <!-- :auto-upload="false" -->
	      <el-upload
	     		class="floatleft"	  			
	  			ref="banxing"
		        :action="actionUrl"
		       
		        list-type="picture-card"
		        :on-preview="(file) =>{ return  handlePictureCardPreview(file)}"
		        :on-success="(response, file, fileList) =>{ return  uploadImgeSuccess(response)}"		        
		        :on-remove="(file, fileList) =>{ return  handleRemove(fileList)}">	
		        <span  slot="trigger" class="remind" >点击上传</span>
		       <!--  <el-button class="click-submit"	 @click="submitImg">点击上传</el-button> -->
		      </el-upload>
		      <el-dialog :visible.sync="dialogVisible" size="tiny">
		        <img width="100%" :src="dialogImageUrl" alt="">
		      </el-dialog>
	      </el-col>             
	    </el-row>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

	export default{
		name: "quality",
		props:['receiptContent','submitReceipt'],
		data(){
			return{				
				dialogVisible: false,
				dialogImageUrl:false,		        
		        loaded: false,
		        imgUrls:[],
		        tempList: new Array(),
		        image :  require('../assets/back-pic.jpg'),
			}
		},
		mounted(){
			this.submitReceipt.supplement = [{
								name : "",
								err: "",
							}]
		},
		computed:{
		    ...mapGetters([
		        'getUploadUrl'
		    ]),
		    actionUrl(){
		     	return this.getUploadUrl +'/picture/upload'
		    },
		    showSrc(){
				let _aboutList = this.tempList
				if(!this.submitReceipt.picture){
					this.submitReceipt.picture = []
					_aboutList.push(this.image)
				}else{
					this.submitReceipt.picture.forEach( (item, index)=>{
						if( !this.loaded ){
							_aboutList.push(item)
							this.imgUrls.push(item)
						}
					})
				}				
				this.loaded= true
				return _aboutList
			}
	    },
		// watch:{
		// 	form:{
		// 		handler(curVal,oldVal){					
		// 			this.$emit("setQuality",curVal)
		// 　　　　},
		// 　　　　deep:true
		// 	}
		// },
		methods:{
			handleRemove(fileList) {
		        let imgs = [];
		        imgs = imgs.concat( this.imgUrls )
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	})		    	
		    	this.submitReceipt.picture = imgs.slice(0, imgs.length)
		    },
		    uploadImgeSuccess(response){
		        if (response.status == 200 ) {
		        	 this.submitReceipt.picture.push(response.content.url)
		        	}else{
		        		//response.msg
		        	}
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },

			addDetail(){	
				let detail = {
					name : "",
					err: ""
				}
				this.submitReceipt.supplement.push(detail)
			},
		    clickDelete(index){
		      	this.submitReceipt.supplement.splice(index,1)
		    },
		}
	}
</script>
<style scoped>
.quality{
	
}

.el-icon-delete:hover{
	color: #C44DDC;
}
.details-row .el-icon-delete{
	position: absolute;
	display: none;
	right: 0px;
	top: 10px;
	cursor: pointer;
}
.details-row:hover .el-icon-delete {
	position: absolute;
	display: block;
	right: 15%;	
	top: 10px;
}
  .show-demo2{
  	border:1px solid #e0e0e0;
  	height: 145px;
  	width: 200px;
  }
  .floatleft{
  	float: left;
  	margin-right: 10px;
  }
</style>
