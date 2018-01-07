<template>
	<div class="">
		<h5>颜色数量</h5>
		<div v-for="(item, index) in diffKind" class="border-box" >
			<el-row :gutter="10"  class="bg">	 
			  <el-col :span="6" class="text-center"> 款色(颜色): </el-col>
			  <el-col :span="14">
			  		<el-input v-model="item.color" placeholder="款色(颜色)"></el-input>
			  </el-col>
	 		  <el-col :span="4" class="text-center show-btn" >
	 		  	<div class="hovershow" @click="clickDisplay(index)">
	 		  		<span class="clickshow"  v-if="item.flag" > 收起 </span> 
	 		  		<span class="clickclose"  v-else="item.flag" > 展开 </span> 
	 		  		<i v-if="index" class="el-icon-delete" @click.stop="clickDelete(index)"></i>
	 		  	</div>
	 		  </el-col>
			</el-row>
			<div v-if="item.flag" >
				<el-row :gutter="10" v-for="(item1, index1) in item.sizes" class="number" :key="'row'+index1">
					  <el-col :span="6" class="textright">
					  	<div class="grid-content bg-purple">
					  		{{ index1 == 0 ?"尺码:" : ''}}  {{item1.size}}
						</div>
					  </el-col>
					  <el-col :span="14">
					  	<div class="grid-content bg-purple">
						  	<el-input-number v-model="item1.number" :min="0"  label="描述文字" class="fulid-width" ></el-input-number>
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
	data () {
		return {
			displaySizeList: false,
			clothes:{},
			activeNames: [],
			size : ["XS","S","M","L","XL","XXL","3XL","4XL"], 
			clothes: {
				color: '',
				number: '',
				type: '',
				size: [],
				flag: false
			},
			diffKind: [
				{
					color: '',
					type: '',
					sizes : [
						{size: "XS", number: 0},
						{size: "S", number: 0},
						{size: "M", number: 0},
						{size: "L", number: 0},
						{size: "XL", number: 0},
						{size: "XXL", number: 0},
						{size: "3XL", number: 0},
						{size: "4XL", number: 0}
					], 
					flag: true
				},
			]
		}
	},
	computed:{
		demanding_account(){
			let total=0 ;
			this.diffKind.forEach((item, index)=> {
				item.sizes.forEach( (_item, _index)=> {
					total += _item.number
				})
			})
			return total
		}
	},
	watch:{
		diffKind:{
			handler(curVal, oldVal){
				let total = this.demanding_account
				let value = []
				curVal.forEach( (item, index)=>{
					let obj = {};
					value.push({
					color:item.color,
					xs_demanding_account    : item.sizes[0].number ,
					s_demanding_account     : item.sizes[1].number,
					m_demanding_account     : item.sizes[2].number,
					l_demanding_account     : item.sizes[3].number,
					xl_demanding_account    : item.sizes[4].number,
					xxl_demanding_account   : item.sizes[5].number,
					xxxl_demanding_account  : item.sizes[6].number,
					xxxxl_demanding_account : item.sizes[7].number,
					})
				})
				this.$emit("setColor",value, total)
			},
			deep:true
		}
	},
	methods:{
		clickDisplay(index){
			let self = this;
			self.diffKind.forEach((item, _index)=>{
				if( index == _index ){
					self.$set(item,"flag", !item.flag)
				}
			});
		},
		clickDelete(index){
			this.diffKind.splice(index,1)
		},
		addKind(){
			let clothes= {
				color: '',
				number: '',
				type: '',
				sizes : [
				// {size: "XXS", number: 0},
				{size: "XS", number: 0},
				{size: "S", number: 0},
				{size: "M", number: 0},
				{size: "L", number: 0},
				{size: "XL", number: 0},
				{size: "XXL", number: 0},
				{size: "3XL", number: 0},
				{size: "4XL", number: 0},
				// {size: "5XL", number: 0}
				], 
				flag: false
			};
			this.diffKind.push( clothes );		
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