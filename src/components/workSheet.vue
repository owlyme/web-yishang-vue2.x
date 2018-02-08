<template>
	<div class="padding-left-right " >
		<el-form-item label="产品名称:">
		    <el-input v-model="computedForm.name" placeholder="建议填写如：女装 针织 毛衫 杭州 100件" style="width:75%"></el-input>
		  </el-form-item>
		  <el-form-item label="面料属性大类:" >
		    <el-select v-model="computedForm.cate_id" placeholder="面料属性大类" style="width:75%">
		      <el-option 
		      		v-for="(item, index) in receiptContent.category"
		    		:key="'category'+index"
		    		:label="item.category_name" :value="item.category_id">  			
		    		</el-option>
		   </el-select>
		  </el-form-item>
		  <el-form-item label="服装品类类目:" >
		    <el-select v-model="computedForm.style_id" placeholder="服装品类类目" style="width:75%">
		    	<el-option 
		    		v-for="(item, index) in receiptContent.style"
		    		:key="'styles'+index"
		    	:label="item.style_name" :value="item.style_id"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="加工模式:">
		    <el-radio-group v-model="computedForm.mode_id" style="padding-top:8px">
		    <el-radio 
		    	v-for="(item, index) in computedMode"
		    	:key="'mode'+ index"
		    	:label="item.mode_id">  {{item.mode_name}} </el-radio>					
			</el-radio-group>				
			</el-form-item>
	</div>
</template>
<script>
	export default{
		name: "sheet",
		props:['receiptContent','submitReceipt'],
		data(){
			return {
				form: {
					name: '',
					cate_id: "",
					style_id: '',
					mode_id:''
				}
			}
		},
		computed:{
			computedForm(){				
				if( !Array.isArray(this.receiptContent.done) ){
					this.form.name = this.receiptContent.done.details.name 
					this.form.cate_id= this.receiptContent.done.details.category_id
					this.form.style_id= this.receiptContent.done.details.style_id
					this.form.mode_id= this.receiptContent.done.details.mode_id
				}
				return this.form
			},
			computedMode(){
				if(this.receiptContent.mode.length == 1){
					this.form.mode_id = this.receiptContent.mode[0].mode_id
				}
				return this.receiptContent.mode
			}
		},
		watch:{
			form:{
				handler(cur){
					// console.log(cur)
					this.submitReceipt.name = cur.name
					this.submitReceipt.cate_id = cur.cate_id
					this.submitReceipt.style_id = cur.style_id
					this.submitReceipt.mode_id = cur.mode_id
				},
				deep:true
			}
		}

	}
</script>
<style scoped>
	
</style>