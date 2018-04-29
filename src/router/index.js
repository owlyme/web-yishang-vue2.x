import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
// import Indexlist from '@/components/pages/index'
// 	import Main from '@/components/pages/main'
// 	import Zizhu from '@/components/pages/zizhu'
// 	import Wuyou from '@/components/pages/wuyou'
//   import Indent from '@/components/pages/indent'
//   import IndentMsg from '@/components/pages/indentMsg'
// 	import Schedule from '@/components/pages/schedule'
//   import Detail from '@/components/pages/detail'

// resolve => require(['../page/any/any.vue'], resolve)
const Main =  resolve => require(['@/components/pages/main'], resolve)
const Indexlist =  resolve => require(['@/components/pages/index'], resolve)
  const Zizhu =  resolve => require(['@/components/pages/zizhu'], resolve)
  const Wuyou =  resolve => require(['@/components/pages/wuyou'], resolve)
  const Indent =  resolve => require(['@/components/pages/indent'], resolve)
  const IndentMsg =  resolve => require(['@/components/pages/indentMsg'], resolve)
  const Schedule =  resolve => require(['@/components/pages/schedule'], resolve)
  const Detail =  resolve => require(['@/components/pages/detail'], resolve)






Vue.use(Router)
// 

const router = new Router({
  mode:'hash',
  // mode: 'history',
  routes: [    
    {path: '/login',name: 'Login',component: Login },
    {path: '/',component: Indexlist, //在子视图有默认界面时，父视图不需要那么属性
      children:[
            {path: "", name: "Main", component:Main, },
            {path: "zizhu",name: "Zizhu",component:Zizhu},
            {path: "wuyou",name: "Wuyou",component:Wuyou},
            {path: "indent",component:Indent,
                    children: [
                        {path: "",name: "IndentMsg",component:IndentMsg},
                        {path: "schedule/:order_id",name: "Schedule", component:Schedule, props: true},
                        {path: "detail/:order_id",name: "Detail",component:Detail, props: true}
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