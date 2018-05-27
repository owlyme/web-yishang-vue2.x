<template>
<div>
    <div class="bgimg clearfix">
      <div style="width: 520px;margin: 0 auto">
        <div class="fl" style="padding-top: 50px">
          <h2 class="slogan center"><img src="/static/login/app.png" /></h2>
          <h2 class="slogan center">买商品上<span class="tianmao">天猫</span></h2>
          <h2 class="slogan center">买服务上<span class="yishang">衣依</span></h2>
          <h6 class="slogan2 center"><span>衣依APP，接单发单就是那么简单</span></h6>
        </div>
        <div class="fl" ><img src="/static/login/clothes.png" /></div>
      </div>
    </div>
    <div class="isloading" v-if="isLoading">
      <div class="el-loading-spinner"><i class="el-icon-loading"></i><p class="el-loading-text">拼命加载中</p></div>
    </div>
    <div v-else class="container news">
        <h2 class="title">
            <span><i>{{newsInfo.create_time}}</i></span> 
            {{newsInfo.title}} 
        </h2>
        <div v-html="newsInfo.content"></div>
    </div>
</div>
</template>

<script>
export default {
  name: 'news', 
  props: ["newsId"],
  data() {
    return {
     newsInfo: null,
     isLoading: true
    }
  },
  created(){
    this.getNews({id: this.newsId})
        .then(res=> {
            if(res.data.status ==200){
                this.newsInfo = res.data.content;
                this.isLoading = false
	        }else {
	          	this.openMessage({str: res.data.msg, ele:this})	           
	        }
        });
  }  
}
</script>

<style scoped>  
  .bgimg{
    padding:10px;
    background: rgb(238,238,238);
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
  .slogan img{
    width: 186px;
  }
  .slogan2 {
     width: 100%;
    margin-top: 10px;
    text-align: center;    
    height: 20px;
  }
  .slogan2  span{
    padding: 0 5px;
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 2px;
    color: rgb(255, 255, 255); 
    background: #111;
  }
  .title{
      text-align: center;
      padding: 30px 0 50px;  
  }
  .title span {
      display: inline-block;
      position: relative;
  }
  
  .title span i{
        position: absolute;
        width: 200px;
        font-size: 0.5em;
        top: 14px;
        font-style: normal;
    }
  .fl {
    float: left;
  }
  .fl > img{
    position: relative;
    display: inline-block;
    transform: rotate(-13deg);
  }
  .news img{
    width: 100%;
  }
</style>