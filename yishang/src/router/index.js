import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'

import Indexlist from '@/components/list/index'
	import Main from '@/components/list/main'
	import Zizhu from '@/components/list/zizhu'
	import Wuyou from '@/components/list/wuyou'
	import Indent from '@/components/list/indent'
import test from '@/components/uploadfiles'
Vue.use(Router)
const router = new Router({
  mode:'hash',
  // mode: 'history',
  routes: [    
    {path: '/login',name: 'Login',component: Login },
    {path: '/test10010',name: 'test',component: test},
    {path: '/',component: Indexlist,
      children:[
        {path: "/", name: "Main", component:Main },
        {path: "/zizhu",name: "Zizhu",component:Zizhu},
        {path: "/wuyou",name: "Wuyou",component:Wuyou},
        {path: "/indent",name: "Indent",component:Indent}
      ]
    },
    {
      path: '*',
      component: Login
    }
  ],
})

import store  from '../store/index.js'

router.beforeEach(function (to, from, next) {
  let curPath = to.path
        store.getters.getNavList.forEach((item, _index)=>{        
        if( curPath == item.path ){
          item.flag= true
        }else{
          item.flag=false
        }
      })

  if( to.path != '/login' && !Vue.cookies.get('yiyiphone')){
    next({path: "/login"})
  } else{      
    if(to.path == '/indent'){
      next()
    }else{
      next()
    }    
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