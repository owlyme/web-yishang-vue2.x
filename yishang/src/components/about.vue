<template>
	<div class="about border-top">
		<h5>其他要求</h5>
		<div v-for="item in requires" class="padding-right add-row">
		<el-row :gutter="10"  class="space padding-bottom" >		 
		  <el-col :span="4">
		  	上传说明图片:
		  </el-col>	
		  <el-col :span="16">
			<el-upload
			  action="https://jsonplaceholder.typicode.com/posts/"
			  list-type="picture-card"
			  :on-preview="handlePictureCardPreview"
			  :on-remove="handleRemove">
			  <span class="remind">点击上传</span>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible" size="tiny">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		  </el-col>	    			  
		</el-row>
		
			<el-form-item label="信息要求" >
			    <el-input type="textarea" v-model="form.desc" placeholder="请填写要求信息"></el-input>
			</el-form-item>
			<i class="el-icon-delete" @click.stop="clickDelete(index)"></i>
		</div>
		
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addRequire" class="circle-btn"></el-button>
		</div>
		
	</div>
</template>
<script>
	export default{
		name: "quality",
		data(){
			return{
				requires: [
					{
						imgSrc : "",
						info: ""
					}],
				form: {
					desc: ""
				},
				dialogVisible: false,
				dialogImageUrl: false
			}
		},
		watch:{
			diffKind:{
				handler(curVal,oldVal){
		　　　　　　　　//console.log(curVal)
						// colorNumber = curVal
						this.$emit("setColor",curVal)
		　　　　　　},
		　　　　deep:true
			}
		},
		methods:{
			 handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		    	this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    addRequire(){
		    	let require = {
					imgSrc : "",
					info: ""
				}				
		    	this.requires.push(require)
		    },
		    clickDelete(index){
		      	this.requires.splice(index,1)
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
</style>
