var Toast = {};

var toastVM = null,    //存储toast vm
	showToast = false; // 存储toast显示状态

Toast.install = function(Vue) {

	Vue.prototype.$toast = function(msg) {//方法挂载在vue内
         var nowType;
		var tmp = '<div class="Success" v-show="visible"><div class="top" ><img src="'+require('../../assets/success.png')+'" /></div><p >{{message}}</p></div>'
        
         
		if(showToast) {//之前toast还未消失
			return;

		}

		if(!toastVM) {//判断如果页面内无toast对象  创建一个新的 挂载在vue内
			var instance = Vue.extend({
				data: function() {
					return {
						visible: showToast,
						message: msg
                        
					}
				},
				template: tmp
			});

			toastVM = new instance()   
			var tpl = toastVM.$mount().$el;//挂载到vue
			document.body.appendChild(tpl); //添加元素

		}

		toastVM.visible = showToast = true;     //toast 显示
		toastVM.message = msg                  //改变toast 文字
        toastVM.type = nowType   
		setTimeout(function() {
			 toastVM.visible = showToast = false;          //toast 消失
		}, 1500)

	}

}

module.exports = Toast;