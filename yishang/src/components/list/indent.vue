<template>
	<div>
		<el-row :gutter="10" v-if="displayIndent">
		  <el-col :span="5">
		  	<div class="myIndent">我的订单</div>
			    <ul class="nav-vertal">
	          	<li  v-for="(item, index) in listNav"
	          		:index="index" 
	          		class="muneNav"
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
		<div v-else>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			  <el-menu-item index="1">订单进度</el-menu-item>
			  <el-menu-item index="2">订单详情</el-menu-item>
			</el-menu>
			<div class="line"></div>
			<div class="container-detail">
				<el-row>
					<el-col :span="6">qqq</el-col>
					<el-col :span="18">cccc	</el-col>
				</el-row>
				<div class="goods-details">
					<h6>进度详情</h6>
					<div class="graph">
					<el-steps :active="3" align-center>
					  <el-step class="stephidden" title="步骤1" description=""></el-step>
					  <el-step class="stephidden" title="步骤2" description=""></el-step>
					  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤1" description="这是一段很长很长"></el-step>
					  <el-step class="stephidden" title="步骤2" description=""></el-step>
					  <el-step class="stephidden" title="步骤3" description=""></el-step>
					  <el-step class="stephidden" title="步骤4" description=""></el-step>
					  <el-step class="stephidden" title="步骤1" description=""></el-step>
					  <el-step class="stephidden" title="步骤2" description=""></el-step>
					  <el-step class="stephidden" title="步骤3" description=""></el-step>					  
					</el-steps>
					<el-steps :active="2" align-center>
					  <el-step title="步骤1" description="这是一段很长很长"></el-step>	
					  <el-step title="步骤2" description="这是一段很长很长很"></el-step>
					  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤1" description="这是一段很长很长"></el-step>
					  <el-step title="步骤2" description="这是一段很长很长很"></el-step>
					  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤1" description="这是一段很长很长"></el-step>
					  <el-step title="步骤2" description="这是一段很长很长很"></el-step>
					  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>	
					</el-steps >
					<el-steps :active="11" align-center >
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤1" description="这是一段很长很长"></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>					  
					</el-steps>
					</div>
				</div>
				<div class="goods-details">
					<h6>订单动态</h6>
					<div style="height: 300px;">
					  <el-steps direction="vertical" :active="1">
					    <el-step title="步骤 1"></el-step>
					    <el-step title="步骤 2"></el-step>
					    <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
					  </el-steps>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
import IndentList from "../indentlistEl"
	export default{
		name: 'indet',
		components:{ IndentList},
		data(){
			return{
				displayIndent:false,
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
	.muneNav{
		color: #555;
		border: 2px solid rgba(255,255,255,0);
		height: 54px;
		line-height: 54px;
		/*width: 220px;*/
		font-size: 0.8em;
		text-indent: 30px;
		cursor: pointer;
	}
	.muneNav:hover{
		background: #C44DDC;
		color: #fff;
	}
	.active{
		color: #C44DDC;
		border-left-color: #C44DDC;
	}



	.stephidden{
		height: 0px;overflow: hidden;
	}

</style>