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
        <ul class="nav-h clearfix">
              <li  v-for="(item, index) in listNav"
                :index="index" 
                class="muneNav"
                :class="{active : item.flag}"
                @click="fliter(index)">
                {{item.type}} <span v-if="(item.num-0)">( {{item.num}} )</span>
              </li>
        </ul>
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
//http://101.132.187.244:8082/Home/Index/index
//page true string 1
//status
const pageContent={
  content: null,
  totalRows : null,
  pageSize: null,
  list: null,
  order_id : null,
  name : null,
  front_picture : null,
  demanding_account: null, 
  done_account: null,
  fee : null,
  expire_time : null,
  arrival_date : null,
  delivery_date : null,
  type : null,
  cycle : null,
  mode : null,
  status: null,// 状态：1000 等待接单； 2000 待选工厂； 3xx0 待发样衣； 3x0x 待发面料； 30xx 待发辅料； 3xx1 待收样衣； 3x1x 待收面料； 31xx 待收辅料； 3xx2 已收样衣； 3x2x 已收面料； 32xx 已收辅料； 3300 待发前期资料； 3400 待收前期资料； 4000 生成加工； 5000 待收货付款； 6000 等待评价； 60x1 发单方评价； 601x 接单房评价； 7000 已评价；9000订单已取消；9100订单已关闭；(x代表该位上能取到的任意值）
  msg: null, //右侧提示按钮文字显示
  msg_color: null,// 0-超时 1-正常 -1取消关闭
  state: null
}

//http://101.132.187.244:8082/Home/Index/getBanner
const bannerContent={
  content: null, //true array[object]
  id: null, //true string
  title: null, //true string
  picture: null, //true string
  url: null
}

import Carousel from  "../carousel"
import ListElemnt from "../listEl"
export default{
	name: 'main',
	components: {Carousel,ListElemnt },
	data(){
		return{
      activeIndex: '1',
			listNav: [
          {
            type: "所有订单",
            flag: false
          },
          {
            type:"待发前期资料",
            flag: false,
            inner: [
                    {
                      type:"待发样衣",
                      flag: false
                    },
                    {
                      type:"待发面料",
                      flag: false
                    },
                    {
                      type:"待发辅料",
                      flag: false
                    }
                   ]
          },
          
          {
            type:"延误",
            flag: false
          },
          {
            type:"抢单中",
            flag: false
          },
          {
            type:"加工中",
            flag: false
          },
          {
            type:"待付款收货",
            flag: false
          },
          {
            type:"待评价",
            flag: false
          },
          {
            type:"取消订单",
            flag: false
          },
          {
            type:"已完成",
            flag: false
          },
          {
            type:"管理员关闭",
            flag: false
          },
          {
            type:"已退货/退款",
            flag: false
          }
        ],
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
	    },
    fliter(index){
          let self = this;
          self.listNav.forEach((item, _index)=>{            
            self.$set(item,"flag",false)
            if(index == _index){
              self.$set(item,"flag",true)
              self.contentTitle= item.type
            }
          });
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

  .nav-h{
    background: #fff;
    /*padding-top: 20px;*/
  }
  .muneNav{
    float: left;
    height: 36px;
    line-height: 36px;
    margin: 20px 10px;
    padding: 0 9px;
    color: #555;
    font-size: 15px;
    cursor: pointer;
    background: rgb(238,238,238);
    transition: background 0.5s, color 0.5s;
  }
  .muneNav:hover{
    color: #FFF;
     background: #C44DDC;
  }
  .active{
    color: #FFF;
     background: #C44DDC;
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