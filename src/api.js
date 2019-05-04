import axios from 'axios'
import Vue from 'vue'
import router from './router'
import call from '@/callApp.js'
import md5 from '../static/js/md5.js'
import base from '@/assets/js/base.js'

import { Toast } from 'vant';



var SESSION = localStorage.getItem('session')
function getSession(){
	SESSION = localStorage.getItem('session')
	return SESSION;
}

let devUrl = "/api/"
Vue.prototype.$imgUrl='http://midvein.d.aiitec.org'

if (window.location.host == 'h5.midvein.d.aiitec.org') {
	devUrl = 'http://midvein.d.aiitec.org/api/'
	Vue.prototype.$imgUrl = 'http://midvein.d.aiitec.org'
} else if(window.location.host == 'h5.laca.cn'){
	devUrl = 'https://app.laca.cn/api/'
	Vue.prototype.$imgUrl = 'https://app.laca.cn'
}

// 服务器接口配置
let serverUrlArr = [
	{
		serverType:'EC',
		mk: 'H5&EC_201807',
		serverUrl: devUrl+'Base/sendEc',
		keys: ['UserLogin','UserLogout','UserRoleQuery','UserPasswordUpdate','UserDetails','OrderList','OrderDetails','InvoiceList','PowerInfo']
	},{
		serverType: 'ERP',
		mk: 'H5&ERP_201807',
		serverUrl: devUrl+'Base/sendErp',
		keys: ['IntegralList','IntegralDetails','ShopList','ShopDetails','PackageList','PackageStatusUpdate','CustomerServiceList','CustomeExchangeDetails','CustomerRepairDetails','AfterSaleEntrustmentList','AfterSaleEntrustmentSubmit','AfterSaleEntrustmentDetails','AfterSaleEntrustmentUpdate','ExpressDetails','RegionList','InvoiceList']
	},{
		serverType: 'APP',
		mk: 'H5&APP_201807',
		serverUrl: devUrl,
		keys: ['Session','Upload','CategoryList','DeleteItem','MessageList','ArticleList','ArticleDetails','AdList','AddCollect','UpdateDeviceUser','GetWeiXingSignPackage','AddPraise']
	}
]
// 整合接口服务器地址
function getPostSevObj(URL){
	if(!URL)
		return URL
	let kN = new RegExp(URL.slice(URL.lastIndexOf('/')+1),'i')
	let appkN = URL.slice(URL.lastIndexOf('/',URL.lastIndexOf('/')-1)+1)

	// 特殊处理
	// InvoiceList  	APP->EC APP-ERP
	// InvoiceDetails  APP->EC APP-ERP
	if(appkN.indexOf('sv_EC')==0) {
		return {
			mk : serverUrlArr[0].mk,
			url:serverUrlArr[0].serverUrl 
		}
	}
	if(appkN.indexOf('sv_ERP')==0) {
		return {
			mk : serverUrlArr[1].mk,
			url:serverUrlArr[1].serverUrl
		}
	} 
	if(serverUrlArr[0].keys.join(',').match(kN)!=null) {
		return {
			mk : serverUrlArr[0].mk,
			url:serverUrlArr[0].serverUrl
		}
	}
	if(serverUrlArr[1].keys.join(',').match(kN)!=null) {
		return {
			mk : serverUrlArr[1].mk,
			url:serverUrlArr[1].serverUrl
		}
	}
	if(serverUrlArr[2].keys.join(',').match(kN)!=null) {
		return {
			mk : serverUrlArr[2].mk,
			url:serverUrlArr[2].serverUrl+appkN
		}
	}
}

// 
function recurseDeleteNoValueParams(obj){
	let ev='object'===typeof(obj)&&obj.length===undefined?1
		:'object'===typeof(obj)&&obj.length!==undefined?2:0
	if (ev===0) return obj
	for (let k in obj) {
		let v=obj[k]
		if(v==="" || ('object'===typeof(v)&&v.length===0) || ('object'===typeof(v)&&Object.keys(v).length===0) ) {
			ev==1 ? delete obj[k] : ev==2 ? obj.splice(k,1) : null
		}
		if(('object'===typeof(v)&&v.length>0) || ('object'===typeof(v)&&Object.keys(v).length>0))
			obj[k] = recurseDeleteNoValueParams(v)
	}
	return obj
}

function axiosApi(url, option, method = 'POST', stopLogin = false, cancelToken,isUseDetailFailTip = true) {
	let promise;

	promise = new Promise((resolve, reject) => {
			option.headers = {
				'Content-Type': 'application/json',
      	'Device-Type':'h5'
			}
			if(method != 'POST') {
				option.data = {}
			}
		let sev_Obj = getPostSevObj(url)
		let mk = sev_Obj.mk
		url = sev_Obj.url
		option.data.q = recurseDeleteNoValueParams(option.data.q)
		option.data.m = md5(JSON.stringify(option.data)+mk)
		let obj = Object.assign({
				method,
				url,
				cancelToken
			}, option)
		// var toast099 = Toast.loading({ message:'加载中', loadingType:'spinner',duration:0,mask:true })
		axios(obj).then((response) => {
			// toast099.clear()
      if(response.data.q) {
        if(response.data.q.s != '0') {
					let error = checkErr(response.data.q.s)
					if(response.data.q.s != '1020' && response.data.q.s != '1100' && response.data.q.s != '8001' && response.data.q.s != '1116'){
						if(response.data.q.d && isUseDetailFailTip){
							Toast({ message: response.data.q.d, duration: 3000, position:'center' })
						}
					}
					if (response.data.q.s == 1002) {
						localStorage.removeItem('zm_user')
						localStorage.removeItem('zm_power')
						__Vue.$emit('session')
					}
					if(response.data.q.s == '1116') {
						Toast({ message: '您好！十分抱歉，此用户编号无效，谢谢！', duration: 3000, position:'center' })
					}
          if(response.data.q.s == '1100'|| response.data.q.s == '1012' || response.data.q.s == '1319' || response.data.q.s == '1107') {
						if(response.data.n != 'IntegralDetails') {
							localStorage.removeItem('zm_user')
							localStorage.removeItem('zm_power')
							if(localStorage.getItem('zm_app')==1) {
								call.invokeLogin('') 
							} else {
								// if(router.history.current.name!='newsdetail')
								// 	router.push({name: 'login'})
							}
						}
					}
        } else {
          if(typeof response.data=='string')
						response.data = JSON.parse(response.data)
					if (response.data.n==='Session') {
						localStorage.setItem('session',response.data.s)
						SESSION=response.data.s
					}
					if(response.data.n==='UserLogout') {
						localStorage.removeItem('zm_user')
						localStorage.removeItem('zm_power')
					}
					if(response.data.n==='UserDetails')
						localStorage.setItem('zm_user',JSON.stringify(response.data.q.user))
					if(response.data.n==='PowerInfo') {
						localStorage.setItem('zm_power',JSON.stringify(response.data.q.powerStr))
					}
        }
			}
			resolve(response.data)
    }).catch((err) => {
			console.log(err)
			reject(err)
			toast099.clear()
		})
		
	})
	return promise;
}

let Api = {
	setSessionId(sessionId) {
		new Promise((resolve, reject)=>{
			SESSION = sessionId
			resolve()
		})
	},
	untilSessionId: () => {
    return new Promise((resolve, reject) => {
      var timer = setInterval(getSessionId, 50);
      function getSessionId() {
        if(localStorage.getItem('session')) {
          clearInterval(timer);
          resolve()
        }
      }
    })
	},

	//
  // ────────────────────────────────────────────── III ──────────
  //   :::::: 6.Base基础底层
  // ────────────────────────────────────────────────────────────
  //
	
	/**
   * 1.	获取会话Session
   */
	getSession:(deviceToken,md)=>{
		return axiosApi(devUrl + 'Base/Session', {
      data: {
        'n': 'Session',
        'q': {
        	a:1,
          deviceToken,
          deviceType:16,
        }
      }
    })
	},
	// 2. 更新设备用户
	UpdateDeviceUser: (userId)=>{
		return axiosApi(devUrl + 'Base/UpdateDeviceUser', {
			data: {
				'n': 'UpdateDeviceUser',
				's': SESSION?SESSION:getSession(),
				'q':{
					userId
				}
			}
		})
	},
  
  /**
   * 3.	上传图片
   */
	getUploadImg:(formdata) =>{
		let obj = {
			async: false,
			method: 'POST',
			url: devUrl + 'Base/Upload',
			headers: {
				"Content-Type": "multipart/form-data"
			},
			data: formdata
		}
		var uploadToast = Toast.loading({ message:'上传中', loadingType:'spinner',duration:0,mask:true })
		return new Promise((resolve, reject) => {
			axios(obj).then( (res) => {
				uploadToast.clear()
				resolve(res.data)
			}).catch((err)=>{
				uploadToast.clear()
				reject(err)
			})
		})
	},

	// 4. 文章分类查询
	getCategoryList:(a)=>{
		return axiosApi(devUrl + 'Base/CategoryList', {
			data: {
				'n': 'CategoryList',
				's': SESSION?SESSION:getSession(),
				'q':{
					a
				}
			}
		})
	},

	// 5. 删除对象
	DeleteItem:(a,userId,ids)=>{
		return axiosApi(devUrl + 'Base/DeleteItem', {
			data: {
				'n': 'DeleteItem',
        's': SESSION?SESSION:getSession(),
				'q':{
					a,
					userId,
					ids
				}
			}
		})
	},	

	// 6. 添加收藏
	getAddCollect: (a,type,id,userId) => {
		return axiosApi(devUrl + 'Base/AddCollect', {
			data: {
				'n': 'AddCollect',
				's': SESSION?SESSION:getSession(),
				'q':{
					a,
					type,
					id,
					userId
				}
			}
		})
	},

	// 7. 注册微信配置
	GetWeiXingSignPackage: (abc)=>{
		return axiosApi(devUrl + 'Base/GetWeiXingSignPackage', {
			data: {
				'n': 'GetWeiXingSignPackage',
				's': SESSION?SESSION:getSession(),
				'q':{
					abc
				}
			}
		})
	},

	// 8. 省市区列表
	getRegionList: (a,id)=>{
		return axiosApi(devUrl + 'Base/RegionList', {
			data: {
				'n': 'RegionList',
				's': SESSION?SESSION:getSession(),
				't': 0,
				'q':{
					a,
					id
				}
			}
		})
	},

	/*
	 * 9.	文章点赞AddPraise
	 */
	AddPraise: (a,type,id) => {
		return axiosApi(devUrl + 'Base/AddPraise', {
			data: {
				'n': 'AddPraise',
				's': SESSION?SESSION:getSession(),
				'q':{
					a,type,id
				}
			}
		})
	},

  //
  // ────────────────────────────────────────────── III ──────────
  //   :::::: 7.CIS客户信息系统
  // ────────────────────────────────────────────────────────────
  //
	/**
	 * 1.	登录UserLogin
	 * 
	 */
	UserLogin: (uid,password) => {
		return axiosApi(devUrl + 'Cis/UserLogin', {
			data: {
				'n': 'UserLogin',
				's': SESSION?SESSION:getSession(),
				'q': {
					uid,
					password,
				}
			},	
		})
	},
	/**
	 * 2.	登出UserLogout
	 */
	UserLogout: () => {
		return axiosApi(devUrl + 'Cis/UserLogout', {
			data: {
				'n': 'UserLogout',
				's': SESSION?SESSION:getSession(),
				'q': {
					abc:999
				}
			}
		})
	},

  /**
   * 3. 查询个人信息
   */
  UserDetails: (id) => {
    return axiosApi(devUrl + 'Cis/UserDetails', {
      data: {
        'n': 'UserDetails',
        's': SESSION?SESSION:getSession(),
        'q': {
          id
        }
      }
    })

  },
	
	/**
   * 4. 我的消息
   *
   */
  getMessageList:(userId,table)=>{
  	return axiosApi(devUrl + 'Cis/MessageList', {
      data: {
        'n': 'MessageList',
        's': SESSION?SESSION:getSession(),
        'q': {
        	userId,
        	ta:{
						pa:table.pa,
						li:table.li,
						ob:table.ob,
						ot:table.ot
					}
        }
      }
    })
	},

	/**
   * 5.	用户密码更新
   *
   */
	getUserPasswordUpdate:(a,user)=>{
		return axiosApi(devUrl + 'Cis/UserPasswordUpdate', {
      data: {
        'n': 'UserPasswordUpdate',
        's': SESSION?SESSION:getSession(),
        'q': {
        	a,
        	user:{
						id:user.id,
						idCard:user.idCard,
						name:user.name,
						password:user.password,
						oldPassword:user.oldPassword
					}
        }
      }
    })
	},
	
	/**
   * 6.	用户编号查询
   *
   */
	getUserRoleQuery:(uid)=>{
		return axiosApi(devUrl + 'Cis/UserRoleQuery', {
      data: {
        'n': 'UserRoleQuery',
        's': SESSION?SESSION:getSession(),
        'q': {
        	uid
        }
      }
    })
	},

	/**
   * 7.	用户积分列表
   *
   */
	getIntegralList:(table)=>{
		return axiosApi(devUrl + 'Cis/IntegralList', {
      data: {
        'n': 'IntegralList',
				's': SESSION?SESSION:getSession(),
        'q': {
					ta: {
						pa:table.pa,
						li:table.li,
						ob:table.ob,
						ot:table.ot
					}
        }
      }
    })
	},

	/**
   * 8.	用户积分列表
   *
   */
	getIntegralDetails:()=>{
		return axiosApi(devUrl + 'Cis/IntegralDetails', {
      data: {
        'n': 'IntegralDetails',
				's': SESSION?SESSION:getSession(),
        'q': {

        }
      }
    })
	},

	/**
   * 9. 我的权限
   *
   */
	getPowerInfo:()=>{
		return axiosApi(devUrl + 'Cis/PowerInfo', {
      data: {
        'n': 'PowerInfo',
				's': SESSION?SESSION:getSession(),
        'q': {

        }
      }
    })
	},
  
	//
	// ────────────────────────────────────────────── IV ──────────
	//   :::::: 8.Cms内容管理系统
	// ────────────────────────────────────────────────────────────
	//
	/*
	 * 1.	文章列表ArticleList
	 */
	getArticleList: (a,ta,cancelToken) => {
		return axiosApi(devUrl + 'Cms/ArticleList', {
			data: {
				'n': 'ArticleList',
				's': SESSION?SESSION:getSession(),
				'q':{
					a,
					ta,
				}
			}
		},'POST',false,cancelToken)
	},
	/*
	 * 2.	文章详情ArticleDetails
	 */
	getArticleDetails: (type,id,userId) => {
		return axiosApi(devUrl + 'Cms/ArticleDetails', {
			data: {
				'n': 'ArticleDetails',
				's': SESSION?SESSION:getSession(),
				'q':{
					type,
					id,
					userId
				}
			}
		})
	},

	/*
	 * 3	广告列表AdList
	 */
	getAdList: (a) => {
		return axiosApi(devUrl + 'Cms/AdList', {
			data: {
				'n':'AdList',
				's': SESSION?SESSION:getSession(),
				'q':{
					a
				}
			}
		})
	},

	
	
	//
	// ────────────────────────────────────────────── IV ──────────
	//   :::::: 9.Shop店铺管理系统
	// ────────────────────────────────────────────────────────────
	//

	/*
	 * 1	店铺查询ShopList
	 *
	 */
	getShopList:(a,table)=>{
		return axiosApi(devUrl + 'Shop/ShopList', {
			data: {
				'n': 'ShopList',
				's': SESSION?SESSION:getSession(),
				'q': {
					a,
					ta:{
						pa:table.pa,
						li:table.li,
						ob:table.ob,
						ot:table.ot,
						w:table.w
					}
				}
			}
		})
	},

	/*
	 * 2	店铺详情ShopDetails
	 *
	 */
	getShopDetails:(a,id)=>{
		return axiosApi(devUrl + 'Shop/ShopDetails', {
			data: {
				'n': 'ShopDetails',
				's': SESSION?SESSION:getSession(),
				'q': {
					id
				}
			}
		})
	},

	//
	// ────────────────────────────────────────────── IV ──────────
	//   :::::: 10.Order订单管理系统
	// ────────────────────────────────────────────────────────────
	//
	/*
	 *  1.	订单列表OrderList
	 */
	getOrderList:(table)=>{
		return axiosApi(devUrl + 'order/OrderList', {
			data: {
				'n': 'OrderList',
				's': SESSION?SESSION:getSession(),
				'q':{
					ta:{
						pa:table.pa,
						li:table.li,
						ob:table.ob,
						ot:table.ot,
						w: table.w
					}
				}
			}
		})
	},

	/*
	 *  2.	订单详情OrderDetails
	 *
	 */
	getOrderDetails:(id)=>{
		return axiosApi(devUrl + 'order/OrderDetails', {
			data: {
				'n': 'OrderDetails',
				's': SESSION?SESSION:getSession(),
				'q':{
					id
				}
			}
		})
	},

	/*
	*  3.1 发货单列表   EC
	*/
	getInvoiceList_EC:(table)=>{
		return axiosApi(devUrl + 'sv_EC/InvoiceList', {
			data: {
				'n': 'InvoiceList',
				's': SESSION?SESSION:getSession(),
				'q':{
					ta:{
						pa: table.pa,
						li: table.li,
						ob: table.ob,
						ot: table.ot,
						w: table.w
					}
				}
			}
		})
	},

	/*
	*  3.2 发货单列表   ERP
	*/
	getInvoiceList_ERP:(table)=>{
		return axiosApi(devUrl + 'sv_ERP/InvoiceList', {
			data: {
				'n': 'InvoiceList',
				's': SESSION?SESSION:getSession(),
				'q':{
					ta:{
						pa: table.pa,
						li: table.li,
						ob: table.ob,
						ot: table.ot,
						w: table.w
					}
				}
			}
		})
	},

	/* 4.1	发货单详情  EC
	*/
	getInvoiceDetails_EC:(id)=>{
		return axiosApi(devUrl + 'sv_EC/InvoiceDetails', {
			data: {
				'n': 'InvoiceDetails',
				's': SESSION?SESSION:getSession(),
				'q':{
					id,
				}
			}
		})
	},

	/*
	*  4.2	发货单详情  ERP
	*/
	getInvoiceDetails_ERP:(id)=>{
		return axiosApi(devUrl + 'sv_ERP/InvoiceDetails', {
			data: {
				'n': 'InvoiceDetails',
				's': SESSION?SESSION:getSession(),
				'q':{
					id,
				}
			}
		})
	},
	/*
	*  5	包裹状态更新 
	*/
	getPackageStatusUpdate:({questionnaires,trackingNumber,contact,phone})=>{
		return axiosApi(devUrl + 'order/PackageStatusUpdate', {
			data: {
				'n': 'PackageStatusUpdate',
				's': SESSION?SESSION:getSession(),
				'q':{
					questionnaires,
					trackingNumber,
					contact,
					phone
				}
			}
		},'POST',false,null,false)
	},

	/*
	*  6	检测包裹状态
	*/
	getExpressDetails:(a,trackingNumber)=>{
		return axiosApi(devUrl + 'order/ExpressDetails', {
			data: {
				'n': 'ExpressDetails',
				's': SESSION?SESSION:getSession(),
				'q':{
					a,
					trackingNumber
				}
			}
		},'POST',false,null,false)
	},








}








function checkErr(status) {
  let err;
  switch (status) {
    case '1000':
      err = '未知错误'
      break;
    case '1001':
      err = '协议版本过低，服务器已经不支持（APP 版本过低）'
      break;
    case '1002':
      err = 'session id 为空或不存在'
      break;
    case '1003':
      err = '验证码错误'
      break;
    case '1004':
      err = '请求参数不完整'
      break;
    case '1010':
      err = '请求超时'
      break;
    case '1011':
      err = '请求超时'
      break;
    case '1012':
      err = 'session id 会话过期'
      break;
    case '1012':
      err = 'session id 会话过期'
      break;
    case '1013':
      err = '未更新任何数据'
      break;
    case '1014':
      err = '已经提交，不需要重复提交'
      break;
    case '1015':
      err = '短信发送失败'
      break;
    case '1016':
      err = '参数不符合条件'
      break;
    case '1020':
      err = '缓存数据可用'
      break;
    case '1100':
      err = '（用户）未登录'
      break;
    case '1101':
      err = '用户名和密码错误'
      break;
    case '1102':
      err = '（用户）标识非法'
      break;
    case '1103':
      err = '（用户）不存在'
      break;
    case '1104':
      err = '（用户）已存在'
      break;
    case '1105':
      err = '（用户）已注销'
      break;
    case '1106':
      err = '（用户）被锁定'
      break;
    case '1107':
      err = '（用户）在别处登录'
      break;
    case '1109':
      err = '用户类型错误'
      break;
    case '1110':
      err = '（用户）推荐码不存在'
      break;
    case '1113':
      err = '手机号码已经存在'
      break;
    case '1114':
      err = '（用户）电话号码已被使用'
      break;
    case '1115':
      err = '（用户）未绑定手机号码'
      break;
    case '1200':
      err = '文件大小超过限制'
      break;
    case '1201':
      err = '文件类型非法'
      break;
    case '1401':
      err = '库存不足'
      break;
    case '1406':
      err = '非法操作'
      break;
    case '9000':
      err = '没有返回状态码'
      break;
    case '9001':
      err = '请求参数格式不正确（json 格式不正确）'
      break;
    case '9002':
      err = '协议不存在'
      break;
    default:
      err = '未知错误'
      break;
  }
  return err;
}

export default Api;
