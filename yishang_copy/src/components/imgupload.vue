<template>
	<div>
		<h5>样衣照片</h5>
		<div class="uploadimg "  >
			<el-row :gutter="10"  class="space " 
				v-for="(item, index) in computedSingleImg" :key="'uploadSingleImg'+ index"	>		 
			  <el-col :span="6" class="text-right text-style-sm"> 	{{ item.name }}	  </el-col>	
			  <el-col :span="18" >
			  		<Uploadfiles
            			:oneImage= 'true'
			            :getUploadUrl="actionUrl"
			            :defaultImg  ="item.image"
			            :getImgList  ="item.picture"
			        ></Uploadfiles>
			  </el-col>	    			  
			</el-row>			
		</div>
		<div class="uploadimgs">
			<el-row :gutter="10"  class="space" >
			  <el-col :span="6" class="text-right text-style-sm">局部细节图</el-col>	
		      <el-col :span="18">
				<Uploadfiles
		            :getUploadUrl="actionUrl"
		            :defaultImg  ="image1"
		            :defaultImg2 ="image2"
		            :getImgList  ="computedPartPicture"
			    ></Uploadfiles>
		      </el-col>             
		    </el-row>


			<el-row :gutter="10"  class="space" v-for="(item, index) in computedOtherPicture" :key="'otherList'+ index">		 
			  <el-col :span="6" class="text-right text-style-sm"> 
				<input 
			  	v-model="item.title" 
			  	type="text" name="" class="input-name" placeholder="请输入标题"
			  	:class="{'el-input__inner': !item.title}"			
			  	>
			  </el-col>	
			  <el-col :span="18">
			  		<Uploadfiles
		            :getUploadUrl="actionUrl"		            
		            :getImgList  ="item.sub_picture"
			    ></Uploadfiles>
			  </el-col>
			  <i class="el-icon-delete" @click.stop="clickDelete(index)"></i>			  
			</el-row> 
		</div>
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addImgArr" class="circle-btn"></el-button>
		</div>
	</div>

</template>
<script>
import Uploadfiles from "@/components/uploadfiles"
import { mapGetters } from 'vuex'
	export	default{
		name: 'imageuplaod',
		props:['receiptContent','submitReceipt'],
		components: { Uploadfiles},
		data(){
			return{
				list : [
						{
							name:'正面全览照',
							picture:[],
							image: require('../assets/front-pic.jpg'),
							loaded: false
						},
						{
							name:'背面全览照',
							picture:[],
							image: require('../assets/back-pic.jpg'),
							loaded: false
						},
						{
							name:'左侧面全览照',
							picture:[],
							image: require('../assets/left-pic.jpg'),
							loaded: false
						},
						{
							name:'右侧面全览照',
							picture:[],
							image: require('../assets/right-pic.jpg'),
							loaded: false
						}
					],
				image1: require('../assets/part1-pic.jpg'), 
				image2: require('../assets/part2-pic.jpg'), 
				partPicture: [],
				otherPicture: []
			}
		},
		computed:{
			actionUrl(){
				return this.Api.upload
			},
			computedSingleImg(){
				let details = this.receiptContent.done.details
				if(details){
					// console.log(this.receiptContent.done.details)

					if( !this.list[0].loaded ){
						// console.log(this.list[0].picture)
						if(details.front_picture) {
							this.list[0].picture.push( details.front_picture )
						}
						this.list[0].loaded = true
					}
					if( !this.list[1].loaded ){
						if(details.front_picture) {
							this.list[1].picture.push( details.back_picture )
						}
						this.list[1].loaded = true
					}
					if( !this.list[2].loaded ){
						if(details.front_picture) {
							this.list[2].picture.push( details.left_picture )
						}
						this.list[2].loaded = true
					}
					if( !this.list[3].loaded ){
						if(details.front_picture) {
							this.list[3].picture.push( details.right_picture )
						}
						this.list[3].loaded = true
					}
				}
				return this.list
			},
			computedPartPicture(){
				if(this.receiptContent.done.details){
					this.partPicture = this.receiptContent.done.details.part_picture
				}				
				return this.partPicture
			},
			computedOtherPicture(){
				if(  Array.isArray(this.receiptContent.done.part)
					&& this.receiptContent.done.part.length ){
		          this.otherPicture = this.receiptContent.done.part
		        }			
				return this.otherPicture
			}
		},
	    watch:{
	    	list:{
	    		handler(curVal){	    			   
	    			let obj = this.objStringfy(curVal)
	    			this.submitReceipt.front_picture = this.removeDomain( obj[0].picture )[0]
					this.submitReceipt.back_picture = this.removeDomain( obj[1].picture )[0]
					this.submitReceipt.left_picture = this.removeDomain( obj[2].picture )[0]
					this.submitReceipt.right_picture = this.removeDomain( obj[3].picture )[0]
	    		},
	    		deep: true
	    	},
	    	partPicture:{
	    		handler(curVal){
	    			let obj = this.objStringfy(curVal)
                    this.submitReceipt.part_picture  =  this.removeDomain( obj )
	    		},
	    		deep: true
	    	},
	    	otherPicture:{
	    		handler(curVal){	
	    			let obj = this.objStringfy(curVal)
                    this.submitReceipt.other_picture = curVal.map( (item, index)=>{ 
                        let obj = JSON.parse( JSON.stringify(item) )
                        obj.sub_picture =  this.removeDomain( obj.sub_picture )
                        return obj
                    })
	    		},
	    		deep: true
	    	},
	    },
		methods:{
	     	addImgArr(){
				let otherPics = {
						title:'',
						sub_picture:[]
					}
				this.otherPicture.push(otherPics)
	     	},
		    clickDelete(index){
		      	this.otherPicture.splice(index,1)
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