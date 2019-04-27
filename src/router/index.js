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
    path: '/my',
    name: 'my',
    component: () => import('@/page/my/my')
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

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: () => import('@/page/Main'),
      children: [{
        path: '/service',
        name: 'service',
        component: () => import('@/page/main/service')
      }]
    },
    ...routes,
    ...product,
    ...service,
    ...home
  ]
})  