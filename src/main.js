// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'      //router
import FastClick from 'fastclick'
import store from './store/store'  //vuex
import init from './components/index.js'
init()

import { Tab, Tabs, Badge, BadgeGroup, Row, Col, Loading,Popup,Picker,DatetimePicker} from 'vant';
Vue.use(Tab).use(Tabs);
Vue.use(Badge);
Vue.use(BadgeGroup);
Vue.use(Row).use(Col);
Vue.use(Loading);
Vue.use(Popup)
Vue.use(Picker)
Vue.use(DatetimePicker)
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}

import 'mint-ui/lib/style.css'
// import { Picker } from 'mint-ui';

// Vue.component(Picker.name, Picker);


import './plugins/Toast/toast.css'; //自己写的插件css样式
import(/* webpackChunkName: "Toast" */ './plugins/Toast/toast').then((_)=>{  //引入插件
  Vue.use(_)
})


import './plugins/Alert/Alert.css'; //alert 组件
import(/* webpackChunkName: "Alert" */ './plugins/Alert/Alert').then((_)=>{  //引入插件
  Vue.use(_)
})

import './plugins/Loading/Loading.css'; //alert 组件
import(/* webpackChunkName: "Loading" */ './plugins/Loading/Loading').then((_)=>{  //引入插件
  Vue.use(_)
})

import base from '@/assets/js/base.js'
Vue.prototype.$base = base

import Api from '@/api'
import call from '@/callApp.js'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$Api = Api
Vue.prototype.$call = call
Vue.prototype.$config = {
  loadText:['加载中..','没有更多了~','暂无数据'],
  user: {
    mobile: '02036156999',
  },
  view_update: new Date().getTime(),
  appWidth: app.offsetWidth,
}


 import 'muse-ui/dist/muse-ui.css';

import {LoadMore} from 'muse-ui';
Vue.use(LoadMore);


Vue.config.productionTip = false

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
  'App':() => import('./App')
  },
  template: '<App/>'
})
