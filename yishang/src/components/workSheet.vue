<template>
	<div class="padding-left-right " >
				<el-form-item label="产品名称:">
				    <el-input v-model="form.name" placeholder="建议类目+面料+公司+日期" style="width:75%"></el-input>
				  </el-form-item>
				  <el-form-item label="面料属性大类:" >
				    <el-select v-model="form.fabricType" placeholder="面料属性大类" style="width:75%">
				      <el-option 
				      		v-for="(item, index) in category"
				    		:key="'category'+index"
				    		:label="item.category_name" :value="item.category_id">				    			
				    		</el-option>
				   </el-select>
				  </el-form-item>
				  <el-form-item label="服装品类类目:" >
				    <el-select v-model="form.kindType" placeholder="服装品类类目" style="width:75%">
				    	<el-option 
				    		v-for="(item, index) in styles"
				    		:key="'styles'+index"
				    	:label="item.style_name" :value="item.style_id"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="加工模式:">
				    <el-radio-group v-model="form.status" style="padding-top:8px">
				    <el-radio 
				    	v-for="(item, index) in mode"
				    	:key="'mode'+ index"
						:label="item.mode_name" 
						:value="item.mode_id"></el-radio>
					</el-radio-group>
		 		</el-form-item>
			</div>
</template>
<script>
	export default{
		name: "sheet",
		props: ['styles','cate', 'mode', 'category'],
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
		watch:{
			form:{
				handler(curVal, oldVal){					
					this.$emit('setWorkSheet',curVal)
		　　　　},
				deep: true
			}
		},
	}
</script>
<style scoped>
	
</style>