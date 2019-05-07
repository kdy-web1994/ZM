var Loading = {};

var LoadingVM = null,    //存储toast vm
	showLoading = false; // 存储toast显示状态

	Loading.install = function(Vue) {

	Vue.prototype.$loading = function() {//方法挂载在vue内
         var nowType;
		var tmp = '<div class="Loading" v-show="visible"><div style="background:url('+require("../../assets/loading.gif")+') no-repeat;background-size:100% 100%;"  class="icon"></div></div>'
        
         
		if(showLoading) {//之前toast还未消失
			
			return;

		}

		if(!LoadingVM) {//判断如果页面内无toast对象  创建一个新的 挂载在vue内
			var instance = Vue.extend({
				data: function() {
					return {
						visible: showLoading,
						
					}
				},
				methods:{
					
				  },
				template: tmp
			});

			LoadingVM = new instance()   
			var tpl = LoadingVM.$mount().$el;//挂载到vue
			document.body.appendChild(tpl); //添加元素

		}

		LoadingVM.visible = showLoading = true;     //toast 显示
	
		

    }
    Vue.prototype.$loading.clear=function(){
        console.log(1)
        if(showLoading){
            LoadingVM.visible = showLoading = false;          //toast 消失
            console.log(LoadingVM.visible)
        }
    
    
    
    
    }

}

module.exports = Loading;