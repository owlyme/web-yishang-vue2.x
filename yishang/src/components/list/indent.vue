<template>
	<div>
		<!-- 我的订单信息 -->
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

		<!-- 进度图标 -->
		<div v-else>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			  <el-menu-item index="1">订单进度</el-menu-item>
			  <el-menu-item index="2">订单详情</el-menu-item>
			</el-menu>

			<div class="container-detail">
				<b-container class="bv-example-row  border-top padding-around">
     			 <b-row cols="4" align-v="center" >
     			 	<b-col cols="3" ><img src="" alt="订单图片"></b-col>
     			 	<b-col cols="9">
     			 		<!-- <h4>当前进度: <span> {{}}</span></h4> -->
     			 		<h5>当前进度: <span style="color: #C44DDC"> 待发前期资料</span></h5>
     			 		<div class="text-style">当前进度:</div>
     			 		<div class="text-style">当前进度:</div>
     			 		<div class="text-style">当前进度:</div>
     			 		<div class="text-style">当前进度:</div>
     			 		<div class="text-style">当前进度:</div>
     			 		<div class="text-style">当前进度:</div>
     			 		<div class="text-style">当前进度:</div>
     			 	</b-col>
     			 </b-row>
     			</b-container>
				<div class="goods-details  border-top padding-around">					
					<h5>进度详情</h5>
					<div class="graph">
						<div class="graph-bg">
							<div class="rect"></div>
							<div class="rectp-round"></div>
						</div>
					<el-steps :active="3" align-center class="graph1">
					  <el-step class="stephidden" title="" description=""></el-step>
					  <el-step class="stephidden" title="" description=""></el-step>
					  <el-step title="待发样衣" description=""></el-step>
					  <el-step title="待收样衣" description=""></el-step>
					  <el-step title="已收样衣" description=""></el-step>
					  <el-step class="stephidden" title="" description=""></el-step>
					  <el-step class="stephidden" title="" description=""></el-step>
					  <el-step class="stephidden" title="" description=""></el-step>
					  <el-step class="stephidden" title="" description=""></el-step>
					</el-steps>
					<el-steps :active="2" align-center class="graph2">
					  <el-step title="等待接单" description=""></el-step>	
					  <el-step title="待选工厂" description=""></el-step>

					  <el-step title="待发面料" description=""></el-step>
					  <el-step title="待收面料" description=""></el-step>
					  <el-step title="已收面料" description=""></el-step>

					  <el-step title="生产加工" description=""></el-step>
					  <el-step title="待收货付款" description=""></el-step>
					  <el-step title="等待评价" description=""></el-step>
					  <el-step title="已评价" description=""></el-step>
					</el-steps >
					<el-steps :active="1" align-center class="graph3">
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step title="待发辅料" description=""></el-step>
					  <el-step title="待收辅料" description=""></el-step>
					  <el-step title="已收辅料" description=""></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>
					  <el-step class="stephidden" ></el-step>
					</el-steps>
					</div>
				</div>
				<div class="goods-details  border-top padding-around" >
					<h5>订单动态</h5>
					<div class="padding-top">
					  <el-steps direction="vertical" :active="1">
					    <el-step title="步骤 1" description="这是一段很长很长"></el-step>
					    <el-step title="步骤 2" description="这是一段很长很长"></el-step>
					    <el-step title="步骤 3" description="这是一段很长很长"></el-step>
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
	.goods-details{

	}

	.text-style{
		text-indent: 1.5em
	}
	.container-detail-list{
		height: 345px;		
	}
	.stephidden{
		height: 0px;overflow: hidden;
	}
	.graph{
		position: relative;
		height: 350px;
		padding-top: 50px;
		width: 100%;
	}
	.graph1,
	.graph2,
	.graph3{
		position: relative;		
		height: 100px;
		width: 100%;
		z-index:4;
	}
	
	.graph-bg{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 0;
	}
	.graph-bg .rect{
		position: absolute;
		left: 22.22%;
		top: 10px;
		width: 33.334%;
		height: 201px;
		border: 2px solid #C44DDC;
	}
	.graph-bg .rectp-round{
		position: absolute;
		left: 23.99%;
	    top: -29px;
	    width: 29.22%;
	    height: 300px;
		height: 300px;
		border: 2px dashed #C44DDC;
		border-radius: 20px;
		border-color: #C44DDC;
		background:  rgba(196,77,220,0.07);
	}
	
	
</style>