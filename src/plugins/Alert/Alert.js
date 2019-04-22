var Alert = {};

var AlertVM = null,    //存储toast vm
	showAlert = false; // 存储toast显示状态

	Alert.install = function(Vue) {

	Vue.prototype.$alert = function(msg,alertText) {//方法挂载在vue内
         var nowType;
		var tmp = '<div class="Alert" v-show="visible"><div class="AlertBox"><div class="top"><div class="content">{{message}}</div></div><div class="bottom"><div class="alert"  @click="close">{{alertText}}</div> </div></div></div>'
        
         
		if(showAlert) {//之前toast还未消失
			if(AlertVM){
				AlertVM.message = msg                  //改变toast 文字
				AlertVM.alertText=alertText
				AlertVM.visible=showAlert;
      }
			return;

		}

		if(!AlertVM) {//判断如果页面内无toast对象  创建一个新的 挂载在vue内
			var instance = Vue.extend({
				data: function() {
					return {
						visible: showAlert,
						alertText,
						message: msg
					}
				},
				methods:{
					close(){
						console.log(1)
					  this.visible=false
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
		

	}

}

module.exports = Alert;