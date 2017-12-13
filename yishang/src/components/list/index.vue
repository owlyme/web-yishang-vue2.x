<template>
 <div class="bg">
  <!-- header -->
  <div class="container head-height">
     <div class="login-sucess clearfix">
      <div class="fl">欢迎登陆亿尚智能平台</div>
      <div class="fr">
        <a class="router-link" @click="logOut"><span></span>退出登录</a>
      </div>
    </div>
  </div>
  <!-- nav -->
  <div class="bg-white pages-nav">
    <div class="container">
        <el-row>
          <el-col :span="4">
            <router-link to="/">
              <!--  <img src="../../assets/logo-mini.png">     -->
            </router-link>                  
          </el-col>
          <el-col :span="14">
              <div class="link-nav">
                <el-menu :default-active="activeIndex"
                class="el-menu-demo" mode="horizontal" 
                @select="handleSelect">
                    <el-menu-item index="1">
                      <router-link to="/">首页</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                      <router-link to="/zizhu">自主发单</router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                      <router-link to="/wuyou">无忧发单</router-link>
                    </el-menu-item>
                    <el-menu-item index="4">
                      <router-link to="/indent">我的订单</router-link>
                    </el-menu-item>
                </el-menu>
              </div>
          </el-col>
        </el-row>  
    </div>
  </div>

    <div class="container bg-white"> 
      <keep-alive> <router-view/> </keep-alive> 
    </div>
  <Footerinfo/>
 </div>
</template>

<script>
import Footerinfo from "../footer"
import { mapGetters } from 'vuex'
export default {
  name: 'index1',
  components: { Footerinfo},
  data () {
    return {
      activeIndex: "1"
    }
  },
  created(){
     this.activeIndex = this.$route.path == '/' ? '1' : 
                        this.$route.path == '/zizhu' ?  '2' :
                        this.$route.path == '/wuyou' ?  '3' : '4';
  },
  computed:{
      ...mapGetters([
                    'getUrl'
                  ]),
  },
  methods:{
    logOut(){
      let self = this
      let url= this.getUrl+'/Home/User/logOut'
      this.$http.get(url).then((res)=>{
          // console.log(res)
          if(res.data.status == 200){            
            self.$router.push("/login")
          }else{

          }          
      },(err)=>{
          //console.log(err)
      })
    },
    focused ( val){
      this.message = val
    },
    send(){
      this.account.save= this.saveInfo
      this.account= { name: '', password: '', save : false}
    },
    getCurrentPages(){
      // console.log(this.currentPage)
    },
    handleSelect(key, keyPath){
      // console.log(key, keyPath);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{  
  background: rgb(248,248,248);
}
.bg-white{
  background: #fff;
}
.container{
  width: 1200px;  
}
.head-height{
  height: 40px;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.login-sucess{
  height: 44px;
  line-height: 44px;
  font-size: 15px;
}
.banner{
  height: 360px;
}

.pages-nav{
  margin-bottom: 20px;
}
.router-link{
  color: rgb(135, 141, 153);
}
.router-link:hover{
  color: #222;
  cursor: pointer;
}


</style>