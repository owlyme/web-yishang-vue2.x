<template>
	<div id="indent">
		<div class="container">
			<!-- 我的订单信息 -->
			<el-row :gutter="10" v-if="getIndentBlock" style="weidth : 100%">
			  <el-col :span="5">
			  	<div class="myIndent">我的订单</div>
				    <ul class="nav-vertal">
		          	<li  v-for="(item, index) in listNav"
		          		:index="index" 
		          		class="muneNav"
		          		:class="{active : item.flag}"
		          		@click="fliter(index, item.keyword)" 
		          		>
		          		{{item.type}} <span v-if="(item.num-0)">( {{item.num}} )</span>
		          	</li>
		          </ul>
			  </el-col>
			  <el-col :span="19">
			  		<div class="myIndent">{{contentTitle}}</div>
			  		<div v-for="(item,index) in goodsList" :index="index+'indent'">
			  			<IndentList :goodsMsg="item" v-on:change="switchBlock"></IndentList>
			  		</div>
			  </el-col>
			</el-row>

			<!-- 进度图标 -->
			<div v-else>
			<!-- 	<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				  <el-menu-item index="1">订单进度</el-menu-item>
				  <el-menu-item index="2">订单详情</el-menu-item>
				</el-menu> -->
				<div class="nav-schedule-details el-menu-demo clearfix">
					<ul>
						<li @click="changeActiveIndex">订单进度</li>
						<li @click="changeActiveIndex">订单详情</li>
					</ul>
				</div>

				<div class="container-detail" v-if="activeIndex">
					<div >
						<b-container class="bv-example-row  border-top padding-around" >
		     			 <b-row cols="4"  >
		     			 	<b-col cols="3" ><img alt="订单图片" :src="getUploadUrl+'/'+selectSchedule.details.front_picture"></b-col>
		     			 	<b-col cols="9">
		     			 	
	     			 		<h5>当前进度: <span class="color"> {{ selectSchedule.details.status_msg }}</span></h5>
		     			 		<div class="text-style">订单名称: <span> {{selectSchedule.details.name}}</span></div>
		     			 		<div class="text-style">交货时间: <span> {{selectSchedule.details.delivery_date}}</span></div>
		     			 		<div class="text-style">生产周期: <span> {{selectSchedule.details.cycle}} 天</span></div>
		     			 		<div class="text-style">面辅料完备时间: <span> {{selectSchedule.details.arrival_date}}</span></div>
		     			 		<div class="text-style">接单方:
		     			 			<span v-for="(item, index) in selectSchedule.details.undertake_company"> 
		     			 			{{ item.company}} </span></div>
		     			 		<div class="text-style">完成件数:<span> {{selectSchedule.details.done_account}}/ {{selectSchedule.details.demanding_account}}</span></div>
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
							<el-steps :active="graph1Active" align-center class="graph1">
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
							<el-steps :active="graph2Active" align-center class="graph2">
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
							<el-steps :active="graph3Active" align-center class="graph3">
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
						<div class="goods-details  border-top padding-around">
							<h5>订单动态</h5>
							<div class="padding-top">
							  <el-steps direction="vertical" :active="3">
							  	<el-step title="步骤 1" 
							  		v-for="(item, index) in selectSchedule.history"
							  		:key="'history'+ index"
							  	  :description="item"></el-step>
							  </el-steps>
							</div>
						</div>
					</div>
				</div>
				<div class="container-detail1" v-else>
					<div class="jiben border-top detail-inner">
						<h6>基本信息</h6>
						<ul class="clearfix">
							<li>订单名称: <span>{{selectDetails.details.name}}</span></li>
							<li>加工总价: <span>{{selectDetails.details.total_fee}}</span></li>
							<li>接单方: <span
								v-for="(item, index) in selectDetails.details.undertake_company" :key='index'
								>{{item}}</span></li>

							<li>商品类别: <span>{{selectDetails.details.style}}</span></li>
							<li>交货时间: <span>{{selectDetails.details.delivery_date}}</span></li>
							<li>发单方: <span>{{selectDetails.details.publish_company.company}}</span></li>

							<li>商品颜色: <span>{{selectDetails.details.color}}</span></li>
							<li>生产周期: <span>{{selectDetails.details.cycle}}</span></li>
							<li>加工模式: <span>{{selectDetails.details.mode}}</span></li>

							<li>商品属性: <span>{{selectDetails.details.x}}</span></li>
							<li>面料完备日期: <span>{{selectDetails.details.arrival_date}}</span></li>
							<li>是否支付定金: <span>{{selectDetails.details.is_deposited}}</span></li>

							<li>单价价格: <span>{{selectDetails.details.fee}}</span></li>
							<li>订单号: <span>{{selectDetails.details.code}}</span></li>
							<li>完成件数: <span>{{selectDetails.details.done_account}}</span></li>
						</ul>
					</div>
					<div class="mianliao border-top detail-inner">
						<h6>面料信息(主面料1)</h6>
						<ul>
							<li>面料名称： <span>{{selectDetails.main.name}}</span></li>
							<li>面料成分： <span>{{selectDetails.main.component}}</span></li>
							<li>面料类型： <span>{{selectDetails.main.category}}</span></li>
							<li>面料克重： <span>{{selectDetails.main.weight}}</span>克/平方米</li>
						</ul>
						<div class="mianliao-icon border-top">
							<div v-for="item in selectDetails.main.picture">
								<img :src="getUploadUrl+'/'+ item" />
							</div>
						</div>
					</div>
					<div class="mianliao border-top detail-inner">
						<div v-for="item in selectDetails.main.auxiliary">
							<h6>面料信息(辅面料1)</h6>
							<ul class="clearfix">
								<li>面料名称： <span>{{item.name}}</span></li>
								<li>面料成分： <span>{{item.component}}</span></li>
								<li>面料类型： <span>{{item.category}}</span></li>
								<li>面料克重： <span>{{item.weight}}</span>克/平方米</li>
							</ul>
							<div class="mianliao-icon border-top">
								<div v-for="item in item.picture">
									<img :src="getUploadUrl+'/'+ item" />
								</div>
							</div>
						</div>
						
					</div>
					<div class="yangyi border-top detail-inner">
						<h6>样衣图片</h6>
						<div class="mianliao-icon">
							<ul v-for="item in selectDetails.otherPic">
								<li v-for="item1 in item.picture">
									<img :src="getUploadUrl+'/'+ item1" />
								</li>
								<li>{{ item.title }}</li>
							</ul>
						</div>
					</div>
					<div class="yanseshuliang border-top detail-inner">
						<h6>颜色数量</h6>
						<div>
							

						</div>
					</div>
					<div class="pinzhi border-top detail-inner">
						<h6>品质要求</h6>
						<div class="chahuo">
							<p>查货选择： <span>{{selectDetails.quality.check}}</span> 要求信息： <span>{{selectDetails.quality.requirement}}</span></p>
							<p>整体允许误差范围： <span>{{selectDetails.quality.error}}</span></p>
						</div>
						<div class="buwei border-top">
							<ul class="thead">
								<li>部位</li>
								<li>误差标准范围</li>
							</ul>
							<ul class="tbody" v-for="(item, index) in selectDetails.quality.supplement" :key="'supplement1'+index">
								<li>{{item.name}}</li>
								<li>{{item.err}}</li>
							</ul>
						</div>
					</div>
					<div class="banxing border-top detail-inner">
						<h6>版型图</h6>
						<div class="mianliao-icon border-top">
							<div v-for="item in selectDetails.quality.picture">
								<img :src="getUploadUrl+'/'+ item" />
							</div>
						</div>					
					</div>
					<div class="qita border-top detail-inner"  v-for="(item, index) in selectDetails.supplement" :key="'supplement'+index">
						<h6>其他<span>({{index+1}})</span> </h6>
						<div class="chahuo">
							面料名称: {{item.requirement}}
						</div>
						<div class="buwei border-top">
							<div v-for="item1 in item.picture">
								<img :src="getUploadUrl+'/'+ item1" />
							</div>
						</div>				
					</div>
					<div class="address border-top detail-inner">
						<h6>收货地址</h6>
						<div> 
							{{selectDetails.address.province}}
							{{selectDetails.address.city}}
							{{selectDetails.address.county}}
							{{selectDetails.address.street}}
							({{selectDetails.address.receiver}} 收)
							{{selectDetails.address.phone}}
						</div>									
					</div>
				</div>
			</div>
		</div>
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

import qs from 'qs';
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
	export default{
		name: 'indet',
		components:{ IndentList},
		data(){
			return{
				graph1Active: 0,
				graph2Active: 0,
				graph3Active: 0,
				displayIndent:true,
				isActive: false,
				activeIndex: true,
				listNav: [
					  {
			            type: "所有订单",
			            keyword: 'x',
			            flag: false
			          },
			          {
			            type:"待接单",
			            keyword: '1000',
			            flag: false
			          },
			          {
			            type:"待发资料",
			            keyword: '3000',
			            flag: false,
		          	  }, 
		          	  {
		                  type:"待发样衣",
		                  keyword: '3xx0',
		                  flag: false
		                },
		                {
		                  type:"待发面料",
		                  keyword: '3x0x',
		                  flag: false
		                },
		                {
		                  type:"待发辅料",
		                  keyword: '30xx',
		                  flag: false
		                },
			          {
			            type:"加工中",
			            keyword: '4000',
			            flag: false
			          },
			          {
			            type:"待收货",
			            keyword: '5000',
			            flag: false
			          },
			          {
			            type:"待评价",
			            keyword: '6000',
			            flag: false
			          },			     
			          {
			            type:"已完成",
			            keyword: '7000',
			            flag: false
			          }],
				size : ["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"], 
				contentTitle:"所有订单",
				goodsList:[],
				savedList:[],
				selectSchedule:{},
				selectDetails: {}
			}
		},
		mounted(){
			// console.log(this.getIndentBlock)
			this.getMainlist({page: 1})
		},
		computed:{
			...mapGetters([
		      'getIndentBlock',
		      'getUploadUrl',
		      'getUrl'
		    ]),
		    curSchedule(){
		    	return this.selectSchedule
		    },
		    curDetails(){
		    	return this.selectDetails
		    }
		},
		watch: {
			// selectSchedule:{
			// 	handler(curVal,oldVal){

			//   　　　  },
			//  　　　		deep:true
			// },
			// selectDetails: {
			// 	handler(curVal,oldVal){

			//    　　},
			//  　　　		deep:true
			// }
		},
		methods:{
			...mapMutations([
		      'setIndentBlock'
		    ]),
		    getMainlist(args){
		      let url= this.getUrl+'/Home/Index/index'
		      this.axios.post(url, qs.stringify(args)).then((res)=>{
		          // console.log(res)
		          if(res.data.status == 200){
		            this.perPage =  res.data.content.pageSize;
		            this.totalRows = res.data.content.totalRows-0;
		          //  this.goodsList = res.data.content.list;
		            this.savedList =  res.data.content.list;
		            this.goodsList = this.savedList.slice(0, this.savedList.length)
		            console.log(this.goodsList)
		          }else{
		          }          
		      })  
		    },
		    getSchedule(id){
		    	let url= this.getUrl+'/Home/ReceiptOrder/schedule'
		      	this.axios.post(url, qs.stringify({order_id: id }))
		      	.then((res)=>{
		          if(res.data.status == 200){
		          	this.$set(this.selectSchedule,'details',res.data.content.details)
		          	this.$set(this.selectSchedule,'history',res.data.content.history)			
		            // this.selectSchedule = res.data.content		         
		          	// console.log( this.selectSchedule)
		          }else{
		          }          
		      	})  
		    },
		    getDetails(id){
		    	let url= this.getUrl+'/Home/ReceiptOrder/details'
			      this.axios.post(url, qs.stringify({order_id: id }))
			      .then((res)=>{
		           console.log(res)
		          if(res.data.status == 200){
		          		console.log( res.data.content)
		          		this.$set(this,'selectDetails',res.data.content)		          		
		          		console.log( this.selectDetails)		          	
		          }else{
		          }          
		      })  
		    },
		    switchBlock(uid){
		    	//console.log(uid)
		    	this.setIndentBlock(false)
		    	this.getSchedule(uid)
		    	this.getDetails(uid)

		    	console.log(this.selectSchedule)
		    },
		    changeActiveIndex(){
		    	this.activeIndex = !this.activeIndex
		    },
		    fliter(index, keyword){
		    	let self = this;
		    	self.listNav.forEach((item, _index)=>{		    		
		    		self.$set(item,"flag",false)
		    		if(index == _index){
		    			self.$set(item,"flag",true)
		    			self.contentTitle= item.type
		    		}
		    	});
		    	this.displayOrNot(keyword)
		    },		    
		    displayOrNot(keyword){
		      let self = this;
		      self.goodsList= [];
		      self.savedList.forEach((item, _index)=>{ 
		         if(item.status == keyword ){
		            self.goodsList.push(self.savedList[_index])
		         }
		      });
		    },
		    showSchedule(){

		    },
		    showDetails(){

		    }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#indent{
		background: rgb(248,248,248);
	}
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
	.nav-vertal{
		background: #fff;
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
	.col-3 img{
		width: 100%;

	}
	.goods-details{

	}

	.text-style{
		text-indent: 1.5em;
		height: 30px;
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

	/*detail*/
	.detail-inner{
		padding: 30px;
	}
	.nav-schedule-details li{
		float: left;
		width: 25%;
		height: 55px;
		line-height: 55px;
		text-align: center;
		border-bottom: 2px solid rgba(255,255,255,0);
	}
	.nav-schedule-details li:hover{
		cursor: pointer;
		color: #C44DDC;
		border-bottom: 2px solid #C44DDC;
	}
	.jiben ul li {
		float: left;
		width: 33.33%;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
	}
</style>