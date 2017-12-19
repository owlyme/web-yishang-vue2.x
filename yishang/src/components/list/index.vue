<template>
 <div class="bg">
  <!-- header -->
  <div class="container head-height">
     <div class="login-sucess clearfix">
      <div class="fl">欢迎登陆亿尚智能平台！</div>
      <div class="fr back" @click="logOut">
        <span class="logOut bg-icon"></span>退出登录
      </div>
    </div>
  </div>
  <!-- nav -->
  <div class="bg-white pages-nav  clearfix">
    <div class="container">
        <el-row >
          <el-col :span="4">
            <router-link to="/" >
               <img src="../../assets/logo-mini.jpg">    
            </router-link>                  
          </el-col>
          <el-col :span="14">
              <div class="link-nav">
                <div class="nav-h clearfix">                   
                      <span 
                      v-for="(item, index) in listNav"
                      :index="index" 
                      class="muneNav"
                      :class="{active : item.flag}" 
                      @click="fliter(index,item.path)"
                      >{{item.title}}</span>        
              </div>
              </div>
          </el-col>
        </el-row>  
    </div>
  </div>

    <div class="bg-white"> 
      <keep-alive> <router-view/> </keep-alive> 
    </div>
  <Footerinfo/>
 </div>
</template>

<script>
import Footerinfo from "../footer"

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

import { setCookie,getCookie,delCookie } from '../../cookies.js'
export default {
  name: 'index1',
  components: { Footerinfo},
  data () {
    return {
      activeIndex: "1",
      listNav:[{title:'首页',path:"/",flag:true},
      {title:'自主发单',path:"/zizhu",flag:false},
      {title:'无忧发单',path:"/wuyou",flag:false},
      {title:'我的订单',path:"/indent",flag:false}]
    }
  },
  mounted(){
    console.log( 'index')
    if( getCookie('phone') == ''){
        this.$router.push("/login")  
      }
  },
  computed:{
      ...mapGetters([
         'getUrl'
      ]),
  },
  methods:{
    ...mapActions([
      'clearCustomer'
    ]),
    ...mapMutations([
      'setIndentBlock'
    ]),
  logOut(){
      let url= this.getUrl+'/Home/User/logOut'
      this.axios.get(url)
        .then((res)=>{
            // console.log(res)
            if(res.data.status == 200){ 
              this.clearCustomer()        
              this.$router.push("/login")
            }else{

            }          
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
    fliter(index,path){
          this.listNav.forEach((item, _index)=>{            
            this.$set(item,"flag",false)
            if(index == _index){
              this.$set(item,"flag",true)
              this.contentTitle= item.type
            }
          });
          this.setIndentBlock(true)
          this.$router.push(path)
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

.head-height{
  height: 44px;
  font-size: 14px;
  line-height: 1.2;
  color: rgb(102, 102, 102)
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

.pages-nav .container{
  height: 80px;
  margin-bottom: 20px;
}
.pages-nav img{
  height: 80px;
}
.back{
  line-height: 44px;
}
.back:hover{
  cursor: pointer;
}
.logOut{
  display: inline-block;
  height: 32px;
  width: 32px;
  vertical-align: top;
  background-position: -138px  12px;
  opacity: 0.4;
  transition: opacity 0.3s;
}
.back:hover .logOut {
  opacity: 0.8;
}

  .nav-h{
    background: #fff;
    height: 80px;
    line-height: 80px;
    /*padding-top: 20px;*/
  }
    .muneNav{
    float: left;
    height: 36px;
    line-height: 36px;
    margin: 20px 10px;
    padding: 0 30px;
    color: #555;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.5s, color 0.5s;
    font-size: 16px;
    color: rgb(0, 0, 0);
  }
  .muneNav:hover{
    color: #C44DDC;
  }
  .active{
    color: #C44DDC;
  }


</style>