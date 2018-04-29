<template>
<div  id='listnavindent'>
	<el-row :gutter="10"  style="width : 100%">
	  <el-col :span="5" id="fixedElePa">
	  	<div class="myIndent" >我的订单</div>
		    <ul class="nav-vertal" id="fixedEle">
          	<li  v-for="(item, index) in listNav"
          		:index="index" 
          		class="muneNav"
          		:class="{active : item.flag}"
          		@click="fliter(index, item.keyword)" 
          		>
          		{{item.type}} <span v-if="(item.num-0)">( {{item.num}} )</span>
          	</li>
          </ul>
	  </el-col>
	  <el-col :span="19">
	  		<div class="myIndent">{{contentTitle}}</div>
	  		<div v-if="goodsList.length" v-for="(item,index) in goodsList" :key="index+'indent'">
	  			<IndentList :goodsMsg="item" v-on:change="switchBlock(item.order_id)"></IndentList>
	  		</div>
	  </el-col>
	</el-row>
	<!-- pagination -->
    <div class="container owlfater" >  	
     <b-row  class="owl">
        <b-col >
          <b-pagination
          :limit="10"
          :total-rows="totalRows" 
          v-model="currentPage" 
          first-text="<<首页"
          prev-text="<"
          next-text=">"
          last-text="末页>>"
          :per-page="perPage" >
          </b-pagination>
          <span>共{{ Math.ceil( totalRows / perPage) }}页</span>
        </b-col>
     </b-row>  
	</div>
</div>
</template>
	
<script>
	import IndentList from "../indentlistEl"
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
	export default{
		name: 'indent1',
		components:{ IndentList},
		data(){
			return{
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
			            flag: false,
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
			          }],
				size : ["颜色(数量)","尺码 XS","S","M","L","XL","XXL","3XL","4XL"], 
				contentTitle:"所有订单",
				goodsList:[],
				savedList:[],
				totalRows: 1,
				perPage : 1,
		   		currentPage: 1
			}
		},
		mounted(){
			this.fadan('indent');
			this.getMainlist({status: 'x'});
		},
		watch:{
		    currentPage:{
		      handler(curVal,oldVal){		        
		        this.getMainlist( {page: curVal,status: this.currentStatus} )
		      },
		      deep:true
		    }
		},
		computed:{
			...mapGetters(['getCurrentOrderID']),
		},
		methods:{
			...mapMutations([
		      'setCurrentOrderID'
		    ]),
		    getMainlist(args){
		      this.Index(args).then((res)=>{
		      	res.data = this.datas;
		      	console.log(res)
		      	if(res.data.status == 200){
		            this.perPage =  res.data.content.pageSize;
		            this.totalRows = res.data.content.totalRows-0;
		            this.savedList =  res.data.content.list;
		            this.goodsList = this.savedList.slice(0, this.savedList.length)
		          }
		          if(this.currentPage>1){
		          	this.srcollTo( document.getElementById("listnavindent") )
		          }   
		      	})  
		    },
		    switchBlock(uid){
		    	this.setCurrentOrderID(uid);
		    	console.log('uid ', uid)
		    	this.$router.push({ name: "Schedule",
	    							params: { order_id: uid }
	    						});
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
		    	this.displayOrNot(keyword)
		    },		    
		    displayOrNot(keyword){
		      this.getMainlist({status: keyword})
		      return 
		      let self = this;
		      self.goodsList= [];
		      self.savedList.forEach((item, _index)=>{
		         if(item.status[0] == '3' && item.status.indexOf('000') == -1 ){
		            if(keyword[1] == item.status[1] ){
		               self.goodsList.push(self.savedList[_index])
		            }
		            if(keyword[2] == item.status[2] ){
		               self.goodsList.push(self.savedList[_index])
		            }
		            if(keyword[3] == item.status[3] ){
		               self.goodsList.push(self.savedList[_index])
		            }
		         }else if(item.status == keyword || keyword == 'x') {
		           self.goodsList.push(self.savedList[_index])
		         }
		      })
		    }		    
		}
	}
</script>

<style scoped>
	li{
		list-style: none;
	}
	.myIndent{
		color: #555;
		height: 54px;
		line-height: 54px;
		background: rgb(238,238,238);
		font-size: 0.8em;
		text-indent: 20px;
	}
	.nav-vertal{
		background: #fff;
	}
	.muneNav{
		color: #555;
		border: 2px solid rgba(255,255,255,0);
		height: 54px;
		line-height: 54px;
		font-size: 0.8em;
		text-indent: 30px;
		cursor: pointer;
	}
	.muneNav:hover{
		background: #C44DDC;
		color: #fff;
	}
	.active{
		color: #C44DDC;
		border-left-color: #C44DDC;
	}
</style>