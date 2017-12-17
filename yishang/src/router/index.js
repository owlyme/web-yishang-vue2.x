import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Indexlist from '@/components/list/index'
	import Main from '@/components/list/main'
	import Zizhu from '@/components/list/zizhu'
	import Wuyou from '@/components/list/wuyou'
	import Indent from '@/components/list/indent'
    import MyIndent from '@/components/list/myIndent'
    import MyDetail from '@/components/list/myDetail'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [    
    {path: '/login',name: 'Login',component: Login    },
    {path: '/', name: 'Indexlist',component: Indexlist,
          children:[
          	{path: "/", name: "Main", component:Main	},
          	{path: "/zizhu",name: "Zizhu",component:Zizhu},
          	{path: "/wuyou",name: "Wuyou",component:Wuyou},
          	{path: "/indent",name: "Indent",component:Indent,

          	},
          ]
    },
     {
      path: '*', 
      component: Login
    },
  ],

})
