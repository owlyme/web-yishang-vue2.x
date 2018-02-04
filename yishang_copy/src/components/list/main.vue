<template>
<div class="main clearfix">
  <Popup v-if="popup" :popup.sync="popup"></Popup>
  <div class="zIndexf container " > 
      <div class="carousel-box" >
        <keep-alive>
          <Carousel :banners="banner" />
        </keep-alive>
      </div>
      <div class="switch-ziqu-wuyou">
        <el-row  >
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <a target="_blank" :href="newzhizhu" >
                <div class="zizhu-bg"></div>
                <h4>自主发单</h4>
              </a>
              <p>
                自主发单需自主填写发单信息<br>
                确定发单以后会将订单直接发送至工厂抢单界面<br>
                直接与工厂沟通对接
              </p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light ">
              <a target="_blank" :href="newwuyou">
                 <div class="wuyou-bg"></div>
                 <h4>无忧发单</h4>
              </a> 
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
      <div id="listnav" class="list-nav ">
        <ul class="nav-h clearfix">
              <li  v-for="(item, index) in listNav"
                :index="index " 
                class="muneNav clearfix "          
                @click="fliter(index)"  
                >
                <div  class="txt" :class="{'txt-active' : item.flag }" @click='displayOrNot(item.keyword)'>{{item.type}}
                  <div v-if="item.inner" class="updown">&#60;</div>
                </div>
              </li>
        </ul>

        <div class="list" >
          	<ListElemnt v-for="(item, index) in goodsList" 
                      :key="index+ 'good'"  
                      :goodsMsg="item" 
                      class="clearfix"
                      ></ListElemnt>
        </div>
      </div>   
      <!-- pagination -->
        <div class="container owlfater" >
          <!-- class="owl" -->
         <b-row  class="owl" >
            <b-col >
              <b-pagination   
              align="center"      
              :limit="10"
              :total-rows="totalRows" 
              v-model="currentPage" 
              first-text="<<首页"
              prev-text="<"
              next-text=">"
              last-text="末页>>"
              :per-page="perPage" >
              </b-pagination>
              <span >共{{ Math.ceil( totalRows / perPage) }}页</span>
            </b-col> 
         </b-row>  
  	   </div>
  </div>
  
</div>
</template>
<script>
import Carousel from  "../carousel"
import ListElemnt from "../listEl"
import Popup from '../pop-up'
import { mapGetters } from 'vuex'
export default{
	name: 'main',
	components: {Carousel,ListElemnt,Popup },
	data(){
		return{
      popup: false,
      mainList:[],
			listNav: [
          {
            type: "所有订单",
            keyword: 'x',
            flag: true
          },
          {
            type:"待接单",
            keyword: '1000',
            flag: false
          },
          {
            type:"待发资料",
            keyword: '3000',
            flag: false            
          },          
          {
            type:"加工中",
            keyword: '4000',
            flag: false
          },
          {
            type:"待收货",
            keyword: '5000',
            flag: false
          },
          {
            type:"待评价",
            keyword: '6000',
            flag: false
          },
          {
            type:"已完成",
            keyword: '7000',
            flag: false
          }
        ],
			totalRows: 1,
			perPage : 1,
   		currentPage: 1,

      currentStatus: 'x',
   		goodsList:[],
      savedList:[],
      banner: null,
      activeWidth: "0px"
		}
	},
  mounted(){ 
    this.getBanner()
    this.getMainlist({page: this.currentPage,status: 'x'})
  },
  watch:{
    currentPage:{
      handler(curVal,oldVal){
        this.getMainlist({page: curVal,status: this.currentStatus})        
      },
      deep:true
    }
  },
  computed:{
    ...mapGetters([
       'getPopup'
    ]),
    newzhizhu(){
      return location.href + 'zizhu'
    },
    newwuyou(){
      return location.href + 'wuyou'
    }
  },
	methods:{
    getBanner(){
      this.Banner().then( (res)=>{
          if(res.data.status == 200){
              this.banner = res.data.content
          }        
      }) 
    },
    getMainlist(args){
      this.Index(args).then((res)=>{
        // console.log(res)
          if(res.data.status == 200){
            this.perPage =  res.data.content.pageSize;
            this.totalRows = res.data.content.totalRows-0;
            this.savedList =  res.data.content.list;
            this.goodsList = this.savedList.slice(0, this.savedList.length)
          } 
          //加载列表信息完成后滚动到指定位置
          if(this.currentPage>1){
            this.srcollTo(document.getElementById("listnav"))  
          }               
      })  
    },
    fliter(index, keyword){
      let self = this;
      self.listNav.forEach((item, _index)=>{            
        self.$set(item,"flag",false)
        if(index == _index){
          self.$set(item,"flag",true)
          self.contentTitle= item.type
        }
      });
    },
    displayOrNot(keyword){
      this.currentStatus = keyword
      this.getMainlist({status: keyword})
    }
	}
}
</script>
<style scoped>
  .main{
    width: 100%;
    position: relative;
    background: rgb(248,248,248);
  }
  .zIndexe{
    position: absolute;
    z-index: 1;
    width: 100%;    
    height: 495px;
    background: rgb(240,239,237);

  }
  .zIndexf{
    position: relative;
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
    box-shadow: 0 3px 26px rgba(130, 130, 157, 0.5);
  }
  .grid-content{
    height: 350px;
    padding-top: 60px;
    text-align: center;
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
  .bg-purple h4{
    color: #fff;
  }
  .bg-purple-light{
    background: #fff;
  } 
  .bg-purple-light h4{
    color: #666;
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
    height: 80px;
    padding-top: 20px;
  }
  .muneNav{
    position: relative;
    float: left;
    height: 36px;
    line-height: 36px;
    /*margin: 20px 10px;*/
    padding: 0 10px;
    width: 14.28%;
    color: #555;
    text-align: center;
    font-size: 15px;
    cursor: pointer;    
    transition: background 0.5s, color 0.5s;
    box-sizing: border-box;
  }
  .muneNav .txt{
    background: rgb(238,238,238);
     padding: 0 9px;
  }
  .muneNav   .txt-active{
    color: #FFF;
    background: #C44DDC;
  }
  .muneNav:hover .txt{
    color: #FFF;
    background: #C44DDC;
  }
  .updown {
    display: block;
    position: absolute;
    color: #c6b7b7;
/*    width: 10px;
    height: 10px;*/
    top: 0;right: 30px;
    transform:rotate(-90deg);
    -ms-transform:rotate(-90deg);
    -moz-transform:rotate(-90deg);  
    -webkit-transform:rotate(-90deg);
    -o-transform:rotate(-90deg);
    transition: transform 0.5s;
  }
  .muneNav:hover  .updown{
    transform:rotate(-270deg);
  }
  .active{
    color: #FFF;
    background: #C44DDC;
  }

  .list{
    background: rgb(248,248,248);
  }
  .inner-ul{
    display: none;
    width: 100%;
    opacity: 0;
    transition: background 0.5s, color 0.5s,opacity 0.3s;
  }
  .muneNav:hover .inner-ul{
    position: relative;
     display: block;
     opacity: 1;
     color: #555;
     background: rgb(238,238,238);
     z-index: 5;
     text-align: center;
  }
  .muneNav:hover .inner-ul .inner-li:hover{
    color: #FFF;
    background: #C44DDC;
  }
  a{cursor: pointer;}
</style>