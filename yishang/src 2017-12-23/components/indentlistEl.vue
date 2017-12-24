<template>
	<!-- xue yao xiang wai gei yi ge suo yin -->
<div class="list-element">
	<b-media tag="div" class="goods">
		<b-img slot="aside" :width="108" :height="108" :src="imgsrc" alt="placeholder" />
		<h5 class="mt-0 mb-1 goods-title">
			<span class="model">{{ goodsMsg.name }}</span> 
			<span class="status">{{ goodsMsg.state }}</span>
			</h5>
		<b-container class="bv-example-row" >
			<b-row align-v="center"  class="xy-row">
				<b-col >完成件数：{{ goodsMsg.done_account }}/{{ goodsMsg.demanding_account }} </b-col>
				<b-col >单间价格：{{ goodsMsg.fee}}元 </b-col>
				<b-col >交货时间：{{  goodsMsg.delivery_date }} </b-col>
				<b-col>
					<b-row align-v="center" class="inner">
						<b-col cols="5" v-html="goodsMsg.msg">
							{{ goodsMsg.msg}} 			
						</b-col>
						<b-col cols="5">
							<el-button type="primary" @click="view(goodsMsg.uid)">查看</el-button>
						</b-col>
					</b-row>
				</b-col>
				
			</b-row>
    	</b-container>
    	<div class="type-wuyou" v-if="goodsMsg.type == 2"><div class="rotate">无忧</div></div>	
	</b-media>
	
</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default{
		name: "",
		props: ["goodsMsg","change"],
		data(){
			return{
			}
		},
		computed:{
	      ...mapGetters([
	          'getUploadUrl',
	          'getUrl'
	        ]),
	      imgsrc(){
	      	return this.getUploadUrl+this.goodsMsg.front_picture
	      }
	    },
		methods:{
			view(uid){
				this.$emit('change', uid)
			}
		}
	}
</script>
<style scoped>
.container,
.list-element{
	width: 100%;
}
.list-element{
	position: relative;
	min-height: 150px;
	padding: 25px;
}
.list-element:hover{
	padding: 24px;
	box-shadow: 0 0px 15px rgba(130, 130, 157, 0.5);
}
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
.bv-example-row{
	padding:0;
	/*height: 80%;*/
	padding-top:10px;
	height: 30px;
	line-height: 30px
}
.inner{
	line-height: 1.2em;
	text-align: center;	
}

</style>