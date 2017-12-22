<template>
	<div class="quality">
		<h5 class="padding-bottom">品质要求</h5>
		<el-form-item label="查货选择:" >
		    <el-select v-model="form.check" placeholder="请选择你的查货模式" style="width:75%">
		    	<el-option 
		    				v-for="(item, index) in check"
				    		:key="'check'+index"
				    		:label="item.check_name" :value="item.check_id">
				</el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="整体允许误差范围:" >
		    <el-select v-model="form.error" placeholder="请选择你的误差标准" style="width:75%">
		      <el-option 
		    				v-for="(item, index) in error"
				    		:key="'error'+index"
				    		:label="item.error_value" :value="item.error_id">
				</el-option>
		    </el-select>
		</el-form-item>

		<el-row  v-for="(item, index) in form.supplement" class='padding-right details-row'  
		:key="item+index">		 
		  <el-col :span="12">
		  	<el-form-item :label="'细节部位'+ (index+1)+':'" label-width="50%">
			    <el-input v-model="item.name" placeholder="请输入细节部位" ></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
		  	<!-- <el-form-item :label="'误差标准范围'+ (index+1)+':'" >
				<el-select v-model="item.error" placeholder="请选择你的误差标准" >
			      <el-option 
			    				v-for="(item, index) in error"
					    		:key="'error'+index"
					    		:label="item.error_value" :value="item.error_id">
					</el-option>
			    </el-select>
			</el-form-item>     -->

		  	    <el-form-item :label="'误差标准范围'+ (index+1)+':'" label-width="30%">
			    <el-input v-model="item.error" placeholder="请输入误差标准" style="width:55%"></el-input>
			  </el-form-item>	
		  </el-col>
		  <i v-if="index" class="el-icon-delete" @click.stop="clickDelete(index)"></i>
		</el-row>

		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addDetail" class="circle-btn"></el-button>
		</div>
		<el-form-item label="要求信息:">
		    <el-input type="textarea" v-model="form.requirement"></el-input>
		</el-form-item>

		<el-row :gutter="10"  class="space uploadimg" >
		  <h6>版型图(若有版型图请上传)</h6>
	      <el-col :span="14" :offset="6">
	      <el-upload			  			
	  			ref="banxing"
		        :action="actionUrl"
		        :auto-upload="false"
		        list-type="picture-card"
		        :on-preview="(file) =>{ return  handlePictureCardPreviewSingle(file)}"
		        :on-success="(response, file, fileList) =>{ return  uploadImgeSuccessSingle(response)}"		        
		        :on-remove="(file, fileList) =>{ return  handleRemoveSingle(file)}">	
		        <span  slot="trigger" class="remind" ><i class="el-icon-plus"></i></span>
		        <el-button class="click-submit"	 @click="submitImg">点击上传</el-button>
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
		props: ['check', "error"],
		data(){
			return{
				dialogVisible: false,
				dialogImageUrl:false,
				form: {
		          check: '',
		          error: '',
		          delivery: false,	          
		          requirement: '',
		          imageUrls:"",
		          supplement:[
			          {
						name : "",
						error: "",
					}]
		        },
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
		watch:{
			form:{
				handler(curVal,oldVal){
					this.$emit("setQuality",curVal)
		　　　　},
		　　　　deep:true
			}
		},
		methods:{
			handleRemoveSingle(file) {
		    	this.form.imageUrls = ''
		    },		      
		    uploadImgeSuccessSingle(response){
		        if (response.status == 200 ) {
		        	 this.form.imageUrls = response.content.url
		        	}else{
		        		//response.msg
		        	}
		    },
		    handlePictureCardPreviewSingle(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
	        submitImg(index) {
	       	 	this.$refs.banxing.submit();
	     	}, 
			addDetail(){	
				let detail = {
					position : "",
					error: ""
				}
				this.form.supplement.push(detail)
			},
		    clickDelete(index){
		      	this.form.supplement.splice(index,1)
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
</style>
