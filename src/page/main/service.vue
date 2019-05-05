<template>
  <div class="service">
    <div class="homeHeader">
        <div class="left">
          <div class="num">12</div>
          <div class="icon"></div>
        </div>
        <div class="input">
           <div class="icon"></div>
        </div>
        <div class="right">
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
             <div class="box">
                 <div :class="['icon',item.icon]"></div>
                 <p>{{item.title}}</p>
             </div>
         </div>
     </div>
     <News />
  </div>
</template>
  <script>
export default {
  data(){
    return {
         swList:[],
        itemArr:[
            {
                bg:"rgba(255,249,249,1)",
                 icon:"store",
                 title:"店铺查询"
            },
            {
                bg:"rgba(255,255,241,1)",
                 icon:"order",
                 title:"订单查询"
            },{
                bg:"rgba(241,252,255,1)",
                 icon:"qrcode",
                 title:"扫码签收"
            },
            {
                bg:"rgba(248,255,249,1)",
                 icon:"standard",
                 title:"运作规范"
            },
            {
                bg:"rgba(255,248,238,1)",
                 icon:"media",
                 title:"媒体中心"
            },
            {
                bg:"rgba(241,242,255,1)",
                 icon:"school",
                 title:"美丽学堂"
            },
            {
                bg:"rgba(255,238,238,1)",
                 icon:"woman",
                 title:"美的人"
            }
        ]   
    } 
  },
  created(){
    this.getSwiper()
  },
  mounted() {},
  methods: {
    getSwiper() {
     this.$Api.getAdList(1).then(res=>{
        // console.log(res)
        let q=res.q
        if(q.s==0){
          q.ads = this.$base.pinImgPrefix(q.ads,'imagePath')
          this.swList=q.ads
          this.$nextTick(() => {
              this.initSwiper()

            })
        }
      })
    },
    initSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        observer: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        speed: 500,
        // autoplayDisableOnInteraction: false
      })
    }
  }
};
</script>
  <style lang="scss" scoped>
 .service{
     min-height: 100vh;
     background: #F4F4F4;
     padding-top: .88rem;
     .homeHeader{
        display: flex;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 999;
        height: 0.88rem;
        background: url('../../../static/zmimg/common/common_bg_nav@3x.png') no-repeat;
        background-size:100% 100%; 
        align-items: center;
        .left{
          display: flex;
          align-items: center;
          justify-content: center;
          width: .95rem;
          height: 100%;
          position: relative;
             .icon{
              width: .44rem;
              height: .44rem;
              background: url("../../assets/common_icon_news@3x.png") no-repeat;
              background-size:100% 100%; 
              
             }
             .num{
               background: #FF2525;
               color: #fff;
               font-size: 0.32rem;
               border-radius:.2rem;
               transform: scale(.5) translateY(-50%);
               position: absolute;
               right: -0.12rem;
               padding:0rem 0.12rem; 
               top: 0.1rem;
             }
        }
        .input{
          width: 5.57rem;
          height: 0.56rem;
          // background:rgba(255,255,255,.2);
          // border-radius:.28rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon{
              width: 2.4rem;
              height: .38rem;
              background: url("../../assets/common_icon_logo@3x.png") no-repeat;
              background-size:100% 100%; 
            
          }
        
         
        }
        .right{
           display: flex;
          align-items: center;
          justify-content: center;
          width: .98rem;
           .icon{
              width: .44rem;
              height: .44rem;
              background: url("../../assets/common_icon_phone@3x.png") no-repeat;
              background-size:100% 100%; 
               position: relative;
             }
        }
     }
     .swiperBox{
       position: relative;
       height: 3rem;
     }
     .title{
         height: 1rem;
         background: #fff;
         margin-top: 0.25rem;
         display: flex;
         
         align-items: center;
         .icon{
             width:0.1rem;
height:0.32rem;
background:linear-gradient(45deg,rgba(237,108,0,1),rgba(243,152,0,1));
border-radius:0.5rem;
margin-left: 0.22rem
         }
         .text{
             font-size: 0.3rem;
             font-weight:bold;
             margin-left: 0.14rem;
         }
     }
     .content{
         display: flex;
         flex-wrap: wrap;
         margin-top: 0.02rem;
            .item{
                width: 2.5rem;
                height: 2.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-right: 1px solid #EEE;
                border-bottom: 1px solid #EEE;
                border-top:none; 
                box-sizing: border-box;
                .box{
                    p{
                        font-size: 0.24rem;
                        color: #666666;
                        font-weight:400;
                        text-align: center;
                        margin: 0;
                        margin-top: 0.25rem;
                    }
                    .icon{
                        width: 0.6rem;
                        height: 0.6rem;
                        margin: auto;
                    }
                    .store{
                        background: url("../../assets/main/service_icon_store_search@3x.png") no-repeat;
                        background-size:100% 100%; 
                    }
                    .order{
                         background: url("../../assets/main/service_icon_order_search@3x.png") no-repeat;
                        background-size:100% 100%; 
                    }
                    .qrcode{
                        background: url('../../assets/main/service_icon_qr_code@3x.png') no-repeat;
                        background-size:100% 100%; 
                    }
                     .standard{
                        background: url('../../assets/main/service_icon_standard@3x.png') no-repeat;
                        background-size:100% 100%; 
                    }
                     .media{
                        background: url('../../assets/main/service_icon_media@3x.png') no-repeat;
                        background-size:100% 100%; 
                    }
                     .school{
                        background: url('../../assets/main/service_icon_school@3x.png') no-repeat;
                        background-size:100% 100%; 
                    }
                    .woman{
                        background: url('../../assets/main/service_icon_woman@3x.png') no-repeat;
                        background-size:100% 100%; 
                    }
                }

            }
            .item:nth-child(3n+1){
                border-left:none 
            }
            .item:nth-child(3n){
                border-right:none 
            }

     }
 }
</style>
  