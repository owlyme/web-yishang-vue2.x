<template>
<div class="container-detail">
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
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		name: 'schedule',
		props: ['order_id'],
		data(){
			return{
				graph1Active: 0,
				graph2Active: 0,
				graph3Active: 0,
				isLoading: 1,
				selectSchedule:{},
			}
		},
		mounted(){
			this.getSchedule(this.order_id)
		},
		computed:{
			...mapGetters(['getIndentBlock']),
		    getUploadUrl(){  return this.Api.loadImgUrl },
		    curSchedule(){	return this.selectSchedule  },
		},
		methods:{
		    getSchedule(id){
		      	this.Schedule({order_id: id }).then((res)=>{
		      		console.log('schedule')
		      		// res.data = this.Schedule11 
		          if(res.data.status == 200){
		          	this.$set(this.selectSchedule,'details',res.data.content.details)
		          	this.$set(this.selectSchedule,'history',res.data.content.history) 
		          	this.setGraph(this.selectSchedule.details.status)
		          	this.isLoading = 0;
		          }else{
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