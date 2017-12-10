<template>
	<!-- xue yao xiang wai gei yi ge suo yin -->
<div class="list-element">
	<b-media tag="div" class="goods">
		<b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />
		<h5 class="mt-0 mb-1 goods-title">
			<span class="model">{{ goodsMsg.model }}</span> 
			<span class="status">{{ goodsMsg.status }}</span>
			</h5>
		<b-container class="bv-example-row">
			<b-row align-v="center" no-gutter="true">
				<b-col>完成件数：{{ goodsMsg.done }}/{{ goodsMsg.total }} </b-col>
				<b-col>单间价格：{{ goodsMsg.price }}元 </b-col>
				<b-col>交货时间：{{ goodsMsg.date }} </b-col>
				<b-col>
					<b-row align-v="center">
					<b-col>
						{{ goodsMsg.plan}} 
						<br>
						{{ goodsMsg.tiemPass}}
					</b-col>
					<b-col>
						<el-button type="primary" @click="view">查看</el-button>
					</b-col>
					</b-row>
				</b-col>
			</b-row>
    	</b-container>		
	</b-media>
</div>
</template>
<script>
	export default{
		name: "",
		props: ["goodsMsg"],
		data(){
			return{
				// goodsMsg: goodsMsg
			}
		},
		methods:{
			view(){
				console.log('view')
			}
		}

	}
</script>
<style scoped>
.goods{
	position: relative;
}
.goods-title{
	height: 30px;
	border-bottom: 2px dashed #eeeeee;
}

.goods li{
	list-style: none;
	width: 25%;
	float: left;
	border-left: 1px solid #e0e0e0;
	text-align: center;
}
.goods li:first-child{
	border-left: 0px solid #e0e0e0;
}
.plan{
	position: absolute;
	display: flex;
	justify-content: center ;
	align-items:center ;
	height: 46px;
	width: 153px;
	right: 0;
	top: 10px;
	background: #C44DDC;
	border-radius: 5px;
	color: #fff;
}
.plan.danger{
	background: rgb(255,25,27);
}
.plan-danger{

}
.list-element{
	background: #fff;
	margin-bottom: 12px;
}
</style>