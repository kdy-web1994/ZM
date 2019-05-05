import Vue from 'vue'
import Router from 'vue-router'
import product from './product/product'
import service from './service/service'
import home from './homerouter/homerouter'



let routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/page/login/login')
  },
  {
    path: '/useragreement',
    name: 'useragreement',
    component: () => import('@/page/login/useragreement')
  },
  {
    path: '/firstlogin',
    name: 'firstlogin',
    component: () => import('@/page/login/firstlogin')
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: () => import('@/page/login/forgotpassword')
  },
  
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import('@/page/my/aboutus')
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: () => import('@/page/my/changepassword')
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import('@/page/my/collection')
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/page/my/feedback')
  },
  {
    path: '/integral',
    name: 'integral',
    component: () => import('@/page/my/integral')
  },
]

Vue.use(Router)

let newRouter=new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: () => import('@/page/Main'),
      redirect:'home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/page/main/home')
        },
        {
        path: '/service',
        name: 'service',
        component: () => import('@/page/main/service')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/page/main/my')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('@/page/main/product')
      }
    ]
    },
    ...routes,
    ...product,
    ...service,
    ...home
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
  //     if (from.meta.keepAlive) {
  // 　　  from.meta.savedPosition = document.documentElement.scrollTop || document.body.scrollTop
  //     }
      return { x: 0, y: to.meta.savedPosition ||0}
   }
  }
})  


newRouter.beforeEach((to, from, next) => {
  console.log('to:'+to.path , 'from:'+from.path)
  !function callback () {
    // 没有session不能跳转
    let session=localStorage.getItem('session') || to.query.s
    if (!session) {
      setTimeout(callback,50)
      return
    }
    // 整理带code的url
    let url=location.href,
      j_index=url.indexOf('#'),
      w0_index=url.lastIndexOf('?',j_index)
    let str='';
    if(w0_index>=0) {
      str=url.slice(w0_index+1,url[j_index-1]==='/' ? j_index-1 : j_index)
      url=url.slice(0,w0_index)+url.slice(url[j_index-1]==='/' ? j_index-1 : j_index)
      if(url.indexOf('?',j_index)>=0) {
        url=url+str
      } else {
        url=url+'?'+str
      }
      location.replace(url)
      return
    }
    next()
  }()
})






export default newRouter