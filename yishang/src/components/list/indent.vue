<template>
	<div>
		<el-row>
		  <el-col :span="4">
			 <el-menu
	            :default-active="activeIndex"
	            class=""
	            @select="handleSelect"
	            text-color="#555"
	            active-text-color="#FFF"
	            background-color="#C44DDC"     >    
	            <el-menu-item index="1">所有订单</el-menu-item>
	            <el-submenu index="2">
	              <template slot="title">代发前期资料</template>
	              <el-menu-item index="2-1">选项1</el-menu-item>
	              <el-menu-item index="2-2">选项2</el-menu-item>
	              <el-menu-item index="2-3">选项3</el-menu-item>
	            </el-submenu>
	            <el-menu-item :index="3+index" v-for="(item, index) in listNav">{{item}}</el-menu-item>
	          </el-menu>		
		  </el-col>
		  <el-col :span="20">

		  </el-col>
		</el-row>
	</div>
	
</template>
<script>
	export default{
		name: 'indet',
		data(){
			return{
				activeIndex: '1',
				listNav: ["延误", "抢单中", "加工中", "代付款收货", "待评价", "取消订单", "已完成", "管理员关闭", "已退货/退款"],
			}
		},
		method:{
			handleSelect(key, keyPath) {
		        console.log(key, keyPath);
		    },
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>