<template>
	<div id="indent">
		<div class="container">
			<!-- 我的订单信息 -->
			<div v-if="getIndentBlock">
				<el-row :gutter="10"  style="weidth : 100%">
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
				  		<div v-if="goodsList.length" v-for="(item,index) in goodsList" :key="index+'indent'">
				  			<IndentList :goodsMsg="item" v-on:change="switchBlock(item.order_id)"></IndentList>
				  		</div>
				  </el-col>
				</el-row>
				<!-- pagination -->
		        <div class="container pagination " >  	
		         <b-row  class="owl">
		            <b-col >
		              <b-pagination
		              :total-rows="totalRows" 
		              v-model="currentPage" 
		              first-text="首页"
		              prev-text="上一页"
		              next-text="下一页"
		              last-text="末页"
		              :per-page="perPage" >
		              </b-pagination>
		              <span class="total-pages">共{{ Math.ceil( totalRows / perPage) }}页</span>
		            </b-col>
		         </b-row>  
		  	   </div>
			</div>
			<!-- 进度图标 -->
			<div class="bg-white" v-else >
				<div class="nav-schedule-details el-menu-demo clearfix">
					<ul>
						<li @click="changeActiveIndex" :class="{active : activeIndex}">订单进度</li>
						<li @click="changeActiveIndex" :class="{active : !activeIndex}">订单详情</li>
					</ul>
				</div>
				<div class="container-detail" v-if="activeIndex">
					<div class="isloading border-top" v-if="isLoading">
						<div class="el-loading-spinner"><i class="el-icon-loading"></i><p class="el-loading-text">拼命加载中</p></div>
					</div>
					<div  v-if="selectSchedule.details">
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
		     			 			<span > 
		     			 			{{ selectSchedule.details.undertake_company.company}} </span></div>
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
							<el-steps :active="graph3Active" align-center class="graph3">
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
							<el-steps :active="graph1Active" align-center class="graph1">
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
						<div class="goods-details  border-top padding-around" v-if="selectSchedule.history">
							<h5>订单动态</h5>
							<div class="padding-top">
							  <el-steps direction="vertical" :active="3">
							  	<el-step title="" 
							  		v-for="(item, index) in selectSchedule.history"
							  		:key="'history'+ index"
							  	  	:description="item.create_time + item.operation"></el-step>
							  </el-steps>
							</div>
						</div>
					</div>
				</div>

				<div class="container-detail1" v-else>
					<div class="isloading border-top" v-if="isLoading">
						<div class="el-loading-spinner"><i class="el-icon-loading"></i><p class="el-loading-text">拼命加载中</p></div>
					</div>
					<div v-else >
						<div class="jiben border-top detail-inner" v-if="selectDetails.details">
							<h6>基本信息</h6>
							<ul class="clearfix">
								<li>订单名称: <span>{{selectDetails.details.name}}</span></li>
								<li>订单号: <span>{{selectDetails.details.code}}</span></li>
								<li>接单方: <span>{{ selectDetails.details.undertake_company.company }}</span></li>

								<li>商品类别: <span>{{selectDetails.details.style}}</span></li>
								<li>生产周期: <span>{{selectDetails.details.cycle}}</span></li>
								<li>加工模式: <span>{{selectDetails.details.mode}}</span></li>

								<li>单价价格: <span>{{selectDetails.details.fee}}</span></li>
								<li>加工总价: <span>{{selectDetails.details.total_fee}}</span></li>
								<li>是否支付定金: 
									<span v-if="parseInt(selectDetails.details.is_deposited)">是</span>
									<span v-else>否</span>
								</li>
								
								<li>完成件数: <span>{{selectDetails.details.done_account}} / {{selectDetails.details.demanding_account}}</span></li>
								<li>面料完备日期: <span>{{selectDetails.details.arrival_date}}</span></li>
								<li>交货时间: <span>{{selectDetails.details.delivery_date}}</span></li>
							</ul>
						</div>
						<div class="mianliao border-top detail-inner" v-if="selectDetails.main">
							<h6>面料信息(主面料1)</h6>
							<ul>
								<li>面料名称： <span>{{selectDetails.main.name}}</span></li>
								<li>面料成分： <span>{{selectDetails.main.component}}</span></li>
								<li>面料克重： <span>{{selectDetails.main.weight}}</span>克/平方米</li>
								<li>面料米重： <span>{{selectDetails.main.grammage}}</span>克/平方米</li>
								<li>门幅宽度： <span>{{selectDetails.main.width}}
													{{selectDetails.main.units}}</span></li>
							</ul>
							<div class="mianliao-icon border-top clearfix ">
								<div v-for="item in selectDetails.main.picture" class="inner-icon">
									<img :src="getUploadUrl+'/'+ item" />
								</div>
							</div>
						</div>
						<div class="mianliao border-top detail-inner" v-if="selectDetails.auxiliary">
							<div v-for="item in selectDetails.auxiliary">
								<h6>面料信息(辅面料1)</h6>
								<ul class="clearfix">
									<li>面料名称： <span>{{item.name}}</span></li>
									<li>面料成分： <span>{{item.component}}</span></li>
									<li>面料克重： <span>{{item.weight}}</span>克/平方米</li>
									<li>面料米重： <span>{{item.grammage}}</span>克/平方米</li>
									<li>门幅宽度： <span>{{item.width}}{{item.units}}</span></li>
								</ul>
								<div class="mianliao-icon border-top clearfix ">
									<div v-for="item in item.picture" class="inner-icon">
										<img :src="getUploadUrl+'/'+ item" />
									</div>
								</div>
							</div>						
						</div>
						<div class="yangyi border-top detail-inner"  >
							<h6>样衣图片</h6>
							<div class="mianliao-icon clearfix">
								<ul class="inner-icon" v-if="selectDetails.details.front_picture">
									<li >
										<img :src="getUploadUrl+selectDetails.details.front_picture" />
									</li>
									<li>正面全览图</li>
								</ul>
								<ul class="inner-icon" v-if="selectDetails.details.back_picture">
									<li >
										<img :src="getUploadUrl+selectDetails.details.back_picture" />
									</li>
									<li>背面全览图</li>
								</ul>
								<ul class="inner-icon" v-if="selectDetails.details.left_picture">
									<li >
										<img :src="getUploadUrl+selectDetails.details.left_picture" />
									</li>
									<li>左侧全览图</li>
								</ul>
								<ul class="inner-icon" v-if="selectDetails.details.right_picture">
									<li >
										<img :src="getUploadUrl+selectDetails.details.right_picture" />
									</li>
									<li>右侧全览图</li>
								</ul>
								<ul class="inner-icon" 
									v-if="selectDetails.details.part_picture.length"
									v-for="(item,index) in selectDetails.details.part_picture" 
									:key="index">
									<li>
										<img :src="getUploadUrl+item"/>
									</li>
									<li>局部细节图</li>
								</ul>

								<ul v-for="item in selectDetails.otherPic" class="inner-icon">
									<li>
										<img  v-for="item1 in item.picture" :src="getUploadUrl+ item1" />
									</li>
									<li>{{ item.title }}</li>
								</ul>
							</div>
						</div>
						<div class="yanseshuliang border-top detail-inner" v-if="selectDetails.size">
							<h6>颜色数量</h6>
							<div class="clearfix">
								<ul class="thead">
									<li v-for="(item,index) in size" :key="'size1'+index">
										{{ item }}
									</li>
								</ul>
								<ul class="tbody" v-for="(item,index) in selectDetails.size" :key="'size2'+index">
									<li>{{ item.color }}</li>
									<li>{{ item.xs_demanding_account }}</li>
									<li>{{ item.s_demanding_account }}</li>
									<li>{{ item.m_demanding_account }}</li>
									<li>{{ item.l_demanding_account }}</li>
									<li>{{ item.xl_demanding_account }}</li>
									<li>{{ item.xxl_demanding_account }}</li>
									<li>{{ item.xxxl_demanding_account }}</li>
									<li>{{ item.xxxxl_demanding_account }}</li>
								</ul>
							</div>
						</div>
						<div class="pinzhi border-top detail-inner" v-if="selectDetails.quality">
							<h6>品质要求</h6>
							<div class="chahuo">
								<p>品质要求： <span>{{selectDetails.quality.quality_requirement}}</span></p>
								<p>查货选择： <span>{{selectDetails.quality.check}}</span> 要求信息： <span>{{selectDetails.quality.requirement}}</span></p>
								<p>整体允许误差范围： <span>{{selectDetails.quality.error}}</span></p>
							</div>
							<!-- <div class="buwei border-top clearfix">
								<ul class="thead">
									<li>部位</li>
									<li>误差标准范围</li>
								</ul>
								<ul class="tbody" v-for="(item, index) in selectDetails.quality.supplement" :key="'supplement1'+index">
									<li>{{item.name}}</li>
									<li>{{item.err}}</li>
								</ul>
							</div> -->
						</div>
						<div class="banxing border-top detail-inner" v-if="selectDetails.quality">
							<h6>尺寸表</h6>
							<div class="mianliao-icon clearfix ">
								<div v-for="item in selectDetails.quality.size_table" class="inner-icon">
									<img :src="getUploadUrl+'/'+ item" />
								</div>
							</div>
							<h6>工艺单</h6>
							<div class="mianliao-icon clearfix ">
								<div v-for="item in selectDetails.quality.process_list" class="inner-icon">
									<img :src="getUploadUrl+'/'+ item" />
								</div>
							</div>
							<h6>版型图</h6>
							<div class="mianliao-icon clearfix ">
								<div v-for="item in selectDetails.quality.picture" class="inner-icon">
									<img :src="getUploadUrl+'/'+ item" />
								</div>
							</div>					
						</div>
						<div class="qita border-top detail-inner" 
							v-if="selectDetails.supplement"
						 	v-for="(item, index) in selectDetails.supplement" 
						 	:key="'supplement'+index">
							<h6>其他<span>({{index+1}})</span> </h6>
							<div class="chahuo">
								面料名称: {{item.requirement}}
							</div>
							<div class="buwei border-top clearfix ">
								<div v-for="item1 in item.picture" class="inner-icon">
									<img :src="getUploadUrl+'/'+ item1" />
								</div>
							</div>				
						</div>
						<div class="address border-top detail-inner" v-if="selectDetails.address">
							<h6>收货地址</h6>
							<div > 
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
	</div>
</template>
<script>
	import IndentList from "../indentlistEl"
	import qs from 'qs';
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	import { mapMutations } from 'vuex'
	export default{
		name: 'indent',
		components:{ IndentList},
		data(){
			return{
				graph1Active: 0,
				graph2Active: 0,
				graph3Active: 0,
				isLoading: 1,
				displayIndent:true,
				isActive: false,
				activeIndex: true,
				listNav: [
					  {
			            type: "所有订单",
			            keyword: 'x',
			            flag: true
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
				size : ["颜色(数量)","尺码 XS","S","M","L","XL","XXL","3XL","4XL"], 
				contentTitle:"所有订单",
				currentStatus: 'x',
				goodsList:[],
				savedList:[],
				selectSchedule:{},
				selectDetails: {},
				totalRows: 1,
				perPage : 1,
		   		currentPage: 1
			}
		},
		mounted(){
			this.getMainlist({status: 'x'})
		},
		watch:{
		    currentPage:{
		      handler(curVal,oldVal){
		        this.getMainlist( {page: curVal,status: this.currentStatus} )
		      },
		      deep:true
		    }
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
		methods:{
			...mapMutations([
		      'setIndentBlock'
		    ]),
		    getMainlist(args){
		      this.Index(args).then((res)=>{
		      	if(res.data.status == 200){
		            this.perPage =  res.data.content.pageSize;
		            this.totalRows = res.data.content.totalRows-0;
		            this.savedList =  res.data.content.list;
		            this.goodsList = this.savedList.slice(0, this.savedList.length)
		          }          
		      	})  
		    },
		    getSchedule(id){
		      	this.Schedule({order_id: id }).then((res)=>{
		          if(res.data.status == 200){
		          	this.$set(this.selectSchedule,'details',res.data.content.details)
		          	this.$set(this.selectSchedule,'history',res.data.content.history) 
		          	this.setGraph(this.selectSchedule.details.status)
		          	this.isLoading = 0;
		          }else{
		          }          
		      	})  
		    },
		    getDetails(id){
			  this.Details({order_id: id }).then((res)=>{
		          if(res.data.status == 200){
		          		this.$set(this,'selectDetails',res.data.content)
		          		this.isLoading = 0;         	
		          }
		      })
		    },
		    switchBlock(uid){
		    	this.setIndentBlock(false)
		    	this.getSchedule(uid)
		    	this.getDetails(uid)
		    },
		    changeActiveIndex(index){
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
		      this.getMainlist({status: keyword})
		      return 
		      let self = this;
		      self.goodsList= [];
		      self.savedList.forEach((item, _index)=>{
		         if(item.status[0] == '3' && item.status.indexOf('000') == -1 ){
		            if(keyword[1] == item.status[1] ){
		               self.goodsList.push(self.savedList[_index])
		            }
		            if(keyword[2] == item.status[2] ){
		               self.goodsList.push(self.savedList[_index])
		            }
		            if(keyword[3] == item.status[3] ){
		               self.goodsList.push(self.savedList[_index])
		            }
		         }else if(item.status == keyword || keyword == 'x') {
		           self.goodsList.push(self.savedList[_index])
		         }
		      })
		    },
		    setGraph(status){
		    	let step = 3;
		    	if( status[0] < 3 ){
		    		this.graph1Active=0
		    		this.graph2Active= parseInt(status[0])
		    		this.graph3Active=0
		    	}else if(status[0] == '3'){
		    		this.graph1Active=parseInt(status[1])+step
		    		this.graph2Active=parseInt(status[2])+step
		    		this.graph3Active=parseInt(status[3])+step
		    	}else if( status[0] > '3'){
		    		this.graph1Active=5
		    		this.graph2Active=parseInt(status[0])+step -1
		    		this.graph3Active=5
		    	}
		    }		 
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#indent{
		margin-top: 20px;
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
	.isloading{
		position: relative;
    	height: 200px;
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
	.buwei ul,
	.yanseshuliang ul{		
		float: left;
		margin-right: 20px;
	}
	.yanseshuliang .thead li{
		text-align: right;
	}

	.thead li,.tbody li{
		font-size: 14px;
		color: rgb(102, 102, 102);
		margin-bottom: 20px;
	}
	.tbody li{
		text-align: center;
		color: rgb(6, 6, 6);
	}
	.inner-icon{
		float: left;
		margin: 30px 30px 0 0;
		padding:1px;
		text-align: center;
		border: 1px solid #e0e0e0;
	}
	.inner-icon img{
		width: 140px;
		height: 140px;
		padding: 5px;
	}
	.banxing .inner-icon img{
		width: 200px;
	}
</style>