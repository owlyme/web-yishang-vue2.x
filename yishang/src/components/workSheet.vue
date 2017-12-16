<template>
	<div class="padding-left-right " >
				<el-form-item label="订单名称:">
				    <el-input v-model="form.name" placeholder="建议类目+面料+公司+日期" style="width:75%"></el-input>
				  </el-form-item>
				  <el-form-item label="面料属性大类:" >
				    <el-select v-model="form.fabricType" placeholder="面料属性大类" style="width:75%">
				      <el-option label="针织" value="zhengzhi"></el-option>
				      <el-option label="梭织" value="suozhi"></el-option>
				      <el-option label="毛衫" value="maoshan"></el-option>
				      <el-option label="牛仔" value="liuzai"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="服装品类类目:" >
				    <el-select v-model="form.kindType" placeholder="服装品类类目" style="width:75%">
				      <el-option label="针织" value="zhengzhi"></el-option>
				      <el-option label="梭织" value="suozhi"></el-option>
				      <el-option label="毛衫" value="maoshan"></el-option>
				      <el-option label="牛仔" value="liuzai"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="加工模式:">
				    <el-radio-group v-model="form.status" style="padding-top:8px">
				      <el-radio label="前加工"></el-radio>
				      <el-radio label="全加工"></el-radio>
				      <el-radio label="后加工"></el-radio>
				    </el-radio-group>
		 		</el-form-item>
			</div>
</template>
<script>
	export default{
		name: "sheet",
		data(){
			return {
				form: {
					name: '',
					fabricType: "",
					kindType: '',
					fabricType:'',
					kindType:'',
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