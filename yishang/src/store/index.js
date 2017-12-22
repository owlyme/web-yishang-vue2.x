import Vue from 'vue'
import Vuex from  'vuex'
					
Vue.use(Vuex)

const state={
	url: "http://101.132.187.244:8082",
	uploadUrl: "http://101.132.187.244:8083",
	customer: {
		avatar: null,
		id: null
	},
	indentBlock: true,
	submitReceipt:{
				type: null,
				cate_name: null,
				name: null,
				style_name: null,
				mode_name: null,
				size: null,
				demanding_account: null,
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
				check: null,
				error: null,
				supplement: null,
				requirement: null,
				picture: null,
				fabric: null,
				supplements: null,
				is_deposited: null,
				receiver: null,
				phone: null,
				province: null,
				city: null,
				county: null,
				street: null,
	},
}

const getters = {
	getUrl (state){
		return state.url
	},
	getUploadUrl (state){
		return state.uploadUrl
	},
	getIndentBlock(state){
		return state.indentBlock
	}
}

const actions = {
 getCustomerInfo( context, info ){
 	  let state = context.state;
 	  Vue.set(state,'customer',info);
 	 
 },
 clearCustomer(context, ){
 	let state = context.state;
 	Vue.set(state,'customer',{
								avatar: null,
								id: null
							});
 },

  getCustomInfo (context,info) {
   	context.state.customInfo = info;
  },

}

const mutations = {
 setIndentBlock(state,val){
	Vue.set(state,'indentBlock',val || false )
 }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
