var Alert = {};

var AlertVM = null,    //存储toast vm
	showAlert = false; // 存储toast显示状态

	Alert.install = function(Vue) {

	Vue.prototype.$alert = function(obj) {//方法挂载在vue内
         var nowType;
		var tmp = '<div class="Alert" v-show="visible"><div class="top" ><img src="'+require('../../assets/common_icon_ok@2x.png')+'" v-if="type==1" /><img src="'+require('../../assets/common_btn_close3@2x.png')+'" v-if="type==2" /></div><p >{{message}}</p></div>'
        
         
		if(showAlert) {//之前toast还未消失
			return;

		}

		if(!AlertVM) {//判断如果页面内无toast对象  创建一个新的 挂载在vue内
			var instance = Vue.extend({
				data: function() {
					return {
						...obj
					}
				},
				template: tmp
			});

			AlertVM = new instance()   
			var tpl = AlertVM.$mount().$el;//挂载到vue
			document.body.appendChild(tpl); //添加元素

		}

		AlertVM.visible = showToast = true;     //toast 显示
		AlertVM.message = msg                  //改变toast 文字
        AlertVM.type = nowType   
		setTimeout(function() {
			AlertVM.visible = showToast = false;          //toast 消失
		}, 1500)

	}

}

module.exports = Alert;