<template>
	<div class="about border-top">
		<h5>其他要求</h5>
		<div v-for="(item,index) in aboutList" class="padding-right add-row">
		<el-row :gutter="10"  class="space padding-bottom" >		 
		  <el-col :span="4"  class="text-right text-style-sm">
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
			<el-dialog :visible.sync="item.dialogVisible" size="tiny">
			  <img width="100%" :src="item.dialogImageUrl" alt="">
			</el-dialog>
		  </el-col>	    			  
		</el-row>		
			<el-form-item label="信息要求:" >
			    <el-input type="textarea" v-model="item.desc" placeholder="请填写要求信息"></el-input>
			</el-form-item>
			<i v-if="index" class="el-icon-delete" @click.stop="clickDelete(index)"></i>
		</div>
		
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addAbout" class="circle-btn"></el-button>
		</div>
		
	</div>
</template>
<script>
	export default{
		name: "quality",
		data(){
			return{
				picId : 0,
				aboutList:[
					{
					id: 0,
					imgSrc : "",
					info: "",

					desc:"",
					dialogVisible: false,
					dialogImageUrl: false
					}
				],
				
			}
		},
		watch:{
			aboutList:{
				handler(curVal,oldVal){
					// console.log(curVal)
					this.$emit("setAbout",curVal)
		　　　　　　},
		　　　　deep:true
			},
		},
		methods:{
			handleRemove(file, fileList,index) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file,index) {
		    	this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    addAbout(){
		    	let about = {
		    		id: this.picId++,
					imgSrc : "",
					info: "",
					desc:"",
					dialogVisible: false,
					dialogImageUrl: false
				}				
		    	this.aboutList.push(about)
		    },
		    clickDelete(index){
		      	this.aboutList.splice(index,1)
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
