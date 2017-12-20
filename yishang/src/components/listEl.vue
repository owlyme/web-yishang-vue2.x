<template>
<div class="list-element">
	<b-media tag="div" class="goods">
		<b-img slot="aside" width="108" height="108" alt="placeholder" :src='imgsrc' />
		<h5 class="mt-0 mb-1 goods-title" >
			<span class="model">{{ goodsMsg.name }}</span> 
			<span class="status">{{ goodsMsg.state }}</span>
		</h5>
		<b-container class="bv-example-row">
			<b-row align-v="center" align-h="center" class="center">
				<b-col>完成件数：{{ goodsMsg.done_account }}/{{ goodsMsg.demanding_account }} </b-col>
				<b-col>单件价格：{{ goodsMsg.fee }}元 </b-col>
				<b-col>交货时间：{{ goodsMsg.delivery_date }} </b-col>
				<b-col>  </b-col>
				<b-col>  </b-col>
				<b-col>  </b-col>
			</b-row>
    	</b-container>

		<div class="plan " 
		:class="{ danger: goodsMsg.msg_color == 0, cancel :  goodsMsg.msg_color == -1 }"
		 v-html="goodsMsg.msg"> {{goodsMsg.msg}}</div>
		<div class="type-wuyou" v-if="goodsMsg.type == 2"><div class="rotate">无忧</div></div>
	</b-media>
	
</div>
</template>
<script>
import { mapGetters } from 'vuex'
	export default{
		name: "listelement",
		props: ["goodsMsg"],
		data(){
			return{
				// goodsMsg: goodsMsg
			}
		},
		computed:{
	      ...mapGetters([
	          'getUploadUrl'
	        ]),
	      imgsrc(){
	      	return this.getUploadUrl+ "/"+this.goodsMsg.front_picture
	      }
	    },
	}
</script>
<style scoped>
.list-element{
	position: relative;
	height: 150px;
	padding: 25px;
}
.list-element:hover{
	padding: 24px;
	box-shadow: 0 0px 15px rgba(130, 130, 157, 0.5);
}
.list-element,
.goods{
	width: 100%;
	position: relative;
}
.goods-title{
	width: 100%;
	height: 50px;
	line-height: 50px;
	border-bottom: 2px dashed #eeeeee;
}
.bv-example-row{
	height: 80%;
	height: 50px;
	line-height: 50px;	
}
.bv-example-row .col{ 
	font-size: 14px;
}
.goods li{
	list-style: none;
	width: 30%;
	float: left;
}
.goods img{
	border: 1px solid #eeeeee;
	padding:1px;
}
.media-body{
	width: 80%;
}
.plan{
	position: absolute;
	display: flex;
	justify-content: center ;
	align-items:center ;
	font-size: 15px;
	height: 48px;
	width: 152px;
	right: 0;
	margin-top: -30px;
	top: 50%;
	background: rgb(148,46,234);
	border-radius: 2px;
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
.status{
	display: inline-block;
	padding: 0 15px;
	background-image: url(../assets/status-bg.jpg);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-size: 100% 77%;
    background-position-y: 7px;
}
.cancel{
	background: #eeeeee;
}

</style>