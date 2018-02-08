import Vue from 'vue'
import "babel-polyfill"
import Vuex from 'vuex'					
Vue.use(Vuex)

const state={
	navlist: [{title:'首页',path:"/", flag: true},
      {title:'自主发单',path:"/zizhu", flag: false},
      {title:'无忧发单',path:"/wuyou", flag: false},
      {title:'我的订单',path:"/indent", flag: false}],
	customer: {
		avatar: null,
		id: null
	},
	draft: null,
	showBanks: false,
	savePassword: false,
	indentBlock: true,	
	popup: false,
	receiptContent:{
		address:new Array(),
		category:new Array(),
		check:new Array(),
		component:new Array(),
		deposit: 0.1,
		done:new Array(),
		error:new Array(),
		mode:new Array(),
		style:new Array()
	},
	submitReceipt: {
				type: null,
				cate_id: null,
				name: null,
				style_id: null,
				mode_id: null,
				size: [],
				demanding_account: '0',
				fee: null,
				total_fee: null,
				expire_time: null,
				arrival_date: null,
				delivery_date: null,
				front_picture: null,
				back_picture: null,
				left_picture: null,
				right_picture: null,
				part_picture: null,
				other_picture: null,
				check_id: null,
				error_id: null,
				quality_requirement: null,
				requirement: null,
				picture: null,
				size_table:null,
				process_list: null,
				fabric: [],
				supplements: [],
				is_deposited: "1",
				receiver: null,
				phone: null,
				province: null,
				city: null,
				county: null,
				street: null
	}
}

const getters = {
	getPopup(state){
		return state.popup
	},
	getNavList(state){
		return state.navlist
	},	
	getIndentBlock(state){
		return state.indentBlock
	},
	getSavePassword(state){
		return state.savePassword
	},
	getCustomer(state){
		return state.customer
	},
	getReceiptContent(state){
		return state.receiptContent
	},
	getSubmitReceipt(state){
		return state.submitReceipt
	},
	getShowBanks(state){
		return state.showBanks
	},
	getDraft(state){
		return state.draft
	}
}

const mutations = {
 setIndentBlock(state,val){
	Vue.set(state,'indentBlock',val || false )
 },
 setSavePassword(state,val){
 	Vue.set(state,'savePassword',val) 	
 },
 setCustomerInfo( state, info ){
  Vue.set(state,'customer',info);
 },
 clearCustomer(state){
 	Vue.set(state,'customer',{ avatar: null,id: null});
 }, 
 switchPupop(state,val){
 	Vue.set(state,'popup', !state.popup);
 },
 closeBanks(state, val){
 	Vue.set(state,'showBanks', val);
 },
 setDraft(state,val){
 	Vue.set(state,'draft', val);
 }
}

const actions = {
 
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
