<template>
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
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
	export default{
		name: 'detail',
		props: ['order_id'],
		data(){
			return{
				isLoading: 1,
				isActive: false,				
				size : ["颜色(数量)","尺码 XS","S","M","L","XL","XXL","3XL","4XL"], 
				selectDetails: {}
			}
		},
		mounted(){
			console.log('detail')
			this.getDetails(this.order_id);
		},
		computed:{
			...mapGetters(['getIndentBlock']),
		    getUploadUrl(){  return this.Api.loadImgUrl },
		    curDetails(){	return this.selectDetails }
		},
		methods:{
		    getDetails(id){
			  this.Details({order_id: id }).then((res)=>{
			  	// res.data = this.detail11 
		          if(res.data.status == 200){
		          		this.$set(this,'selectDetails', res.data.content)
		          		this.isLoading = 0;         	
		          }
		      })
		    }
		}
	}
</script>

<style scoped>
	.isloading{
		position: relative;
    	height: 200px;
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