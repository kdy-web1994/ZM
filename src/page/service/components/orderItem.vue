<template>
    <div class="orderItem" >
        <div class="total">合计数量：{{arr.length}}</div>
        <div class="top">
              <div style="display: flex;">
                  <div class="item">商品名称</div>
               <div class="item">码数</div>
                <div class="item">订购数量</div>
              </div>
        </div>
        <div class="bottom">
            <div class="box"  v-for="(item,index) in arr" :key="index">
            <div class="item">
                 <div class="li">
                     <div class="text">{{item.name}}</div>
                 </div>
                 <div class="li">
                     <div class="text">{{item.yardage}}</div>
                 </div>
                 <div class="li">
                     <div class="text">{{item.totalNumber}}</div>
                 </div>
                
            </div>
            <div class="point"></div>
             <boxLine/>
            </div>
        </div>
    </div>
  </template>
  <script>
  export default {
    props:["arr"],
    name: 'orderItem',
    methods:{
      
    }
  }
  </script>
  <style lang="scss" scoped>
  .orderItem {
      .total{
          line-height: .6rem;
          text-indent: .3rem;
          font-size: .26rem;
          margin-top: .2rem;
      }
    .top{
        height: .6rem;
        background:rgba(238,238,238,1);
        padding:  0 .3rem;
        box-sizing: border-box;
        
        .item{
            flex:1;
            text-align: center;
            line-height: .6rem;
            font-size:.26rem;
        }
    }
    .bottom{
        padding:  0 .3rem;
        .box{
            position: relative;
            .point{
                width:.1rem;
height:.1rem;
background:linear-gradient(45deg,rgba(237,108,0,1),rgba(243,152,0,1));
border-radius:50%;
top: 50%;
margin-bottom: -0.05rem;
position: absolute;
left: -.1rem;
            }
        }
       .item{
            display: flex;
            height: 1.6rem;
            
            .li{
                flex: 1;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .26rem;
                .text{
                
                }
                
            }
            .li:first-child{
                text-align: left;
                 .text{
                     margin-left: .14rem;
                 }
            }
       }

    }
  }
  </style>
  