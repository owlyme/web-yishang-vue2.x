<template>
	<div>
		<router-view></router-view>
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
		  			<IndentList :goodsMsg="item" v-on:change="switchBlock"></IndentList>
		  		</div>
		  </el-col>
		</el-row>
	</div>
	
</template>
<script>
//http://101.132.187.244:8082/Home/ReceiptOrder/schedule  order_id
const indentContent={
	details: {
			order_id: null,
			front_picture: null, 
			name: null,
			fee : null,
			total_fee: null, 
			delivery_date: null, 
			cycle : null,
			arrival_date: null, 
			code : null,
			mode: null,
			done_account : null,
			demanding_account : null,
			is_deposited: null,
			status: null,
			style: null, 
			status_msg: null, 
			remander: null,
			publish_company: {company:null},//发单公司
			undertake_company:{company:null}
		},
	history:{
		log_id : null,
		operation : null,
		create_time: null
	}
};

//http://101.132.187.244:8082/Home/ReceiptOrder/details  order_id
const detailsContent={
	details:{
		order_id:null,
		front_picture :null,
		name :null,
		fee:null,
		total_fee:null,
		expire_time :null,
		delivery_date :null,
		arrival_date:null,
		cycle :null,
		code :null,
		mode :null,
		done_account :null,
		demanding_account :null,
		is_deposited :null,
		status:null,//1000 等待接单； 2000 待选工厂； 3xx0 待发样衣； 3x0x 待发面料； 30xx 待发辅料； 3xx1 待收样衣； 3x1x 待收面料； 31xx 待收辅料； 3xx2 已收样衣； 3x2x 已收面料； 32xx 已收辅料； 3300 待发前期资料； 3400 待收前期资料； 4000 生成加工； 5000 待收货付款； 6000 等待评价； 60x1 发单方评价； 601x 接单房评价； 7000 已评价；9000订单已取消；9100订单已关闭；(x代表该位上能取到的任意值）
		style :null,
		back_picture:null,
		left_picture :null,
		right_picture :null,
		part_picture:null, 
		type:null,//单子类型：1普通发单，2无忧发
		undertake_company:{
			company: null
		}
	},
	main:{//主面料
		fabric_id:null,
		name:null,
		component:null,
		category:null,
		weight:null,
		picture:null,
	},
	auxiliary:{//辅面料
		fabric_id:null,
		name:null,
		component:null,
		category:null,
		weight:null,
		picture:null,
	},
	otherPic:{//其他图片
		part_id: null,  
		title: null, 
		picture: null, 
	},
	size:{
		size_id:null,
		color:null,
		xs_demanding_account :null,
		xs_done_account :null,
		s_demanding_account:null,
		s_done_account :null,
		m_demanding_account:null, 
		m_done_account :null,
		l_demanding_account:null,
		l_done_account :null,
		xl_demanding_account:null,
		xl_done_account :null,
		xxl_demanding_account :null,
		xxl_done_account :null,
		xxxl_demanding_account:null,
		xxxl_done_acount:null,
		xxxxl_demanding_account :null,
		xxxxl_done_acount:null,
		total_demanding_account:null,
		total_done_account: null
	},
	quality:{
		quality_id:null,
		check :null,
		error:null,
		supplement:null,
		requirement:null,
		picture:null,
	},
	supplement:{
		supplement_id:null,
		requirement:null,
		picture:null,
	},
	address:{
		address_id:null,
		receiver:null,
		phone:null,
		province :null,
		city :null,
		county :null,
		street:null,
	} 
}


import IndentList from "../indentlistEl"


	export default{
		name: 'indet',
		components:{ IndentList},
		data(){
			return{
				displayIndent:true,
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
		created(){
			this.displayIndent =true
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
		    },
		    switchBlock(){
		    	console.log(123123)
		    	this.displayIndent = !this.displayIndent
		    	console.log(this.displayIndent)
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