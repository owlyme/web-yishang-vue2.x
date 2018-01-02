<template>
 <div class="bg">
  <Popup v-if="popup" :popup.sync="popup"></Popup>
  <!-- header -->
  <div class="container head-height">
     <div class="login-sucess clearfix">
      <div class="fl"><span>欢迎登陆衣依供应链平台！</span></div>
      <div class="fr back" @click="logOut">
        <span class="logOut bg-icon"></span>退出登录
      </div>
    </div>
  </div>
  <!-- nav -->
  <div class="bg-white pages-nav  clearfix">
    <div class="container">
        <el-row >
          <el-col :span="4" class="center">
            <router-link to="/" >
              <img class="avatarImg" :src="avatarSrc" />
            </router-link>                  
          </el-col>
          <el-col :span="14">
              <div class="link-nav">
                <div class="nav-h clearfix">
                      <a 
                      class="muneNav"                      
                      v-for="(item, index) in listNav"
                      :key="'mainnav'+ index"
                      @click="fliter(index)"
                      ><span :class="{ isactive: item.flag}">{{item.title}}</span></a>
                </div>
              </div>
          </el-col>
        </el-row>  
    </div>
  </div>
  <div class="bg-white"> 
    <keep-alive> <router-view/> </keep-alive> 
    <!-- <router-view/> -->
  </div>
  <Footerinfo/>
 </div>
</template>

<script>
import Footerinfo from "../footer"
import Popup from '../pop-up'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'index1',
  components: { Footerinfo, Popup},
  data () {
    return {
      popup: false,
      loginSucess: false,
      listNav:[{title:'首页',path:"/", flag: true},
      {title:'自主发单',path:"/zizhu", flag: false},
      {title:'无忧发单',path:"/wuyou", flag: false},
      {title:'我的订单',path:"/indent", flag: false}]
    }
  },
  mounted(){
    let curPath = this.$router.history.current.path
    this.listNav.forEach((item, _index)=>{        
        if( curPath == item.path ){
          this.$set(item, 'flag', true)
        }else{
          this.$set(item, 'flag', false)
        }
    })
  },
  computed:{
      ...mapGetters([
         'getUrl',
         'getSavePassword',
         'getCustomer',
         'getUploadUrl'
      ]),
      avatarSrc(){
        if( this.$cookies.get('yiyiavatar') ) return this.$cookies.get('yiyiavatar')
      }
  },
  methods:{
    ...mapActions([
      'clearCustomer',
    ]),
    ...mapMutations([
      'setIndentBlock',
    ]),
    logOut(){
      let url= this.getUrl+'/Home/User/logOut'
      this.axios.get(url)
        .then((res)=>{
          if(res.data.status == 200){ 
              this.clearCustomer()        
              this.$router.push("/login")
              if(!this.getSavePassword){
                this.$cookies.remove('yiyiphone');
                this.$cookies.remove('yiyiavatar');
              }
          }else{

          }          
     })
    },
    send(){
      this.account.save= this.saveInfo
      this.account= { name: '', password: '', save : false}
    },
    beforeReceipt(index){
        let url = this.getUrl
        this.axios.post(url+'/Home/Receipt/beforeReceipt').then((res)=>{
              // this.$router.push(this.listNav[index].path)
              if(res.data.status ==200){
                this.$router.push(this.listNav[index].path)
              }else {
                this.msg = res.data.msg
                this.popup = true
              }
        })
    },
    fliter(index){
      let listNav = this.listNav
      this.setIndentBlock(true)
      listNav.forEach((item, _index)=>{
        if( index == _index){
          this.$set(item, 'flag', true)
        }else{
          this.$set(item, 'flag', false)
        }
      })
      if(index% 3 ){
        this.beforeReceipt(index)
      }else{
        this.$router.push(listNav[index].path)
      }
    }, 
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
  .login-sucess{
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  }
  .fl{
    height: 100%;
  float: left;
  }
  .fr{
    height: 100%;
  float: right;
  }  
  .avatarImg{
    height: 100%;
  }
  .banner{
  height: 360px;
  }
  .pages-nav .container{
  height: 80px;

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
  background-position: -138px  10px;
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
  .isactive,
  .router-link-exact-active{
    color: #C44DDC;
  }
</style>