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
        <b-nav-item active><b-link href="/">Link</b-link></b-nav-item>
        <b-nav-item  href="/">首页</b-nav-item> 
        <b-nav-item  href="/zizhu">自主发单</b-nav-item>
        <b-nav-item  href="/wuyou">无忧发单</b-nav-item>
        <b-nav-item  href="/indent">我的订单</b-nav-item>
      </b-nav>
    </div>

    <keep-alive> <router-view/> </keep-alive> 
    
  </div>
  <Footerinfo/>
 </div>
</template>

<script>
import Footerinfo from "../footer"
export default {
  name: 'index1',
  components: { Footerinfo},
  data () {
    return {
     
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
.container{
  width: 800px;
}
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
  height: 360px;
}


</style>