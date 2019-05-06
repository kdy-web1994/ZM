<template>
  <div class="service">
    <div class="homeHeader">
      <div class="left" @click="goMessage">
        <div class="num">12</div>
        <div class="icon"></div>
      </div>
      <div class="input">
        <div class="icon"></div>
      </div>
      <div class="right" @click="tel">
        <div class="icon"></div>
      </div>
    </div>
    <div class="swiperBox">
      <swiperBox :swiperList="swList" :canJump="true"></swiperBox>
    </div>

    <div class="title">
      <div class="icon"></div>
      <div class="text">常用功能</div>
    </div>
    <div class="content">
      <div v-for="(item,i) in itemArr" class="item" :key="i" :style="[{'background':item.bg}]">
        <div class="box" @click="go(item.router)">
          <div :class="['icon',item.icon]"></div>
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
    <div class="Pop" v-if="show" @click.stop="close('show')">
      <div class="PopBox">
        <div class="question" @click="goQuestion"></div>
        <div class="top">
          <div class="content">如果使用扫一扫无法识别，请使用手动输入。</div>
        </div>
        <div class="bottom">
          <div class="cancel" :style="[{'color':'#ED6C00'}]" @click.stop="cancel">手动输入</div>
          <div class="comfirm" @click.stop="comfirm">扫一扫</div>
        </div>
      </div>
    </div>
    
    <div class="tip" v-if="tip" @click.stop="close('tip')">
      <div class="tipBox">
        <div class="tipTitle">
                            仅首次点击会提示
                        </div>
         <div class="top">
           <img src="../../../static/zmimg/service/service_bg_scan@3x.png" class="icon" />
          <div class="content">
                            如果你无法简洁的表达你的想法，<br/>
                   那只说明你还不够了解它。       <br/>
                 -- 阿尔伯特·爱因斯坦
                        </div>
        </div>
        <div class="bottom" @click.stop="closeTip">
           确认
        </div>

      </div>

    </div>

    <News/>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      swList: [],
      show: false,
      tip:false,
      itemArr: [
        {
          bg: "rgba(255,249,249,1)",
          icon: "store",
          title: "店铺查询",
          router: "search"
        },
        {
          bg: "rgba(255,255,241,1)",
          icon: "order",
          title: "订单查询",
          router: "order"
        },
        {
          bg: "rgba(241,252,255,1)",
          icon: "qrcode",
          title: "扫码签收",
          router: "scan"
        },
        // {
        //   bg: "rgba(248,255,249,1)",
        //   icon: "standard",
        //   title: "运作规范"
        // },
        // {
        //   bg: "rgba(255,248,238,1)",
        //   icon: "media",
        //   title: "媒体中心"
        // },
        {
          bg: "rgba(241,242,255,1)",
          icon: "school",
          title: "美丽学堂",
           router: "study"
        },
        // {
        //   bg: "rgba(255,238,238,1)",
        //   icon: "woman",
        //   title: "美的人"
        // }
      ]
    };
  },
  created() {
    this.getSwiper();
    
  },
  mounted() {},
  methods: {
    goQuestion(){
       this.$router.push({
        path: "/service/active"
      });
    },
    goMessage() {
      console.log(1)
      this.$router.push({
        path: "/home/message"
      });
    },
    tel() {
      window.location.href = `tel:${this.$config.user.mobile}`;
    },
    closeTip(){
      this.tip=false;
localStorage.setItem('tip',1)
        this.show = true;
    },
    close(txt) {
      this[txt] = false;
      
    },
    // 查询物流单号是否合法  是否被签收过
    checkLog(trackingNumber) {
      this.$Api.getExpressDetails(1, trackingNumber).then(res => {
        console.log(res);
        let q = res.q;
        if (q.s == 0)
          this.$router.push({
            path: "/service/qrcode",
            query: {
              num: trackingNumber,
              isoneself: q.isOneself
            }
          });
        else {
          this.$router.push({ path: "/service/qrcodeResult", query: [q.d] });
        }
      });
    },
    cancel() {
      this.$router.push({
        path: "/service/inputNum"
      });
    },
    comfirm() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          let p_logNum = res.resultStr.slice(res.resultStr.indexOf(",", 0) + 1); // 当needResult 为 1 时，扫码返回的结果
          this.checkLog.bind(this)(p_logNum);
        }
      });
    },
    go(router) {
      if (router === "scan") {
        if(!localStorage.getItem('tip')){
      this.tip=true
    }else{
      this.show = true;
    }
        
        return;
      }
      this.$router.push({
        path: "/service/" + router
      });
    },
    getSwiper() {
      this.$Api.getAdList(1).then(res => {
        // console.log(res)
        let q = res.q;
        if (q.s == 0) {
          q.ads = this.$base.pinImgPrefix(q.ads, "imagePath");
          this.swList = q.ads;
          this.$nextTick(() => {
            this.initSwiper();
          });
        }
      });
    },
    initSwiper() {
      this.swiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        observer: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        speed: 500
        // autoplayDisableOnInteraction: false
      });
    }
  }
};
</script>
  <style lang="scss" scoped>
.service {
  min-height: 100vh;
  background: #f4f4f4;
  padding-top: 0.88rem;
  padding-bottom: 1.18rem;
  .Pop {
    position: fixed;

    z-index: 2000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .PopBox {
      width: 5.4rem;
      border-radius: 0.2rem;
      background: #fff;
      z-index: 99999;
      position: relative;
      .question{
        position: absolute;
        width: 0.24rem;
        height: 0.24rem;
        background: url('../../assets/service_icon_question@3x.png') no-repeat;
        background-size:100% 100%; 
        right: 0.2rem;
        top: 0.2rem;
      }
      .top {
        min-height: 1.48rem;
        border-bottom: 1px solid #d6d7d9;
        padding: 0.5rem 0.8rem 0.4rem 0.7rem;
        box-sizing: border-box;

        .content {
          font-size: 0.26rem;
        }
      }

      .bottom {
        width: 100%;
        height: 0.88rem;
        display: flex;

        .cancel {
          width: 50%;
          text-align: center;
          line-height: 0.88rem;
          font-size: 0.34rem;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          border-right: 1px solid #d6d7d9;
        }
        .comfirm {
          width: 50%;
          text-align: center;
          line-height: 0.88rem;
          font-size: 0.34rem;
          font-weight: 500;
          color: #ed6c00;
        }
      }
    }
  }
  .tip {
    position: fixed;

    z-index: 2000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .tipBox {
      width: 5.4rem;
      height: 5.56rem;
      border-radius: 0.2rem;
      background: #fff;
      z-index: 99999;
      position: relative;
      .tipTitle{
        font-size:0.3rem;
        margin-top: 0.5rem;
        text-align: center;
        font-weight:500;
      }
      .question{
        position: absolute;
        width: 0.24rem;
        height: 0.24rem;
        background: url('../../assets/service_icon_question@3x.png') no-repeat;
        background-size:100% 100%; 
        right: 0.2rem;
        top: 0.2rem;
      }
      .top {
         font-weight:400;
        position: relative;
        text-align: center;
        padding-left: 0.76rem;
        padding-top: 0.3rem;
        padding-bottom: 2.24rem;
        box-sizing: border-box;

        .content {
          font-size: 0.26rem;
          position: relative;
          z-index: 9999
        }

        .icon{
          width: 5.4rem;
          height: 3.17rem;
         
          
          position: absolute;
          left: 0;
          bottom: 0; 
        }
      }

      .bottom {
        width: 100%;
        height: 0.88rem;
        text-align: center;
        line-height: .88rem;
        color: 0.34rem;
        color: #ED6C00;
        font-weight:400;
        
      }
    }
  }













  .homeHeader {
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
    height: 0.88rem;
    background: url("../../../static/zmimg/common/common_bg_nav@3x.png")
      no-repeat;
    background-size: 100% 100%;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.95rem;
      height: 100%;
      position: relative;
      .icon {
        width: 0.44rem;
        height: 0.44rem;
        background: url("../../assets/common_icon_news@3x.png") no-repeat;
        background-size: 100% 100%;
      }
      .num {
        background: #ff2525;
        color: #fff;
        font-size: 0.32rem;
        border-radius: 0.2rem;
        transform: scale(0.5) translateY(-50%);
        position: absolute;
        right: -0.12rem;
        padding: 0rem 0.12rem;
        top: 0.1rem;
      }
    }
    .input {
      width: 5.57rem;
      height: 0.56rem;
      // background:rgba(255,255,255,.2);
      // border-radius:.28rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 2.4rem;
        height: 0.38rem;
        background: url("../../assets/common_icon_logo@3x.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.98rem;
      .icon {
        width: 0.44rem;
        height: 0.44rem;
        background: url("../../assets/common_icon_phone@3x.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
      }
    }
  }
  .swiperBox {
    position: relative;
    height: 3rem;
  }
  .title {
    height: 1rem;
    background: #fff;
    margin-top: 0.25rem;
    display: flex;

    align-items: center;
    .icon {
      width: 0.1rem;
      height: 0.32rem;
      background: linear-gradient(
        45deg,
        rgba(237, 108, 0, 1),
        rgba(243, 152, 0, 1)
      );
      border-radius: 0.5rem;
      margin-left: 0.22rem;
    }
    .text {
      font-size: 0.3rem;
      font-weight: bold;
      margin-left: 0.14rem;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.02rem;
    .item {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      border-top: none;
      box-sizing: border-box;
      .box {
        p {
          font-size: 0.24rem;
          color: #666666;
          font-weight: 400;
          text-align: center;
          margin: 0;
          margin-top: 0.25rem;
        }
        .icon {
          width: 0.6rem;
          height: 0.6rem;
          margin: auto;
        }
        .store {
          background: url("../../assets/main/service_icon_store_search@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        .order {
          background: url("../../assets/main/service_icon_order_search@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        .qrcode {
          background: url("../../assets/main/service_icon_qr_code@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        .standard {
          background: url("../../assets/main/service_icon_standard@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        .media {
          background: url("../../assets/main/service_icon_media@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        .school {
          background: url("../../assets/main/service_icon_school@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        .woman {
          background: url("../../assets/main/service_icon_woman@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .item:nth-child(3n + 1) {
      border-left: none;
    }
    .item:nth-child(3n) {
      border-right: none;
    }
  }
}
</style>
  