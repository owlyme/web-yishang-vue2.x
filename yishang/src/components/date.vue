<template>
	<div>
		<div>
			<el-form-item label="加工单价:" class="dates">
			     <div class="el-input">
			     	<input autocomplete="off" v-model="computedForm.fee"  placeholder=""  rows="2" min="1" validateevent="true" class="el-input__inner"
			     	:keyup="onlyNumber()">
			     </div>
			     <div class="after"> 元/件 </div>
			 </el-form-item>
			 <el-form-item label="加工总价:">
			     <span class="color size">{{ total_fee }}</span> 元
			 </el-form-item>
			 <el-form-item label="抢单截止时间:" class="dates">
			    <el-date-picker	 
			    :picker-options="pickerOptions1"
			    v-model="computedForm.expire_time"
			    value-format="yyyy-MM-dd HH-mm-ss"
			    type="datetime" style="width:100%"  align='center' placeholder="选择时间">  </el-date-picker>
			    <div class="el-icon-date after"></div>
			 </el-form-item>
			 <el-form-item label="面辅料完备到场日期:" class="dates">
			    <el-date-picker  
			    :picker-options="pickerOptions2"	
			    v-model="computedForm.arrival_date" 
			     value-format="yyyy-MM-dd" 
			     type="date"	 
			     style="width:100%"  align='center' placeholder="选择日期">  </el-date-picker>
			    <div class="el-icon-date after"></div>
			 </el-form-item>
			<el-form-item label="交货日期:" class="dates">
			    <el-date-picker	
			    :picker-options="pickerOptions3"
			    v-model="computedForm.delivery_date"  value-format="yyyy-MM-dd" type="date"	style="width:100%" align='center' placeholder="选择日期">  </el-date-picker>
			    <div class="el-icon-date after"></div>
			 </el-form-item>
		</div>
	</div>	
</template>
<script>
	export default{
		name: "date",
		props:['receiptContent','submitReceipt'],
		data(){
			return{
				form: {
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
				console.log('total_fee')
				let total_fee = 0;
				total_fee = this.submitReceipt.demanding_account * this.submitReceipt.fee
				// this.submitReceipt.total_fee = total_fee
				this.$set(this.submitReceipt, 'total_fee',total_fee)
				return total_fee || 0
			},
			pickerOptions1(){
				return {	
						disabledDate(time) {
		           				return time.getTime() < Date.now();
					       	}
					    }
			},
			pickerOptions2(){
				let date = this.submitReceipt.expire_time || 0
				let expire_time = (new Date(this.submitReceipt.expire_time)).getTime()  || Date.now()
				return {	
							disabledDate(time) {
		           				return time.getTime() < expire_time;
					       	}
					    }
			},
			pickerOptions3(){
				let date = this.submitReceipt.arrival_date || 0
				let arrival_date = (new Date( date )).getTime()|| Date.now()
				return {	disabledDate(time) {
		           				return time.getTime() < arrival_date;
					       	}
					    }
			},
			computedForm(){
				if( !Array.isArray(this.receiptContent.done) ){
					this.form.fee = this.receiptContent.done.details.fee
					this.form.total_fee= this.receiptContent.done.details.total_fee
					this.form.expire_time= this.receiptContent.done.details.expire_time
					this.form.arrival_date= this.receiptContent.done.details.arrival_date
					this.form.delivery_date= this.receiptContent.done.details.delivery_date
				}
				return this.form
			}
		},
		watch:{
			form:{
				handler(cur){
					this.submitReceipt.fee = cur.fee
					this.submitReceipt.total_fee= cur.total_fee
					this.submitReceipt.expire_time= cur.expire_time
					this.submitReceipt.arrival_date= cur.arrival_date
					this.submitReceipt.delivery_date= cur.delivery_date
				},
				deep: true
			}
		},
		methods:{
			onlyNumber(){
				if(this.submitReceipt.fee){
					let str = this.submitReceipt.fee
					str = str.toString().replace(/[^0-9.]\D*$/,"")
					this.$set(this.submitReceipt, 'fee', str)
				}				
			},
			dateRange(){
				let date = this.submitReceipt.expire_time || 0
				let expire_time = (new Date(this.submitReceipt.expire_time)).getTime()  || Date.now()
				let date1 = this.submitReceipt.arrival_date || 0
				let arrival_date = (new Date( date )).getTime()|| Date.now()
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