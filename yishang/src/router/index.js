import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Indexlist from '@/components/list/index'
	import Main from '@/components/list/main'
	import Zizhu from '@/components/list/zizhu'
	import Wuyou from '@/components/list/wuyou'
	import Indent from '@/components/list/indent'
Vue.use(Router)
const router = new Router({
  mode:'hash',
  // mode: 'history',
  routes: [    
    {path: '/login',name: 'Login',component: Login    },
    {path: '/', name: 'Indexlist',component: Indexlist,
          children:[
            {path: "/", name: "Main", component:Main  },
            {path: "/zizhu",name: "Zizhu",component:Zizhu},
            {path: "/wuyou",name: "Wuyou",component:Wuyou},
            {path: "/indent",name: "Indent",component:Indent,},
          ]
    },
     {
      path: '*', 
      component: Login
    },
  ],
})

router.beforeEach(function (to, from, next) {
  if( to.path!= '/login' && !Vue.cookies.get('yiyiphone')){
    next({path: "/login"})
  } else{
    next()
  }

  // if(userInfo){//如果有就直接到首页咯
  //   next();
  // }else{
  //   if(to.path=='/login'){//如果是登录页面路径，就直接next()
  //     next();
  //   }else{//不然就跳转到登录；
  //     next('/login');
  //   }
  // }



})

export default router