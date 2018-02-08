import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Indexlist from '@/components/list/index'
	import Main from '@/components/list/main'
	import Zizhu from '@/components/list/zizhu'
	import Wuyou from '@/components/list/wuyou'
	import Indent from '@/components/list/indent'


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
  window.scrollTo(0,0)
  if( to.path != '/login' && !Vue.cookies.get('yiyiphone')){
    next({path: "/login"})
  }else{   
    next()
  }
})

export default router