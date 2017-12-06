import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Index from '@/components/list/index'
	import Main from '@/components/list/main'
	import Zizhu from '@/components/list/zizhu'
	import Wuyou from '@/components/list/wuyou'
	import Indent from '@/components/list/indent'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
      	{
      		path: "/",
      		name: "Main",
      		component:Main
      	},
      	{
      		path: "/zizhu",
      		name: "Zizhu",
      		component:Zizhu
      	},
      	{
      		path: "/wuyou",
      		name: "Wuyou",
      		component:Wuyou
      	},
      	{
      		path: "/indent",
      		name: "Indent",
      		component:Indent
      	},
      ]
    }
  ]
})
