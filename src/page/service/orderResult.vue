<template>
  <div class="orderResult">
    <Header leftIcon="back" titleColor="#333" title="订单查询" bg="#F6F6F6"/>
    <mu-load-more :loading="false" @load="loadList" :loaded-all="all" v-if="List.length>0">
    <div class="content">
      <div class="item" v-for='item in List' :key='item.id' @click='$router.push({path:"/service/orderDetails",query:{id:item.id,orderSn:item.orderSn} })'>
        <div :class="['statusIcon',item.status==1?'cancelIcon':item.auditStatus==1?'checkIcon':'']"></div>
        <div class="top">
          <span class="left">{{item.type==11?'会员补单':item.type==10?'会员首单':item.type==12?'县代理订单':item.type==18?'县代理补单':item.type==20?'店铺单':item.type==19?'店铺补单':item.type==21?'积分换购单':item.type==13?'重消单':item.type==5?'辅销品订单':''}}  {{item.orderSn}}</span>
          <span class="right">{{item.auditDate}}</span>
        </div>
        <div class="contentBox">
              <div class="topBox">
                      <div class="itemBox">
                         <div class="person"></div>
                         <span>用户：{{item.userCode+'/'+item.userName}}</span>
                      </div>
                      <div class="itemBox" style="margin:0">
                          <div class="shop"></div>
                          <span>店铺编号：{{item.shopNumber}}</span>
                      </div>
                  <boxLine />
              </div>
              <div class="bottomBox">
                <p>实发/应发总数：{{item.realNumber+'/'+item.totalNumbe}}</p>
              <p>订购商品数量：{{item.totalNumbe}}</p>
              <p>总金额：￥{{item.totalAmount}}</p>
              <p>抵扣积分：{{item.deductibleIntegral}}</p>
              </div>
        </div>
      </div>
      <div v-show="loading&&List.length>0" class="loading">
        <!-- 加载动画 -->
        <div class="mid">
          <i></i>
          <span>正在加载更多...</span>
        </div>
      </div>
    </div>
      
      
      
    </mu-load-more>
    <div class="bg">
      <div class="icon"></div>
    </div>
  </div>
</template>
  <script>
export default {
  data(){
    return {
       all: false,
      loading: false,
      List: [],
      postData: {
        pa: 1,
        li: 10,
        ob: 2,
        ot: 2,
      },
    }
  },
  computed:{
    pageQuery(){
      return JSON.parse(this.$route.query[0])  // 订单w参数
    },
  },
  created(){
      this.loadList()
  },
  methods:{
    loadList(){
       if(this.loading){
        return
      }
       this.loading = true;
      let w=this.pageQuery,
        table = {
          pa: this.postData.pa,
          li: this.postData.li,
          ob: this.postData.ob,
          ot: this.postData.ot,
          w: w
        }
       
      this.$Api.getOrderList(table).then(res=>{
        console.log(res)
        let q=res.q
        if(q.s==0){
          this.postData.pa+=1
          
         if (this.postData.pa>= Math.ceil(q.total / 10)) this.all = true;
           setTimeout(()=>{
          q.orders=this.$base.timeFormat(q.orders,'auditDate','yyyy-MM-dd hh:mm')
          this.List.push(...q.orders)
           this.loading = false;
            },700)
        }
      })
    }
  }
};
</script>
  <style lang="scss" scoped>
.orderResult {
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
  padding: 0.2rem 0.3rem;
  padding-top: 1.08rem;
  box-sizing: border-box;
  .content {
    position: relative;
    z-index: 10;
    padding-top: 0.2rem;
    min-height: 100vh;
    padding-bottom: 0.9rem;
    .loading {
  padding: 0.2rem 0;
  width: 100%;
  position: absolute;
  bottom: 0.2rem;
	.mid {
		display: flex;
		display: -webkit-box;
		/* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
		display: -moz-box;
		/* 老版本语法: Firefox (buggy) */
		display: -ms-flexbox;
		/* 混合版本语法: IE 10 */
		display: -webkit-flex;
		/* 新版本语法: Chrome 21+ */
		-webkit-justify-content: center;
		-moz-justify-content: center;
		-ms-justify-content: center;
		-o-justify-content: center;
		justify-content: center;
		align-items: center;
		 -webkit-align-items:center;
box-align:center;
-moz-box-align:center;
-webkit-box-align:center;
border: none;
		i {
			width: 0.28rem;
			height: 0.3rem;
			float: left;
			background: url(../../assets/common_icon_Load@3x.png) no-repeat;
			background-size: 100%;
			position: relative;
			// top: 0.05rem;
			transition: 0.75s;
			animation: icon 1s 0s infinite linear;
		}
		@keyframes icon {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
		span {
			font-size: 0.28rem;
			margin-left: 0.08rem;
			color: #999999;
		}
	}
}
    .item {
      width: 6.9rem;
      height: 4.48rem;
      background: #fff;
      border-radius: 0.1rem;
      margin-bottom: .5rem;
      position: relative;
       .statusIcon{
           position: absolute;
           width: 1.2rem;
           height: 1.2rem;
           right: 0;
           bottom: 0;
       }
       .cancelIcon{
         background: url("../../assets/service_iconorder__cancel@3x.png") no-repeat;
         background-size:100% 100%; 
       }
       .checkIcon{
  background: url("../../assets/service_iconorder__audit@3x.png") no-repeat;
         background-size:100% 100%; 
       }
      .top {
        width: 6.9rem;
        height: 0.36rem;
        background: linear-gradient(
          45deg,
          rgba(237, 108, 0, 1),
          rgba(243, 152, 0, 1)
        );
        border-radius: 0.1rem 0.1rem 0px 0px;
        line-height: 0.36rem;
        color: #fff;
        display: flex;
        justify-content: space-between;
        .left {
          margin-left: 0.3rem;
        }
        .right {
          margin-right: 0.3rem;
        }
        span {
          font-size: 0.22rem;
        }
      }
      .cancel {
        background: rgba(204, 204, 204, 1);
        .left {
          color: #666666;
        }
      }
      .contentBox{
        position: relative;
        padding:0 .3rem;
        box-sizing: border-box;
            .topBox{
              height: 1.6rem;
              position: relative;
              padding: .4rem 0;
              .itemBox{
                margin-bottom: .2rem;
                display: flex;
                align-items: center;
               .shop {
                    width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
        background: url("../../assets/service/service_icon_store_orange@3x.png")
          no-repeat;
        background-size: 100% 100%;
        margin-right: .1rem
      }
      .person{
           width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
         background: url("../../assets/service/service_icon_person_orange@3x.png")
          no-repeat;
        background-size: 100% 100%;
         margin-right: .1rem
      }
              }
            }
            .bottomBox{
              padding: .4rem 0;
              p{
                margin: 0;
                font-size: .3rem;
                color: #666666;
                margin-bottom: .02rem;
              }
            }
      }
    }
  }
  .bg {
    width: 100%;
    max-width: 700px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    .icon {
      width: 5.9rem;
      height: 5.57rem;
      position: absolute;
      bottom: 0.7rem;
      left: 0.8rem;
      background: url("../../assets/Order.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
  