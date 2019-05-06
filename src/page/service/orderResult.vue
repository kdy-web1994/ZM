<template>
  <div class="orderResult">
    <Header leftIcon="back" titleColor="#333" title="订单查询" bg="#F6F6F6"/>
    <div class="content">
      <div class="item">
        <div class="top">
          <span class="left">会员首单M000000001</span>
          <span class="right">2018-06-22</span>
        </div>
        <div class="contentBox">
              <div class="topBox">
                      <div class="itemBox">
                         <div class="person"></div>
                         <span>用户：CN1111111111/张三</span>
                      </div>
                      <div class="itemBox" style="margin:0">
                          <div class="shop"></div>
                          <span>店铺编号：CN00000000</span>
                      </div>
                  <boxLine />
              </div>
              <div class="bottomBox">
                <p>实发/应发总数：100/100</p>
              <p>订购商品数量：100</p>
              <p>总金额：￥100</p>
              <p>抵扣积分：100</p>
              </div>
        </div>
      </div>
    </div>
     <div class="content">
      <div class="item">
        <div class="top cancel">
          <span class="left">会员首单M000000001</span>
          <span class="right">2018-06-22</span>
        </div>
        <div class="contentBox">
              <div class="topBox">
                      <div class="itemBox">
                         <div class="person"></div>
                         <span>用户：CN1111111111/张三</span>
                      </div>
                      <div class="itemBox" style="margin:0">
                          <div class="shop"></div>
                          <span>店铺编号：CN00000000</span>
                      </div>
                  <boxLine />
              </div>
              <div class="bottomBox">
                <p>实发/应发总数：100/100</p>
              <p>订购商品数量：100</p>
              <p>总金额：￥100</p>
              <p>抵扣积分：100</p>
              </div>
        </div>
      </div>
    </div>
    <div class="bg">
      <div class="icon"></div>
    </div>
  </div>
</template>
  <script>
export default {};
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
    .item {
      width: 6.9rem;
      height: 4.48rem;
      background: #fff;
      border-radius: 0.1rem;
      margin-bottom: .5rem;
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
    position: absolute;
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
  