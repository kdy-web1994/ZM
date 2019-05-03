var app = {
  type: function () {
    var u = navigator.userAgent;
    return { //移动终端浏览器版本信息
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      Js_Interactive: u.indexOf('Js_Interactive') > -1 || u.indexOf('Linux') > -1, //Js_Interactive终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1,
      wechat: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
      //是否web应该程序，没有头部与底部
    };
  }()
}

let callApp = {
  CallApp: function (param) {
    if (app.type.ios) {
      window.webkit.messageHandlers.CallApp.postMessage(param);
    } else if (app.type.Js_Interactive) {
      window.Js_Interactive.CallApp(param);
      console.log(param);
    }
  },
  inApp() {
    return Boolean((window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.goBack) || (window.Js_Interactive && window.Js_Interactive.goBack))
  },
  testType() {
    return app.type
  },
  // getSession: function (session) {
  //   console.log(session);
  //   localStorage.setItem('session', session);
  // },

  checkOutCounter: function (param) {
    if (app.type.ios) {
      window.webkit.messageHandlers.checkOutCounter.postMessage(param);
    } else {
      window.Js_Interactive.checkOutCounter(JSON.stringify(param));
    }
  },
  //分享
  invokeShare: function (param) {
    if (app.type.ios) {
      window.webkit.messageHandlers.invokeShare.postMessage(param);
    } else {
      window.Js_Interactive.invokeShare(JSON.stringify(param));
    }
  },
  //联系客服
  contactCustomerService: function (param) {
    if (app.type.ios) {
      window.webkit.messageHandlers.contactCustomerService.postMessage(param);
    } else {
      window.Js_Interactive.contactCustomerService(JSON.stringify(param));
    }
  },
  CashierDesk: function (param) {
    param.from = 'chxgo';
    if (app.type.ios) {
      window.webkit.messageHandlers.CashierDesk.postMessage(param);
    } else {
      window.Js_Interactive.CashierDesk(JSON.stringify(param));
    }
  },
  CallPage: function (param) {
    if (app.type.ios) {
      window.webkit.messageHandlers.CallPage.postMessage(param);
    } else {
      window.Js_Interactive.CallPage(JSON.stringify(param));
    }
  },
  goBack: function (params) {
    if (app.type.ios) {
      window.webkit.messageHandlers.goBack.postMessage(params);
    } else {
      window.Js_Interactive.goBack();
    }
  },
  forward: function (param) {
    if (app.type.ios) {
      window.webkit.messageHandlers.forward.postMessage(param);
    } else {
      window.Js_Interactive.forward(JSON.stringify(param));
    }
  },
  //发起订单提交的界面
  invokeOrderSubmit(param) {
    if (app.type.ios) {
      window.webkit.messageHandlers.invokeOrderSubmit.postMessage(param);
    } else {
      window.Js_Interactive.invokeOrderSubmit(JSON.stringify(param));
    }
  },
  ShowTab: function (param) {
    if (app.type.ios) {
      window.webkit.messageHandlers.ShowTab.postMessage(param);
    } else {
      window.Js_Interactive.ShowTab(JSON.stringify(param));
    }
  },
  // 跳到登录页
  invokeLogin(param){
    if (app.type.ios) {
      window.webkit.messageHandlers.invokeLogin.postMessage(param);
    } else {
      window.Js_Interactive.invokeLogin(JSON.stringify(param));
    }
  }
}

window.CallApp = callApp.CallApp;
window.invokeShare = callApp.invokeShare;
window.Share = callApp.Share;
window.CashierDesk = callApp.CashierDesk;
window.CallPage = callApp.CallPage;
window.backward = callApp.backward;
window.forward = callApp.forward;

window.invokeOrderSubmit = callApp.invokeOrderSubmit;
window.contactCustomerService = callApp.contactCustomerService;

window.ShowTab = callApp.ShowTab;
window.checkOutCounter = callApp.checkOutCounter;
window.getSession = callApp.getSession;

export default callApp;
