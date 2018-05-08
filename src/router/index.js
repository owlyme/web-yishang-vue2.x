import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
// import Indexlist from '@/components/pages/index'
// 	import Main from '@/components/pages/main'
// 	import Zizhu from '@/components/pages/zizhu'
// 	import Wuyou from '@/components/pages/wuyou'
//  import Indent from '@/components/pages/indent'
//  import IndentMain from '@/components/pages/IndentMain'
// 	import Schedule from '@/components/pages/schedule'
//  import Detail from '@/components/pages/detail'

const Main      =  resolve => require(['@/components/pages/main'], resolve)
const Indexlist =  resolve => require(['@/components/pages/index'], resolve)
  const Zizhu   =  resolve => require(['@/components/pages/zizhu'], resolve)
  const Wuyou   =  resolve => require(['@/components/pages/wuyou'], resolve)
  const Indent  =  resolve => require(['@/components/pages/indent'], resolve)
  const IndentMain =  resolve => require(['@/components/pages/indentMsg'], resolve)
  const Schedule =  resolve => require(['@/components/pages/schedule'], resolve)
  const Detail =  resolve => require(['@/components/pages/detail'], resolve)

Vue.use(Router)

const router = new Router({
  mode:'hash',
  // mode: 'history',
  routes: [    
    {path: '/login',name: 'Login',component: Login },
    {path: '/',component: Indexlist, //在子视图有默认界面时，父视图不需要name属性
      children:[
            {path: "", name: "Main", component:Main, meta: {requiresAuth: true}},
            {path: "zizhu",name: "Zizhu",component:Zizhu, meta: {requiresAuth: true}},
            {path: "wuyou",name: "Wuyou",component:Wuyou, meta: {requiresAuth: true}},
            {path: "indent",component:Indent,
                    children: [
                        {path: "",name: "IndentMain",component:IndentMain, meta: {requiresAuth: true}},
                        {path: "schedule/:order_id",name: "Schedule", component:Schedule, meta: {requiresAuth: true}, props: true},
                        {path: "detail/:order_id",name: "Detail",  component:Detail,meta: {requiresAuth: true}, props: true}
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

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!Vue.cookies.get('yiyiphone')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router