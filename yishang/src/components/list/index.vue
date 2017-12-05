<template>
 <div >
  <div class="container" >
    <!-- header -->
    <div class="login-sucess clearfix">
      <div class="fl">欢迎登陆亿尚智能平台</div>
      <div class="fr">退出登录</div>
    </div>
    <!-- swipe -->
    <Swiper/>
    <!-- body -->
    <div class="list clearfix">
     
    </div>
  </div>

  <Footerinfo/>
 </div>
</template>

<script>
import Footerinfo from "../footer"
import Swiper from  "../swiper"
export default {
  name: 'index',
  components: { Footerinfo, Swiper },
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
</style>