import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Indexlist from '@/components/pages/index'
	import Main from '@/components/pages/main'
	import Zizhu from '@/components/pages/zizhu'
	import Wuyou from '@/components/pages/wuyou'
  import Indent from '@/components/pages/indent'
  import IndentMsg from '@/components/pages/indentMsg'
	import Schedule from '@/components/pages/schedule'
  import Detail from '@/components/pages/detail'

Vue.use(Router)
// 

const router = new Router({
  mode:'hash',
  // mode: 'history',
  routes: [    
    {path: '/login',name: 'Login',component: Login },
    {path: '',component: Indexlist, 
      children:[
            {path: "/", name: "Main", component:Main, },
            {path: "zizhu",name: "Zizhu",component:Zizhu},
            {path: "/wuyou",name: "Wuyou",component:Wuyou},
            {path: "/indent",name: "Indent",component:Indent,
                    children: [
                        {path: "schedule",name: "Schedule",component:Schedule},
                        {path: "detail",name: "Detail",component:Detail}
                    ]
            }
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
  console.log(Vue.cookies.get('yiyiphone'))
  if( to.path != '/login' && !Vue.cookies.get('yiyiphone') ){
    console.log('yiyiphone')
    next({path: "/login"})
  }else{   
    next()
  }
})

export default router