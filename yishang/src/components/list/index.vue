<template>
 <div >
  <div class="container" >
    <!-- header -->
    <div class="login-sucess clearfix">
      <div class="fl">欢迎登陆亿尚智能平台</div>
      <div class="fr">退出登录</div>
    </div>
    <!-- nav -->
    <div class="pages-nav">
       <b-nav>
        <b-nav-item active>logo</b-nav-item>
        <b-nav-item >首页</b-nav-item>
        <b-nav-item>自主发单</b-nav-item>
        <b-nav-item>无忧发单</b-nav-item>
        <b-nav-item >我的订单</b-nav-item>
      </b-nav>
    </div>
    <!-- swipe -->
    <!-- <Swiper class="banner"/> -->
    <Carousel />
    <!-- 选择 -->
    <div>
      
    </div>
    <!-- 过滤订单 -->
    <div class="list-nav">
      <b-nav>
        <b-nav-item v-for="item in listNav">{{ item }}</b-nav-item>
      </b-nav>
      <div class="list clearfix" >
        
      </div>
    </div>
    <!-- body -->
    
  </div>
  <b-pagination  
        :total-rows="1000" 
        v-model="currentPage" 
        first-text="首页"
        prev-text="上一页"
        next-text="下一页"
        last-text="末页"
        :per-page="10" >
        </b-pagination>
  <Footerinfo/>
 </div>
</template>

<script>
import Footerinfo from "../footer"
import Swiper from  "../swiper"
import Carousel from  "../carousel"
export default {
  name: 'index',
  components: { Footerinfo, Swiper ,Carousel},
  data () {
    return {
     listNav: ["所有订单","代发前期资料","延误", "抢单中", "加工中", "代付款收货", "待评价", "取消订单", "已完成", "管理员关闭", "已退货/退款"],
     currentPage: 20
    }
  },
  methods:{
    focused ( val){
      this.message = val
    },
    send(){
      this.account.save= this.saveInfo
      this.account= { name: '', password: '', save : false}
    },
    getCurrentPages(){
      console.log(this.currentPage)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fl{
  float: left;
}
.fr{
  float: right;
}
.login-sucess{
  height: 44px;
}
.banner{
  height: 400px;
}
.pages-nav{

}
.list-nav{

}
</style>