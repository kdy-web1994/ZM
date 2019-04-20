import Vue from 'vue'
import Router from 'vue-router'
import product from './product/product'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component:()=>import('@/page/login/login')
    },
    {
      path: '/useragreement',
      name: 'useragreement',
      component:()=>import('@/page/login/useragreement')
    },
    {
      path: '/firstlogin',
      name: 'firstlogin',
      component:()=>import('@/page/login/firstlogin')
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component:()=>import('@/page/login/forgotpassword')
    },
    {
      path: '/my',
      name: 'my',
      component:()=>import('@/page/my/my')
    },

    ...product

  ]
})
