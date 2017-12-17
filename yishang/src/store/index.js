import Vue from 'vue'
import Vuex from  'vuex'

Vue.use(Vuex)

const state={
	url: "http://101.132.187.244:8082",
	uploadUrl: "http://101.132.187.244:8083/picture/upload",
	customer: {
		avatar: null,
		id: null
	},
	indentBlock: true,
	
	zizhuIndent:{
		workSheet:{},
		colorNum:[],
		period:{},
		clothePic:{},
		quality:{},
		fabric:{},
		about:{},
		newAddr:{}
	},
	zizhuIndentList:[],

	wuyouIndent:{
		workSheet:{},
		colorNum:{},
		period:{},
		clothePic:{},
		quality:{},
		fabric:{},
		about:{},
		newAddr:{}
	},
	wuyouIndentList: []
}


// const state={
// 	totalPrice: 0,
// 	goods: [],
// 	loadedGoods: [],
// 	seletedGoods: [],
// 	customInfo: {}
// }
/*
{
content:"Some quick example.",
href:"#",
imgSrc:"https://lorempixel.com/600/300/food/5/",
price:50,
title:"Card Title"
}
*/

const getters = {
	getUrl (state){
		return state.url
	},
	getUploadUrl (state){
		return state.uploadUrl
	},
	getIndentBlock(state){
		return state.indentBlock
	},
	getZizhuIndent (state) {
	 	return state.zizhuIndent
	 },
	getZizhuIndentList(state){
		return state.zizhuIndentList
	},
	getWuyouIndent (state) {
	 	return state.wuyouIndent
	},
	getWuyouIndentList(state){
		return state.wuyouIndentList
	}
}

const actions = {
 getCustomerInfo( context, info ){
 	  let state = context.state;
 	  Vue.set(state,'customer',info);
 	  console.log(state)
 },
 clearCustomer(context, ){
 	let state = context.state;
 	Vue.set(state,'customer',{
								avatar: null,
								id: null
							});
 	console.log(state)
 },

  getCustomInfo (context,info) {
  	console.log(context.customInfo);
   	context.state.customInfo = info;
   	console.log(context);
  },
  loadGoods ({ state }){
  	Vue.http.get('api/goods').then((response) => {
	  console.log(response.data)
	   state.loadedGoods = response.data
	   console.log( state.loadedGoods)
	}) 
	Vue.http.get('api/profile').then((response) => {
	  console.log(response.data)
	}) 
  }
}


const mutations = {
 setIndentBlock(state,val){

	state.indentBlock = val ? val : false ;
 },
 
 addZizhuIndentList(state){
 	state.zizhuIndentList.push(state.zizhuIndent);
 	state.zizhuIndent = {
		 		workSheet:{},
				colorNum:[],
				period:{},
				clothePic:{},
				quality:{},
				fabric:{},
				about:{},
				newAddr:{}
		 	}
 },
 addWuyouIndentList(state){
 	state.wuyouIndentList.push(state.wuyouIndent);
 	state.wuyouIndent = {
		 		workSheet:{},
				colorNum:[],
				period:{},
				clothePic:{},
				quality:{},
				fabric:{},
				about:{},
				newAddr:{}
		 	}
 },








 addGoods(state, good){
 	state.goods.push(good);
 },
 seleteGoods(state, goodIndex){
 	let has = false;
	 	has = state.seletedGoods.every(function(item, index){
	 		return item == goodIndex ? true : false;
	 	});
	 	if(has){
	 		state.seletedGoods.splice(goodIndex, 1)
	 	}else{
	 		state.seletedGoods.push( index)
	 	} 	
 },
 removeGoods(state, goodIndex){//single good delete
 	//state.goods.splice(goodIndex, 1)
 	state.seletedGoods.splice(goodIndex, 1)
 },
 countTotalPrice (state){//goods delete 
 	let curGoods = [],
 		totalPrice = 0;

 	state.seletedGoods.forEach(function(item, index){
 		curGoods.push( state.goods[item] ); 		
 	});
 	curGoods.forEach(function(item, index){
 		totalPrice += item.price * item.num;		
 	});

 	state.totalPrice = totalPrice;
 } 
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
