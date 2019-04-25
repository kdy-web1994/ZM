<template>
  <div class="service">
     <div class="swiper"></div>
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
  </div>
</template>
  <script>
export default {
  data(){
    return {
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
 
  methods:{

  }
};
</script>
  <style lang="scss" scoped>
 .service{
     min-height: 100vh;
     background: #F4F4F4;
     .swiper{
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
  