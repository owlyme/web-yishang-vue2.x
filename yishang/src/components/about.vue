<template>
	<div class="about border-top">
		<div v-for="(item, index) in computedDoneSupplements" class="padding-right add-row uploadimgs" :key=" 'about'+ index" >
		<h5>其他要求</h5>
		<el-row :gutter="10"  class="space padding-bottom" >		 
		  <el-col :span="6"  class="text-right text-style-sm">
		  	上传说明图片:
		  </el-col>	
		  <el-col :span="14">
		  	<Uploadfiles 
            :getUploadUrl="getUploadUrl"
            :defaultImg  ="image"
            :getImgList  ="item.picture"
          ></Uploadfiles>
		  </el-col>
		</el-row>		
			<el-form-item label="要求信息:" class="padding-top">
			    <el-input type="textarea" v-model="item.requirement"  placeholder="请填写要求信息"></el-input>
			</el-form-item>
			<i v-if="index" class="el-icon-delete" @click.stop="clickDelete(index)"></i>
		</div>
		
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addAbout" class="circle-btn"></el-button>
		</div>
		
	</div>
</template>
<script>
import Uploadfiles from "@/components/uploadfiles"

import { mapGetters } from 'vuex'
	export default{
		name: "quality",
		props:['receiptContent','submitReceipt'],
		components: { Uploadfiles},
		props:{
	      doneSupplements: {},
	      submitReceiptSupplements:{
	        type: Array,
	        default(){ return [] }
	      }
	    },
		data(){
			return{
				image :  require('../assets/back-pic.jpg'),	
				list: [{picture:[],
						requirement: ''}]
			}
		},
		computed:{
	        ...mapGetters([
	            'getUploadUrl'
	        ]),
	        actionUrl(){
	          return this.Api.upload
	        },
	        computedDoneSupplements(){
		        if(this.doneSupplements && Array.isArray(this.doneSupplements) && this.doneSupplements.length){
		          this.list = this.doneSupplements
		        }
		        return this.list 
		    }	        
	    },
	    watch:{
	      list:{
	        handler(curVal){
	          this.$emit( 'update:submitReceiptSupplements',  curVal.map( (item, index)=>{ 
	                        // let obj = Object.assign({}, item)
	                        let obj = this.objStringfy(item)
	                        obj.picture =  this.removeDomain( obj.picture )
	                        return obj
	                      })
	                    )
	        },
	        deep: true
	      }
	    },
		methods:{			
			addAbout(){
		    	let about = {
		    		picture: [],
					requirement: null
				}
		    	this.list.push(about)
		    },
		    clickDelete(index){
		      	this.list.splice(index,1)
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
