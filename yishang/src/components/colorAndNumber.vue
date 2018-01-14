<template>
	<div class="">
		<h5>颜色数量</h5>
		<div v-for="(item, index) in size" class="border-box" >
			<el-row :gutter="10"  class="bg">	 
			  <el-col :span="6" class="text-center"> 款色(颜色): </el-col>
			  <el-col :span="14">
			  		<el-input v-model="item.color" placeholder="款色(颜色)"></el-input>
			  </el-col>
	 		  <el-col :span="4" class="text-center show-btn" >
	 		  	<div class="hovershow" @click="clickDisplay(index)">
	 		  		<span class="clickshow"  v-if="flags[index].flag" > 收起 </span> 
	 		  		<span class="clickclose"  v-else="flags[index].flag" > 展开 </span> 
	 		  		<i v-if="index" class="el-icon-delete" @click.stop="clickDelete(index)"></i>
	 		  	</div>
	 		  </el-col>
			</el-row>
			<div v-if="flags[index].flag" >
				<el-row :gutter="10"  class="number" >
					  <el-col :span="6" class="textright">
					  	<div class="grid-content bg-purple">
					  		尺码: XS
						</div>
					  </el-col>
					  <el-col :span="14">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="item.xs_demanding_account" :min="0"  label="描述文字" class="fulid-width" ></el-input-number>
						</div>
					  </el-col>
				</el-row>
				<el-row :gutter="10"  class="number" >
					  <el-col :span="6" class="textright">
					  	<div class="grid-content bg-purple">
					  		S
						</div>
					  </el-col>
					  <el-col :span="14">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="item.s_demanding_account" :min="0"  label="描述文字" class="fulid-width" ></el-input-number>
						</div>
					  </el-col>	
				</el-row>
				<el-row :gutter="10"  class="number" >
					  <el-col :span="6" class="textright">
					  	<div class="grid-content bg-purple">
					  		M
						</div>
					  </el-col>
					  <el-col :span="14">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="item.m_demanding_account" :min="0"  label="描述文字" class="fulid-width" ></el-input-number>
						</div>
					  </el-col>	
				</el-row>
				<el-row :gutter="10"  class="number" >
					  <el-col :span="6" class="textright">
					  	<div class="grid-content bg-purple">
					  		L
						</div>
					  </el-col>
					  <el-col :span="14">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="item.l_demanding_account" :min="0"  label="描述文字" class="fulid-width" ></el-input-number>
						</div>
					  </el-col>	
				</el-row>
				<el-row :gutter="10"  class="number" >
					  <el-col :span="6" class="textright">
					  	<div class="grid-content bg-purple">
					  		XL
						</div>
					  </el-col>
					  <el-col :span="14">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="item.xl_demanding_account" :min="0"  label="描述文字" class="fulid-width" ></el-input-number>
						</div>
					  </el-col>	
				</el-row>
				<el-row :gutter="10"  class="number" >
					  <el-col :span="6" class="textright">
					  	<div class="grid-content bg-purple">
					  		XXL
						</div>
					  </el-col>
					  <el-col :span="14">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="item.xxl_demanding_account" :min="0"  label="描述文字" class="fulid-width" ></el-input-number>
						</div>
					  </el-col>	
				</el-row>
				<el-row :gutter="10"  class="number" >
					  <el-col :span="6" class="textright">
					  	<div class="grid-content bg-purple">
					  		3XL
						</div>
					  </el-col>
					  <el-col :span="14">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="item.xxxl_demanding_account" :min="0"  label="描述文字" class="fulid-width" ></el-input-number>
						</div>
					  </el-col>		
				</el-row>
				<el-row :gutter="10"  class="number" >
					  <el-col :span="6" class="textright">
					  	<div class="grid-content bg-purple">
					  		4XL
						</div>
					  </el-col>
					  <el-col :span="14">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="item.xxxxl_demanding_account" :min="0"  label="描述文字" class="fulid-width" ></el-input-number>
						</div>
					  </el-col>				  
				</el-row>
			</div>
		</div>		
		<div class="middle-line">
			<el-button type="primary" icon="el-icon-plus" @click="addKind" class="circle-btn"></el-button>
		</div>
		<div>总价: <span class="color size">{{demanding_account}}</span> 件</div>
	</div>
</template>

<script>
export default {
	name: "color",
	props:['receiptContent','submitReceipt'],
	data () {
		return {
			displaySizeList: false,
			flags: [{flag: true}],
			
		}
	},
	computed:{
		demanding_account(){	
			let total = 0;	
			this.submitReceipt.size.forEach((item, index)=> {
			console.log("this.submitReceipt.size.", item)
					total += item.xs_demanding_account  
							+ item.s_demanding_account   
							+ item.m_demanding_account   
							+ item.l_demanding_account   
							+ item.xl_demanding_account  
							+ item.xxl_demanding_account 
							+ item.xxxl_demanding_account
							+ item.xxxxl_demanding_account
				})
			this.submitReceipt.demanding_account =total
			return total
		},
		size(){			
			this.submitReceipt.size.forEach( (item, index)=>{
				if(index+1 > this.flags.length ){
					this.flags.push({flag: true})
				}
			})
			return this.submitReceipt.size
		}

	},
	methods:{
		clickDisplay(index){
			this.flags.forEach((item, _index)=>{
				if( index == _index ){
					this.$set(item,"flag", !item.flag)
				}
			});
		},
		clickDelete(index){
			this.submitReceipt.size.splice(index,1)
			this.flags.splice(index,1)
		},
		addKind(){
			let clothes= 
				{
					color:null,
					xs_demanding_account    : 0,
					s_demanding_account     : 0,
					m_demanding_account     : 0,
					l_demanding_account     : 0,
					xl_demanding_account    : 0,
					xxl_demanding_account   : 0,
					xxxl_demanding_account  : 0,
					xxxxl_demanding_account : 0
				}
			this.submitReceipt.size.push( clothes );
			// this.flags.push({flag: true})	
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
	    border: none;
	    &:last-child {
	      margin-bottom: 0;
	    }
	}
	.el-collapse-item__header{
		background-color: #999;
	}
	.bg{
		background: rgb(204,204,204);
		line-height: 50px;
		padding: 10px;
	}
	.show-btn{
		cursor: pointer;
	}
	.border-box{
		margin: 15px 0;
		border: 1px solid rgb(204,204,204);
	}
	.clickshow:after {
	    padding-left: 10px;
	    content: "▼";
	    color: #999;
	}
	.clickclose:after {
	    padding-left: 10px;
	    content: "▲";
	    color: #999;
	}
	.hovershow .el-icon-delete{
		margin-left: 10px;
		opacity: 0;
	}
	.hovershow:hover .el-icon-delete{
		opacity: 1;
	}
	.el-icon-delete:hover{
		color: #C44DDC;
	}
	.number{
		margin: 25px 0;
	}
</style>