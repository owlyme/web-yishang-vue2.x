import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Indexlist from '@/components/list/index'
	import Main from '@/components/list/main'
	import Zizhu from '@/components/list/zizhu'
	import Wuyou from '@/components/list/wuyou'
	import Indent from '@/components/list/indent'
// import store from '../store/index.js'


Vue.use(Router)
// 

const router = new Router({
  mode:'hash',
  // mode: 'history',
  routes: [    
    {path: '/login',name: 'Login',component: Login },
    {path: '/',component: Indexlist, 
      children:[
        {path: "", name: "Main", component:Main, },
        {path: "zizhu",name: "Zizhu",component:Zizhu},
        {path: "wuyou",name: "Wuyou",component:Wuyou},
        {path: "indent",name: "Indent",component:Indent}
      ]
    },
    {
      path: '*',
      component: Login
    }
  ],
})

router.beforeEach(function (to, from, next) {
  // if(['/zizhu', '/wuyou'].includes( from.path )){
  //   console.log(store.state.draft)
  //   store.commit('setDraft', 312)
  //    console.log(store.state.draft)
  // }
  window.scrollTo(0,0)
  if( to.path != '/login' && !Vue.cookies.get('yiyiphone')){
    next({path: "/login"})
  }else{   
    next()
  }
})

export default router