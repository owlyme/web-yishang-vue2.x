<template>
  <div style="overflow: hidden">
    <!-- header bar -->
    <header class="headbar clearfix">
      <div id="logo" class="logo">亿尚智能</div>
      <div id="login" class="login"> 欢迎登录 </div>
    </header>
    <section class="body-block clearfix">
      <div class="display-img col col-3"><img src="../../assets/clothes.png" /></div>
      <div class="center col col-3">
        <h2 class="slogan"><img src="/static/login/app.png" /></h2>
        <h2 class="slogan">买商品上<span class="tianmao">天猫</span></h2>
        <h2 class="slogan">买服务上<span class="yishang">亿尚</span></h2>        
        <h4 class="slogan2"><span>亿尚APP，接单发单就是那么简单</span></h4>
      </div>
      <div class="col col-3">
        <div class="qr-code">
          <h4>使用亿尚APP 扫码安全登录</h4>
          <div id="qr-code">
            <img src="">
          </div>
          <button></button>
        </div>
      </div>
    </section>
    <b-container class="bv-example-row">
        <b-row>
            <b-col><img src="../../assets/clothes.png" /></b-col>
            <b-col> 
              <h2 class="slogan"><img src="/static/login/app.png" /></h2>
              <h2 class="slogan">买商品上<span class="tianmao">天猫</span></h2>
              <h2 class="slogan">买服务上<span class="yishang">亿尚</span></h2>        
              <h4 class="slogan2"><span>亿尚APP，接单发单就是那么简单</span></h4>
            </b-col>
            <b-col>
              <div class="qr-code">
                <h4>使用亿尚APP 扫码安全登录</h4>
                <div id="qr-code">
                  <img src="">
                </div>
                 <b-button  variant="primary">扫描二维码</b-button>
              </div>
            </b-col>
        </b-row>
    </b-container>
    <!-- footer -->
    <footer>
      <div class="foot-info">
        <span v-for="item in certificate" key="index">{{item}}</span>
      </div>
      <div class="foot-info">
        <span v-for="item in records" key="index">{{item}}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      certificate: ["增值电信业务经营许可证：浙B2-20110446","网络文化经营许可证：浙网文[2015]0295-065号",
      "12318举报"],
      records:[ "互联网药品信息服务资质证书编号：浙-（经营性）-2017-0005",
      "浙公网安备：33010002000120号"]

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col{
  float: left;

}
.col-3{
  width: 33.33%;
}
.headbar{
  padding: 5px;
  padding-left: 20%;
  height: 60px;
  vertical-align: text-middle;
}
.logo {
  float: left;
  margin-right: 10px; 
  height: 50px;
  line-height: 50px;
  font-size: 50px;
  font-family: "FZHLJW";
  color: rgb(148, 46, 234);
}
.login{
  float: left;
  padding-left: 20px;
  margin-left: 20px;
  border-style: inset;
  border: none;
  border-left: 1px solid #e0e0e0;
  height: 52px;
  line-height: 52px;
  font-size: 25px;
  font-family: "Microsoft YaHei";
  color: rgb(148, 46, 234);
}

.body-block { 
  padding: 0 60px;  
  background-color: rgb(255, 123, 123);width: 100%px;
}
.display-img{
  text-align: right;
  margin-top: 30px;
}
.display-img img{
  width: 80%;
}
.center{
  margin-top: 60px;
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
.刷新按钮 {
  border-radius: 4px;
  background-color: rgb(148, 46, 234);
  width: 180px;
  height: 36px;

}


</style>