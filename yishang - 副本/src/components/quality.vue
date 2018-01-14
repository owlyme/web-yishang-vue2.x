<template>
	<div class="quality">
		<h5 class="padding-bottom">质量要求</h5>
		 <el-form-item label="品质要求:">
				    <el-radio-group v-model="submitReceipt.quality_requirement" style="padding-top:8px">
				    <el-radio label="精品" value="精品"></el-radio>
				    <el-radio label="半精品" value="半精品"></el-radio>
				    <el-radio label="中等" value="中等"></el-radio>
				    <el-radio label="普通" value="普通"></el-radio>
					</el-radio-group>
		</el-form-item>
		<el-form-item label="查货选择:" >
		    <el-select v-model="submitReceipt.check_id" placeholder="请选择你的查货模式" style="width:75%">
		    	<el-option 
		    				v-for="(item, index) in receiptContent.check"
				    		:key="'check'+index"
				    		:label="item.check_name" :value="item.check_id">
				</el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="整体允许误差范围:" >
		    <el-select v-model="submitReceipt.error_id" placeholder="请选择你的误差标准" style="width:75%">
		      <el-option 
		    				v-for="(item, index) in receiptContent.error"
				    		:key="'error'+index"
				    		:label="item.error_value" :value="item.error_id">
				</el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="要求信息:">
		    <el-input type="textarea" v-model="submitReceipt.requirement"></el-input>
		</el-form-item>

		<el-row :gutter="10"  class="space" >
		  <h6>尺寸表图片</h6>
	      <el-col :span="14" :offset="6">
			<div  class="floatleft" v-if="showSrc" v-for='(item1, index1) in sizeShowSrc'>
              <img :src="item1" class="show-demo2">
            </div>
			 <!-- :auto-upload="false" -->
	      <el-upload
	     		class="floatleft"	  			
	  			ref="banxing"
		        :action="actionUrl"
		       
		        list-type="picture-card"
		        :on-preview="(file) =>{ return  handlePictureCardPreview(file)}"
		        :on-success="(response, file, fileList) =>{ return  uploadImgeSuccess(response, this.submitReceipt.size_table)}"
		        :on-remove="(file, fileList) =>{ return  handleRemove(fileList, imgUrls, this.submitReceipt.size_table)}">	
		        <span  slot="trigger" class="remind" >点击上传</span>
		       <!--  <el-button class="click-submit"	 @click="submitImg">点击上传</el-button> -->
		      </el-upload>
		      <el-dialog :visible.sync="dialogVisible" size="tiny">
		        <img width="100%" :src="dialogImageUrl" alt="">
		      </el-dialog>
	      </el-col>             
	    </el-row>

	    <el-row :gutter="10"  class="space" >
		  <h6>工艺单图片</h6>
	      <el-col :span="14" :offset="6">
			<div  class="floatleft" v-if="showSrc" v-for='(item1, index1) in processShowSrc'>
              <img :src="item1" class="show-demo2">
            </div>
			 <!-- :auto-upload="false" -->
	      <el-upload
	     		class="floatleft"	  			
	  			ref="banxing"
		        :action="actionUrl"
		       
		        list-type="picture-card"
		        :on-preview="(file) =>{ return  handlePictureCardPreview(file)}"
		        :on-success="(response, file, fileList) =>{ return uploadImgeSuccess(response, this.submitReceipt.process_list)}"
		        :on-remove="(file, fileList) =>{ return handleRemove(fileList, imgUrls, this.submitReceipt.process_list)}">	
		        <span  slot="trigger" class="remind" >点击上传</span>
		       <!--  <el-button class="click-submit"	 @click="submitImg">点击上传</el-button> -->
		      </el-upload>
		      <el-dialog :visible.sync="dialogVisible" size="tiny">
		        <img width="100%" :src="dialogImageUrl" alt="">
		      </el-dialog>
	      </el-col>             
	    </el-row>

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
		        :on-success="(response, file, fileList) =>{ return  uploadImgeSuccess(response, this.submitReceipt.picture)}"
		        :on-remove="(file, fileList) =>{ return  handleRemove(fileList, imgUrls, this.submitReceipt.picture)}">	
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
		        sizeImgUrls: [],
		        processImgUrls: [],
		        tempList: new Array(),
		        tempList1: new Array(),
		        tempList2: new Array(),
		        image :  require('../assets/mode-pic.jpg'),
			}
		},
		computed:{
		    ...mapGetters([
		        'getUploadUrl'
		    ]),
		    actionUrl(){
		     	return this.getUploadUrl +'/picture/upload'
		    },
		    showSrc(){
				let picture = this.submitReceipt.picture
				if( Array.isArray( picture ) && !this.tempList[0] ){
					this.imgUrls = picture.slice()
					this.tempList = picture.length ? this.addUploadUrl(this.getUploadUrl, picture.slice()) : [this.image]
				}			
				return this.tempList
			},
			sizeShowSrc(){
				let picture = this.submitReceipt.size_table
				if( Array.isArray( picture ) && !this.tempList1[0] ){
					this.sizeImgUrls = picture.slice()
					this.tempList1 = picture.length ? this.addUploadUrl(this.getUploadUrl, picture.slice()) : [this.image]
				}			
				return this.tempList1
			},
			processShowSrc(){
				this.tempList2
				let picture = this.submitReceipt.process_list
				if( Array.isArray( picture ) && !this.tempList2[0] ){
					this.processImgUrls = picture.slice()
					this.tempList2 = picture.length ? this.addUploadUrl(this.getUploadUrl, picture.slice()) : [this.image]
				}			
				return this.tempList2
			}
	    },

		methods:{
		   handleRemove(fileList, imgUrls, picture) {
		        let imgs = [];
		        imgs = imgs.concat( imgUrls )
		    	fileList.forEach((item ,index) =>{
		    		imgs.push(item.response.content.url)
		    	}) 
		    	picture.splice(0, picture.length)
		    	imgs.forEach((item ,index) =>{
		    		picture.push(item)
		    	})
		    },
		    uploadImgeSuccess(response, picture){
		        if (response.status == 200 ) {
		        	 picture.push(response.content.url)
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
		    deleteImgUrl(){
		    	
		    }
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
