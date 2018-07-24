import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'




const Main      =  () => import(/* webpackChunkName: "main" */ '@/components/pages/main')
const Indexlist =  () => import(/* webpackChunkName: "index" */ '@/components/pages/index')
  const Zizhu   =  () => import(/* webpackChunkName: "zizhu" */ '@/components/pages/zizhu')
  const Wuyou   =  () => import(/* webpackChunkName: "wuyou" */ '@/components/pages/wuyou')
  const Indent  =  () => import(/* webpackChunkName: "indent" */ '@/components/pages/indent')
  const IndentMain =  () => import(/* webpackChunkName: "indentmain" */ '@/components/pages/indentMsg')
  const Schedule =  () => import(/* webpackChunkName: "schedule" */ '@/components/pages/schedule')
  const Detail =  () => import(/* webpackChunkName: "detail" */ '@/components/pages/detail')
  const News = () => import(/* webpackChunkName: "news" */ "@/components/pages/news");
Vue.use(Router)

const router = new Router({
  mode:'hash',
  // mode: 'history',
  routes: [    
    {path: '/login',name: 'Login',component: Login },
    {path: '/',component: Indexlist, //在子视图有默认界面时，父视图不需要name属性
      children:[
            {path: "", name: "Main", component:Main, meta: {requiresAuth: true}},
            {path: "news/:id",name: "News",component:News, meta: {requiresAuth: true}, props: true},
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
      next();
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router