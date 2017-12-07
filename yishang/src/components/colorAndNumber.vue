<template>
	<div class="color">
		





		
		<el-row :gutter="10" >		 
		  <el-col :span="20">
		  	<el-form label-position="right" label-width="80px" :model="clothes">
			  <el-form-item label="名称">
			    <el-input v-model="clothes.clothesColor"></el-input>
			  </el-form-item>		  
			</el-form>
		  </el-col>				  
		</el-row>

		<el-collapse v-model="activeNames" @change="handleChange"  class="collapse-block">		
			<el-collapse-item
				:title=" activeNames.length > 0 ? '展开	': '收起	' "
				name="1" 
				class="collapse-head"
				>
				<el-row :gutter="10" v-for="(item,index) in size" class="">
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
			    
			</el-collapse-item> 		  
		</el-collapse>
	</div>
</template>

<script>


export default {
name: "color",
data () {
	return {
		clothes:{},
	   	activeNames: [],
	   	size : ["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"], 
	   	clothes: {
          color: '',
          number: '',
          type: '',
        }
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