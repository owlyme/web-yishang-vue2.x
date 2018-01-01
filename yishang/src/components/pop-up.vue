<template>
	<div class="pop-mask">
		<div class="pop clearfix">
			<div @click="close" class="close-xy">×</div>
			<div class="images">
				<img src="/static/popup/load-app.jpg">
			</div>
			<div class="message">
				<h6>接单注册认证</h6>
				<p>对不起，您还未通过接单注册认证，暂时无法发单<br> 扫码下载衣依APP，进行认证，更多惊喜等着你</p>
			</div>
		</div>
		
	</div>
</template>
<script >
	export default{
		data(){
			return{

			}
		},
		mounted(){
			document.querySelector('body').style.overflow = 'hidden'
		},
		destroyed(){
			document.querySelector('body').style.overflow = 'auto'
		},
		methods: {
			close(){
				this.$emit('update:popup', false)
			},
			open(){

			}
		}
	}
</script>
<style scoped>
html, body{
	height: 100%;
	overflow: hidden;
}

.pop-mask{
	position: absolute;
	z-index: 98;
	width: 100%;
	height: 100%;
	background: rgba(77,77,77,0.8);
}
	.pop{
		display: block;
		position: absolute;
		z-index: 99;
		width: 772px;
		height: 306px;
		top: 50%;
		left: 50%;
		margin-left: -386px;
		margin-top: -153px;
		text-align: center;
		background: #fff;
	}
	.images{
		float: left;
		width: 270px;
		height: 100%;
		background: rgb(148, 46, 234);
	}
	.images img{
		width: 100%;
		height: 100%;
	}
	.message{
		float: left;
		width: 502px;
		padding:80px 20px;
		color:rgb(148, 46, 234);
		line-height: 40px;
	}
	.message h6{
		color: #555;
		font-weight: 700;
		font-size: 1.1em;
	}
	
	.close-xy{
		display: block;
		position: absolute;
		top: -10px;
		right: -10px;
		height: 20px;
		line-height: 17px;
		width: 20px;
		color: #fff;
		border-radius: 10px;
		background: rgb(102,102,102); 
		font-size: 1.3em;
		font-weight: 800;
		cursor: pointer;
	}
	.close-xy:hover{
		color:red;
		background: #fff; 
	}
</style>