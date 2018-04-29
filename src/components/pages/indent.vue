<template>
	<div id="indent">		
		<div class="container">
			<div class="bg-white">
			<div class="nav-schedule-details el-menu-demo clearfix" 
				v-if='!computedListView'>
				<ul>
					<router-link :to="{name:'Schedule', params: { order_id: getCurrentOrderID }}">订单进度</router-link>
					<router-link :to="{name:'Detail', params: { order_id: getCurrentOrderID }}">订单详情</router-link>
				</ul>
			</div>
			
			<router-view/>
		</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{	
				indentMessage: true,
			}
		},
		computed:{
			...mapGetters(['getCurrentOrderID']),
			computedListView() {
				if(this.$route.fullPath != '/indent'){
					this.indentMessage = false
				}
				return this.indentMessage
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
	
	.nav-schedule-details a{
		float: left;
		width: 25%;
		height: 55px;
		line-height: 55px;
		text-align: center;
		border-bottom: 2px solid rgba(255,255,255,0);
	}
	.nav-schedule-details a:hover{
		cursor: pointer;
		color: #C44DDC;
		border-bottom: 2px solid #C44DDC;
	}
	
</style>