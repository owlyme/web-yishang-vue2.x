<template>
<div class="main">
   <div class="zIndexe" v-if=" activeIndex == '1' "></div>
   <div class="zIndexf" > 
      <div class="carousel-box"><Carousel /></div>
      <div class="switch-ziqu-wuyou">
        <el-row  >
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="zizhu-bg"></div>
              <h4>自主发单</h4>
              <p>
                自主发单需自主填写发单信息<br>
                确定发单以后会将订单直接发送至工厂抢单界面<br>
                直接与工厂沟通对接
              </p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light ">
              <div class="wuyou-bg"><span></span></div>
              <h4>无忧发单</h4>
              <p>
                无忧发单需自主填单信息<br>
                系统会匹配符合订单信息的专业"M"人员与您对接<br>
                专业人员为您提供专属服务，省心省时<br>
                前加工，后加工，全加工更全面
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
	
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
            background-color="#C44DDC"     >    
            <el-menu-item index="1">所有订单</el-menu-item>
            <el-submenu index="2">
              <template slot="title">代发前期资料</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item :index="(3+index)+''" v-for="(item, index) in listNav">{{item}}</el-menu-item>
          </el-menu>
        </div>
        <div class="list" >
          	<ListElemnt v-for="(item, index) in goodsList" :key="index+ 'good'"  :goodsMsg="item" class="clearfix"></ListElemnt>
        </div>
      </div>   
      <!-- pagination -->
        <div class="container pagination " >  	
         <b-row  class="owl">
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
              <span class="total-pages">共{{totalRows / perPage}}页</span>
            </b-col>
         </b-row>  
  	   </div>
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
  // created(){
  //   console.log(this.$route.path)
  // },
	watch:{
		currentPage: "getMoreList"
	},
	methods:{
    handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
		getMoreList (curVal,oldVal) {
			let page = this.currentPage
			//console.log(page)
	    }
	}
}
</script>
<style scoped>
  .main{
    position: relative;
  }
  .zIndexe{
    position: absolute;
    z-index: 1;
    left: -999px;
    
    height: 495px;
    background: rgb(248,248,248);
  }
  .zIndexf{
    position: absolute;
    z-index: 2;  
  }

  .banner .carousel img{
    width: 100%;
    height: 100%;
  }
  .carousel-box{
    height: 400px;
  }
  .switch-ziqu-wuyou{
    margin-bottom: 30px;
  }
  .grid-content{
    height: 350px;
    padding-top: 60px;
    text-align: center;
    cursor: pointer;
  }
  .grid-content h4{
    padding:20px 0;
  }
  .grid-content p{
    font-size: 0.9em;
  }
  .bg-purple{
    color: #fff;
    background: #C44DDC;
  }
  .bg-purple-light{
    background: #fff;
  } 
  .zizhu-bg,
  .wuyou-bg{
    height: 102px;
    width: 80px;
    margin: 0 auto;
    background-image: url(/static/list/main-switch.png);
    background-repeat: no-repeat; 
    background-position:  10px;
    /*background-size: 100% 100%;*/
  }
  .wuyou-bg {
    background-image: url(/static/list/main-switch.png);
    background-repeat: no-repeat; 
    background-position:  -75px;
    /*background-size: 100% 100%;*/
  }
  .list{
    background: rgb(248,248,248);
  }

  .pagination{
    height: 70px;
    background: #fff;
  }
  .pagination ul li{
    padding: 5px;
  }
  .owl{
    margin: 0 auto;
    margin: 0 auto;
    margin-top: -10px;
  }
  .pagination .total-pages{
    position: absolute;
    right: -50px;
    top:  26px;
  }

</style>