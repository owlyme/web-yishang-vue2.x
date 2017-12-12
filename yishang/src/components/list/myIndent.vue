<template>
	<div>
		<el-row :gutter="10">
		  <el-col :span="5">
		  	<div class="myIndent">我的订单</div>
			          <ul class="nav-vertal">
	          	<li  v-for="(item, index) in listNav"
	          		:index="index" 
	          		class="liEle"
	          		:class="{active : item.flag}"
	          		@click="fliter(index)">
	          		{{item.type}} <span v-if="(item.num-0)">( {{item.num}} )</span>
	          	</li>
	          </ul>
		  </el-col>
		  <el-col :span="19">
		  		<div class="myIndent">{{contentTitle}}</div>
		  		<div v-for="(item,index) in myMgoodsList" :index="index+'indent'">
		  			<IndentList :goodsMsg="item"></IndentList>
		  		</div>
		  </el-col>
		</el-row>
	</div>
	
</template>
<script>
import IndentList from "../indentlistEl"
	export default{
		name: 'indet',
		components:{ IndentList},
		data(){
			return{
				isActive: false,
				activeIndex: '1',
				listNav: [
					{
						type: "所有订单",
						num: 12,
						flag: false
					},
					{
						type:"待发前期资料",
						num: 3,
						flag: false
					},
					{
						type:"待发样衣",
						num: 0,
						flag: false
					},
					{
						type:"待发面料",
						num: 3,
						flag: false
					},
					{
						type:"待发辅料",
						num: 0,
						flag: false
					},
					{
						type:"延误",
						num: 0,
						flag: false
					},
					{
						type:"抢单中",
						num: 3,
						flag: false
					},
					{
						type:"加工中",
						num: 2,
						flag: false
					},
					{
						type:"待付款收货",
						num: 1,
						flag: false
					},
					{
						type:"待评价",
						num: 1,
						flag: false
					},
					{
						type:"取消订单",
						num: 0,
						flag: false
					},
					{
						type:"已完成",
						num: 1,
						flag: false
					}
				],
				contentTitle:"所有订单",
				myMgoodsList:[
     			{
     				model: "2017款女装连衣裙夏季款时尚修身起码齐全",
     				status: "待发样衣、待发辅料、待发面料",
					done: 30,
					total:200,
					price: 66,
					date: "2017-10-12",
					plan: "离资料完备12天14小时"
     			},
     			{
     				model: "shirt",
     				status: "doing",
					done: 30,
					total:200,
					price: 66,
					date: "2017-10-12",
					plan: "离资料完备12天14小时"
     			},
     			{
     				model: "shirt",
     				status: "doing",
					done: 30,
					total:200,
					price: 66,
					date: "2017-10-12",
					plan: "离资料完备12天14小时"
     			},
     		]
			}
		},
		methods:{
			handleSelect(key, keyPath) {
		        console.log(key, keyPath);
		    },
		    fliter(index){
		    	let self = this;
		    	self.listNav.forEach((item, _index)=>{
		    		self.$set(item,"flag",false)
		    		if(index == _index){
		    			self.$set(item,"flag",true)
		    			self.contentTitle= item.type
		    		}
		    	});

		    }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	li{
		list-style: none;
	}
	.myIndent{
		color: #555;
		height: 54px;
		line-height: 54px;
		/*width: 220px;*/
		background: rgb(238,238,238);
		font-size: 0.8em;
		text-indent: 20px;
	}
	.liEle{
		color: #555;
		border: 2px solid rgba(255,255,255,0);
		height: 54px;
		line-height: 54px;
		/*width: 220px;*/
		font-size: 0.8em;
		text-indent: 30px;
		cursor: pointer;
	}
	.liEle:hover{
		background: #C44DDC;
		color: #fff;
	}
	.active{
		color: #C44DDC;
		border-left-color: #C44DDC;
	}
</style>