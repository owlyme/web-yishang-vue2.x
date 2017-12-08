<template>
	<div>
		<el-form-item label="加工单价">
		    <el-input v-model="form.price" placeholder=""></el-input>
		 </el-form-item>
		 <el-form-item label="加工总价">
		    <el-input v-model="form.totalPrice" placeholder=""></el-input>
		 </el-form-item>
		 <el-form-item label="抢单截止时间">
		    <el-date-picker	  v-model="value"   type="date"	  placeholder="选择时间">  </el-date-picker>
		 </el-form-item>
		 <el-form-item label="面辅料玩备到场日期">
		    <el-date-picker	v-model="value"   type="date"	  placeholder="选择日期">  </el-date-picker>
		 </el-form-item>
		<el-form-item label="交货日期">
		    <el-date-picker	  v-model="value"   type="date"	  placeholder="选择日期">  </el-date-picker>
		 </el-form-item>
	</div>
</template>
<script>
	export default{
		name: "date",
		data(){
			return{
				form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
			}
		},
		methods:{

		}
	}
</script>
<style >
	
</style>