<template>
	<div class="padding-left-right " >
		<el-form-item label="产品名称:">
		    <el-input v-model="submitReceipt.name" placeholder="建议类目+面料+公司+日期" style="width:75%"></el-input>
		  </el-form-item>
		  <el-form-item label="面料属性大类:" >
		    <el-select v-model="submitReceipt.cate_id" placeholder="面料属性大类" style="width:75%">
		      <el-option 
		      		v-for="(item, index) in receiptContent.category"
		    		:key="'category'+index"
		    		:label="item.category_name" :value="item.category_id">  			
		    		</el-option>
		   </el-select>
		  </el-form-item>
		  <el-form-item label="服装品类类目:" >
		    <el-select v-model="submitReceipt.style_id" placeholder="服装品类类目" style="width:75%">
		    	<el-option 
		    		v-for="(item, index) in receiptContent.style"
		    		:key="'styles'+index"
		    	:label="item.style_name" :value="item.style_id"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="加工模式:">
		    <el-radio-group v-model="submitReceipt.mode_id" style="padding-top:8px">
		    <el-radio 
		    	v-for="(item, index) in receiptContent.mode"
		    	:key="'mode'+ index"
		    	:label="item.mode_id">  {{item.mode_name}} </el-radio>					
			</el-radio-group>				
			</el-form-item>
	</div>
</template>
<script>
	export default{
		name: "sheet",
		// props: ['styles','cate', 'mode', 'category'],
		props:['receiptContent','submitReceipt'],
		data(){
			return {
				form: {
					name: '',
					fabricType: "",
					kindType: '',
					status:''
				}
			}
		},

	}
</script>
<style scoped>
	
</style>