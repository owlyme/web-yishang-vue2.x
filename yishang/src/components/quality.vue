<template>
	<div class="quality" >
		<h5 class="padding-bottom">质量要求</h5>
		 <el-form-item label="品质要求:">
				    <el-radio-group v-model="computedForm.quality_requirement" style="padding-top:8px">
				    <el-radio label="精品" value="精品"></el-radio>
				    <el-radio label="半精品" value="半精品"></el-radio>
				    <el-radio label="中等" value="中等"></el-radio>
				    <el-radio label="普通" value="普通"></el-radio>
					</el-radio-group>
		</el-form-item>
		<el-form-item label="查货选择:" >
		    <el-select v-model="computedForm.check_id" placeholder="请选择你的查货模式" style="width:75%">
		    	<el-option 
		    				v-for="(item, index) in receiptContent.check"
				    		:key="'check'+index"
				    		:label="item.check_name" :value="item.check_id">
				</el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="整体允许误差范围:" >
		    <el-select v-model="computedForm.error_id" placeholder="请选择你的误差标准" style="width:75%">
		      <el-option 
		    				v-for="(item, index) in receiptContent.error"
				    		:key="'error'+index"
				    		:label="item.error_value" :value="item.error_id">
				</el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="要求信息:">
		    <el-input type="textarea" v-model="computedForm.requirement"></el-input>
		</el-form-item>

		<el-row :gutter="10"  class="space" >
		  <h6>尺寸表图片</h6>
	      <el-col :span="14" :offset="6">
			<Uploadfiles 
            :getUploadUrl="getUploadUrl"
            :defaultImg  ="image"
            :getImgList  ="computedForm.size_table"
          	></Uploadfiles>
	      </el-col>
	    </el-row>

	    <el-row :gutter="10"  class="space" >
		  <h6>工艺单图片</h6>
	      <el-col :span="14" :offset="6">
			<Uploadfiles 
            :getUploadUrl="getUploadUrl"
            :defaultImg  ="image"
            :getImgList  ="computedForm.process_list"
          	></Uploadfiles>
	      </el-col>
	    </el-row>

	    <el-row :gutter="10"  class="space" >
		  <h6>版型图(若有版型图请上传)</h6>
	      <el-col :span="14" :offset="6">
			<Uploadfiles 
            :getUploadUrl="getUploadUrl"
            :defaultImg  ="image"
            :getImgList  ="computedForm.picture"
          	></Uploadfiles>
	      </el-col>             
	    </el-row>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'
import Uploadfiles from "@/components/uploadfiles"
	export default{
		name: "quality",
		components: { Uploadfiles},
		props:{
		  receiptContent:{},
	      submitReceipt:{}
	    },
		data(){
			return{	
				form: {					
					check_id:'',				
					error_id:'',
					quality_requirement:"精品",
					requirement:'',
					picture:[],
					process_list:[],
					size_table:[]
				},
		        image : require('../assets/mode-pic.jpg'),
			}
		},
		computed:{
		    ...mapGetters([
		        'getUploadUrl'
		    ]),
		    actionUrl(){
		     	return this.getUploadUrl +'/picture/upload'
		    },
		    computedForm(){
		    	if( !Array.isArray(this.receiptContent.done) ){
		    		// console.log(this.receiptContent.done.quality)
					this.form.check_id = this.receiptContent.done.quality.check_id
					this.form.error_id= this.receiptContent.done.quality.error_id
					this.form.quality_requirement= this.receiptContent.done.quality.quality_requirement
					this.form.requirement= this.receiptContent.done.quality.requirement
					this.form.picture = this.receiptContent.done.quality.picture
					this.form.process_list= this.receiptContent.done.quality.process_list
					this.form.size_table= this.receiptContent.done.quality.size_table
				}
				return this.form
		    }
		},
		watch:{
	      form:{
	        handler(curVal){
		        let obj = JSON.parse( JSON.stringify(curVal) )	
				this.submitReceipt.check_id = obj.check_id
				this.submitReceipt.error_id = obj.error_id
				this.submitReceipt.requirement = obj.requirement
				this.submitReceipt.quality_requirement = obj.quality_requirement
				this.submitReceipt.picture = this.removeDomain( obj.picture )
				this.submitReceipt.size_table = this.removeDomain( obj.size_table )
				this.submitReceipt.process_list = this.removeDomain( obj.process_list )
	        },
	        deep: true
	      },	      
	    },
		
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
