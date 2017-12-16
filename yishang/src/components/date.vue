<template>
	<div >
		<el-form-item label="加工单价:">
		    <el-input v-model="dateForm.price" placeholder="" style="width:75%"></el-input>
		 </el-form-item>
		 <el-form-item label="加工总价:">
		     <span class="color size">{{3000}}</span> 件
		 </el-form-item>
		 <el-form-item label="抢单截止时间:">
		    <el-date-picker	 v-model="dateForm.end"   type="date" style="width:75%"	  placeholder="选择时间">  </el-date-picker>
		 </el-form-item>
		 <el-form-item label="面辅料完备到场日期:">
		    <el-date-picker 	v-model="dateForm.ready"   type="date"	  style="width:75%" placeholder="选择日期">  </el-date-picker>
		 </el-form-item>
		<el-form-item label="交货日期:">
		    <el-date-picker	  v-model="dateForm.over"   type="date"	style="width:75%"  placeholder="选择日期">  </el-date-picker>
		 </el-form-item>
	</div>
</template>
<script>
	export default{
		name: "date",
		data(){
			return{
				dateForm: {
		          price: '',
		          totalPrice:'',
				  end: '',
				  ready:'',
				  over: ""
		        },
			}
		},
		watch:{
			dateForm:{
				handler(curVal,oldVal){
		　　　　　　　　console.log(curVal)
						this.$emit("setPeriod",curVal)
		　　　　　　},
		　　　　deep:true
			}
		},
		methods:{

		}
	}
</script>
<style >

</style>