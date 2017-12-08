<template>
<div>
	<!-- <Carousel /> -->
    <!-- 过滤订单 -->
<div class="list-nav">
  <div>
    <el-menu
      :default-active="activeIndex"
      class=""
      mode="horizontal"
      @select="handleSelect"
      text-color="#555"
      active-text-color="#FFF"
      
      >    
      <el-menu-item index="1">所有订单</el-menu-item>
      <el-submenu index="2">
        <template slot="title">代发前期资料</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item :index="3+index" v-for="(item, index) in listNav">{{item}}</el-menu-item>
    </el-menu>
  </div>





      <div class="list " >
      	<ListElemnt v-for="(item, index) in goodsList" :key="index+ 'good'"  :goodsMsg="item" class="clearfix"></ListElemnt>
      </div>
    </div>

    
 
  <!-- pagination -->
  <div class="container pagination" >  	
     <b-row align-h="center" align-v="center" >
        <b-col >
          <b-pagination  
          :total-rows="totalRows" 
          v-model="currentPage" 
          first-text="首页"
          prev-text="上一页"
          next-text="下一页"
          last-text="末页"
          :per-page="perPage" >
          </b-pagination>
          <span>共{{totalRows / perPage}}页</span>
        </b-col>
     </b-row>  
	</div>
</div>
</template>
<script>
import Carousel from  "../carousel"
import ListElemnt from "../listEl"
export default{
	name: 'main',
	components: {Carousel,ListElemnt },
	data(){
		return{
      activeIndex: '1',
			listNav: ["延误", "抢单中", "加工中", "代付款收货", "待评价", "取消订单", "已完成", "管理员关闭", "已退货/退款"],
			totalRows: 500,
			perPage : 10,
     		currentPage: 1,
     		goodsList:[
     			{
     				model: "shirt",
     				status: "doing",
					done: 30,
					total:200,
					price: 66,
					date: "2017-10-12"
     			},
     			{
     				model: "shirt",
     				status: "doing",
					done: 30,
					total:200,
					price: 66,
					date: "2017-10-12"
     			},
     			{
     				model: "shirt",
     				status: "doing",
					done: 30,
					total:200,
					price: 66,
					date: "2017-10-12"
     			},
     		]
		}
	},

	watch:{
		currentPage: "getMoreList"
	},
	methods:{
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
		getMoreList (curVal,oldVal) {
			let page = this.currentPage
			console.log(page)
	    }
	}
}
</script>
<style scoped>
.banner .carousel img{
  width: 100%;
  height: 100%;
}
.pages-nav{

}
.list-nav{

}
.pagination{

}
.pagination ul li{
  padding: 5px;
}
</style>