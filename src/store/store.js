import Vue from 'vue'
import Vuex from 'vuex'
import Home from './Home/Home.js'
import Shop from './Shop/Shop.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules:{
		Home:Home,
		Shop:Shop
	},
	state: {
			 avatar:"",
			 user:{}
	},
	getters: {
		getAvatar:state=>{
			return state.avatar
		},
	},
	mutations: {
    changeAvatar(state,avatar){
      state.avatar = avatar;
		},
		changeUser(state,user={}){
        state.user={...user}
		}
	},
	actions: {
     commitAvatar({
 			commit
 		},avatar){
 			commit('changeAvatar',avatar)
 		},

	}


})
export default store
