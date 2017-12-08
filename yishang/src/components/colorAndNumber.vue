<template>
	<div class="color">
		<h5>颜色数量</h5>
		<div v-for="item in diffKind">
			<el-row :gutter="10" >	 
			  <el-col :span="4">
			  	款色(颜色)
			  </el-col>	
				 <el-col :span="16">
			  		<el-input v-model="clothesColor" placeholder="款色(颜色)"></el-input>
			  </el-col>
	 			<el-col :span="4">
			  	<span @click="clickDisplay">收起</span>
			  </el-col>		    			  
			</el-row>
			<div v-if="displaySizeList">
				<el-row :gutter="10" v-for="(item,index) in size" class="" :key="'row'+index">
					  <el-col :span="4" class="textright">
					  	<div class="grid-content bg-purple">
					  		{{ index == 0 ?"尺码:" : ''}}  {{item}}
						</div>
					  </el-col>
					  <el-col :span="16">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="clothes[item]" :min="0"  label="描述文字" class="fulid-width"></el-input-number>
						</div>
					  </el-col>				  
				</el-row>
			</div>
		</div>
		
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addKind" class="circle-btn"></el-button>
		</div>
		<div>总价: 件</div>
	</div>
</template>

<script>


export default {
name: "color",
data () {
	return {
		displaySizeList: false,
		clothes:{},
	   	activeNames: [],
	   	size : ["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"], 
	   	clothes: {
          color: '',
          number: '',
          type: '',
        },
        diffKind: [ 0],
	}
},
computed:{
	closeStatus(){
		
	}
},
methods:{
      handleChange(){
      	console.log(this.clothes)
      },
      clickDisplay(){
      	this.displaySizeList = !this.displaySizeList
      },
      addKind(){
		//let _diffKind = this.diffKinda.slice(0,this.diffKind.length)
		this.diffKind.push(this.diffKind.length)
	},
    
}

}

</script>
<style scoped>
.collapse-btn{
	margin-top: 60px;
}
.headline{
	background: #e0e0e0;
	height: 32px
}
.collapse-block{
	/*margin-top: -48px;*/
}
.collapse-input{
	
	
}
.collapse-head{
	text-align: right;
}
.textright{
	text-align: right;
	line-height: 40px;
}
.fulid-width{
	width: 100%
}

 .el-row {
    margin-bottom: 15px;
    border: none;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-collapse-item__header{
	background-color: #999;
}
</style>