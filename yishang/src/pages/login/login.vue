<template>
 <div >
  <div class="container header" >
     <b-row align-h="center" align-v="center" >
        <b-col cols="3" class="logo">亿尚智能</b-col>
        <b-col cols="8" class="login">欢迎登录</b-col>
    </b-row>
   
  </div>

  <div class="bgimg">
    <b-container class="bv-example-row">
      <b-row align-v="center">
        <!-- 展示图 -->
        <b-col> <img src="../../assets/clothes.png" /> </b-col>
        <!-- 口号 -->
        <b-col>
          <h2 class="slogan center"><img src="/static/login/app.png" /></h2>
          <h2 class="slogan center">买商品上<span class="tianmao">天猫</span></h2>
          <h2 class="slogan center">买服务上<span class="yishang">亿尚</span></h2>
          <h6 class="slogan2 center"><span>亿尚APP，接单发单就是那么简单</span></h6>
        </b-col>
        <!-- 登录 -->
        <b-col class="login-form center" >
          <!-- <keep-alive> -->
            <div class="qr-code" v-if="switchToPC">
              <h4>使用亿尚APP 扫码安全登录</h4>
              <div id="qr-code">
                <img :src="qrCodeUrl" alt="二维码" class="qr-code-img" />
              </div>
               <b-button :pressed.sync="myToggle" variant="primary" class="refresh">刷新二维码框</b-button>
               <h6 class="remind"><span class="scan" ></span>打开手机端 扫一扫登录</h6>
            </div>

            <div class="pc" v-else="switchToPC">
              <div class="input-group"><h4>密码登录</h4></div>
              <div class="input-group">
                <input class="form-control"
                 v-model="account.name" @focus="focused('请输入账号')" @blur="focused('')"
                  type="text"
                  placeholder="请输入手机号码或者账号" />
              </div>
              <div class="input-group">
                <input class="form-control"
                  v-model="account.password"  @focus="focused('请输入密码')" @blur="focused('')"
                  type="password"
                  placeholder="请输入密码" />
              </div>
              <div class="input-group">
                <input type="checkbox" value="checked" v-model="saveInfo" />记住密码
              </div>              
              <div class="input-group"><span>{{ message }}</span></div>
              <b-button @click="send" variant="primary" class="refresh login-btn">登录</b-button>               
            </div>
          <!-- </keep-alive> -->
        </b-col>

      </b-row>
    </b-container>
  </div>
   <div class="container footer" >
      <div class="foot-info">
        <span v-for="item in certificate" key="index">{{item}}</span>
      </div>
      <div class="foot-info">
        <span v-for="item in records" key="index">{{item}}</span>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      myToggle: false,
      switchToPC: false,
      account: { name: '', password: '',save : false},
      certificate: [
      "增值电信业务经营许可证：浙B2-20110446",
      "网络文化经营许可证：浙网文[2015]0295-065号",
      "12318举报"],
      records:[ 
      "互联网药品信息服务资质证书编号：浙-（经营性）-2017-0005",
      "浙公网安备：33010002000120号"],
      qrCodeUrl : "../../static/login/qr-code.png",
      saveInfo:false,
      message: ''
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
.header{
  padding: 10px;
}
.logo {
text-align: right;
  font-size: 40px;
  font-family: "FZHLJW";
  color: rgb(148, 46, 234);
  border-right: 1px solid #e0e0e0;
}
.login{
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(148, 46, 234);
}
.bgimg{
  padding:  60px 0;
  background-image: url(/static/login/main-bg.png);
  background-repeat: no-repeat;  
  background-size: 100% 100%;
}



.body-block { 
  padding: 0 60px;  
  background-color: rgb(255, 123, 123);
  width: 100%;
}
.display-img{
  text-align: right;
  margin-top: 30px;
}
.display-img img{
  width: 80%;
}
.tianmao{
  color: #ff0036;
}
.yishang{
  color: rgb(148, 46, 234);
}
.slogan {
  font-size: 40px;
  color: rgb(51, 51, 51);
  line-height: 1.2;
  text-align: center;
}
.slogan2 {
  margin-top: 10px;
   text-align: center;
}
.slogan2  span{  
  width: 270px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 2px;
  color: rgb(255, 255, 255);
  background: #111;
 
}
.foot-info{
  text-align: center;
  font-size: 12px;
  font-family: "Microsoft YaHei";
  color: rgba(135, 132, 132, 0.77);
}
.foot-info span{
  display: inline-block;
  height: 1.2em;
  margin: 10px;
  font-weight: 700;
}

.login-form{
  position: relative;
  height: 369px;
  padding: 20px 0;
  border: 10px solid rgba(244,244,244,0.9); 
  background-image: url(/static/login/bg.png);
  background-repeat: no-repeat; 
  background-size: 100% 100%;
}
.login-form .swicth{
  position: relative;
  width: 60px;
  height: 60px;
  background-image: url(/static/login/bg.png);
  background-repeat: no-repeat; 
  background-size: 100% 100%;
}
#qr-code .qr-code-img{
  padding: 20px;
  width: 180px;
  height: 180px;
  border: 1px solid rgba(244,244,244,1);  
} 
.refresh{
  width: 180px;
  height: 36px;
  margin: 10px;
  border-color: rgb(148, 46, 234);
  background: rgb(148, 46, 234);
}
.remind {
  font-size: 12px;
  color: rgb(51, 51, 51);
  
}
.scan{
  display: inline-block;
  vertical-align: middle;
  width: 29px;
  height: 29px;
  background-image: url(/static/login/scan.png);
  background-repeat: no-repeat;  
  background-position:0px -4px;
}

.pc{
  padding:  10px 40px;
  text-align: left;
}
.form-control{
  font-size: 0.6rem;
}
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #942eea;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(148, 46, 234, 0.15);
}
.input-group{
  margin-bottom: 10px;  
}
.input-group h4{
  font-size: 20px;
}
.input-group span{
  color: #942eea;
}
.input-group input[type="checkbox"]{
    margin-right: 5px;
    height: 1.7rem;
}
.login-btn{
  width: 100%;
  margin: 0px; 
  cursor: pointer;
}
</style>