<template>
<div class="list-element">
	<b-media tag="div" class="goods">
		<b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />
		<h5 class="mt-0 mb-1 goods-title">
			<span class="model">{{ goodsMsg.model }}</span> 
			<span class="status">{{ goodsMsg.status }}</span>
			</h5>
		<ul class="clearfix">
			<li>完成件数：{{ goodsMsg.done }}/{{ goodsMsg.total }}</li>
			<li>单间价格：{{ goodsMsg.price }}元</li>
			<li>交货时间：{{ goodsMsg.date }}</li>
		</ul>
		<div class="plan danger"> 131 teraetwe</div>
	</b-media>
</div>
</template>
<script>
	export default{
		name: "listelement",
		props: ["goodsMsg"],
		data(){
			return{
				// goodsMsg: goodsMsg
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
	width: 30%;
	float: left;
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