<template>
	<div>schedule</div>
<!-- <div class="container-detail" v-if="activeIndex">
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
</div> -->
</template>

<script>
	
</script>

<style type="text/css">
	
</style>