<template>
	<div>
		<div>
			<el-form-item label="加工单价:" class="dates">
			     <div class="el-input">
			     	<input autocomplete="off" v-model="dateForm.fee"  placeholder=""  rows="2" min="1" validateevent="true" class="el-input__inner"
			     	:keyup="onlyNumber()">
			     </div>
			     <div class="after"> 元/件 </div>
			 </el-form-item>
			 <el-form-item label="加工总价:">
			     <span class="color size">{{ total_fee }}</span> 元
			 </el-form-item>
			 <el-form-item label="抢单截止时间:" class="dates">
			    <el-date-picker	 
			    v-model="dateForm.expire_time"
			    value-format="yyyy-MM-dd HH-mm-ss"
			    type="datetime" style="width:100%" disabledDate="true" align='center' placeholder="选择时间">  </el-date-picker>
			    <div class="el-icon-date after"></div>
			 </el-form-item>
			 <el-form-item label="面辅料完备到场日期:" class="dates">
			    <el-date-picker 	v-model="dateForm.arrival_date"  value-format="yyyy-MM-dd" type="date"	  style="width:100%"  align='center' placeholder="选择日期">  </el-date-picker>
			    <div class="el-icon-date after"></div>
			 </el-form-item>
			<el-form-item label="交货日期:" class="dates">
			    <el-date-picker	  v-model="dateForm.delivery_date"  value-format="yyyy-MM-dd" type="date"	style="width:100%" align='center' placeholder="选择日期">  </el-date-picker>
			    <div class="el-icon-date after"></div>
			 </el-form-item>
		</div>
	</div>	
</template>
<script>
	export default{
		name: "date",
		props: ['total'],
		data(){
			return{
				dateForm: {
		          fee: '',
		          total_fee:'',
				  expire_time: '',
				  arrival_date:'',
				  delivery_date: ''
		        },
			}
		},
		computed:{
			total_fee(){
				return this.total * this.dateForm.fee
			}
		},
		watch:{
			dateForm:{
				handler(curVal,oldVal){
						curVal.total_fee = this.total_fee
						this.$emit("setPeriod",curVal)
		　　　　　　},
		　　　　deep:true
			}
		},
		methods:{
			cantPiker(){
			},
			onlyNumber(){
				if(this.dateForm.fee){
					let str = this.dateForm.fee
					str = str.toString().replace(/[^0-9]\D*$/,"")
					this.$set(this.dateForm, 'fee', str)
				}
				
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