<template>
	<div>
		<div >
			<el-form-item label="加工单价:" class="dates">
			    <el-input v-model="dateForm.price" placeholder="" ></el-input>
			     <div class="after"> 元/件 </div>
			 </el-form-item>
			 <el-form-item label="加工总价:">
			     <span class="color size">{{3000}}</span> 件
			 </el-form-item>
			 <el-form-item label="抢单截止时间:" class="dates">
			    <el-date-picker	 v-model="dateForm.end"   type="date" style="width:100%" disabledDate="true" align='center' placeholder="选择时间">  </el-date-picker>
			    <div class="el-icon-date after"></div>
			 </el-form-item>
			 <el-form-item label="面辅料完备到场日期:" class="dates">
			    <el-date-picker 	v-model="dateForm.ready"   type="date"	  style="width:100%"  align='center' placeholder="选择日期">  </el-date-picker>
			    <div class="el-icon-date after"></div>
			 </el-form-item>
			<el-form-item label="交货日期:" class="dates">
			    <el-date-picker	  v-model="dateForm.over"   type="date"	style="width:100%" align='center' placeholder="选择日期">  </el-date-picker>
			    <div class="el-icon-date after"></div>
			 </el-form-item>
		</div>
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
						//console.log(curVal)
						this.$emit("setPeriod",curVal)
		　　　　　　},
		　　　　deep:true
			}
		},
		methods:{
			cantPiker(){
				console.log(12313)
			}
		}
	}
</script>
<style >
.after{
  position: absolute;
  top: 0px;
  height: 20px;
  right: 20px;
  font-size: 1.1em;
}
.dates .after:before{
	position: absolute;
    top: 14px;
    right: 10px;
    opacity: 0.5;
}
.dates:hover .after:before{
	opacity: 1	;
	color: rgb(148, 46, 234);
}
</style>