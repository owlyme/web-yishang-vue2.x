import Vue from 'vue'
import Vuex from  'vuex'
					
Vue.use(Vuex)

const state={
	url: "http://101.132.187.244:8082/",
	uploadUrl: "http://101.132.187.244:8083/",
	customer: {
		avatar: null,
		id: null
	},
	savePassword: false,
	indentBlock: true,
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
	},
	getSavePassword(state){
		return state.savePassword
	},
	getCustomer(state){
		return state.customer
	}
}

const actions = {
 clearCustomer(context, ){
 	let state = context.state;
 	Vue.set(state,'customer',{
								avatar: null,
								id: null
							});
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
  console.log(info)
  console.log(state.customer)
 },

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
