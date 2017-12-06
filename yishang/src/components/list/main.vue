<template>
<div>
	<Carousel />
    <!-- 过滤订单 -->
    <div class="list-nav">
      <b-nav>
        <b-nav-item v-for="(item, index) in listNav" :key="index +'nav'">{{ item }}</b-nav-item>
      </b-nav>
      <div class="list clearfix" >
      	<ListElemnt v-for="(item, index) in goodsList" :key="index+ 'good'" :goodsMsg="item"></ListElemnt>
      </div>
    </div>
 
  <!-- pagination -->
  <div class="container pagination" >
  	
     <b-row align-h="center" align-v="center" >
        <b-col >
        <!--  <b-pagination-nav 
         
         :number-of-pages="10" 
         	first-text="首页"
          	prev-text="上一页"
          	next-text="下一页"
         	last-text="末页"
          v-model="currentPage" /> -->

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
			listNav: ["所有订单","代发前期资料","延误", "抢单中", "加工中", "代付款收货", "待评价", "取消订单", "已完成", "管理员关闭", "已退货/退款"],
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