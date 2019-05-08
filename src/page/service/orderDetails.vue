<template>
    <div class="orderDetails">
      <Header leftIcon="back" titleColor="#333" title="订单及发货详情" bg="#F6F6F6"/>
       <div class="tabBar">
      <div :class="['item',index==0?'active':'']" @click="change(0)">订单明细</div>
      <div :class="['item',index==1?'active':'']" @click="change(1)" style="margin-left:1.54rem;">已发货</div>
      <div :class="['item',index==2?'active':'']" @click="change(2)" style="margin-left:1.54rem;">未发货</div>
      <div class="line" :style="[{'left':index==0?' 1.22rem':index==1?'3.68rem':'6rem'}]"></div>
    </div>
       <div v-if="index==0">
         <orderItem :arr="arr"/>
       </div>
       <div v-if="index==1">

       </div>
      <div v-if="index==2">
         <orderItem :arr="arr"/>
       </div>
    </div>
  </template>
  <script>
  export default {
     components:{
       orderItem:()=>import('./components/orderItem')
     },
     data(){
       return {
         arr:[
           {name:"商品名称最多二十个字商品名称最多二十个字",yardage:"默认",totalNumber:10000},
           {name:"商品名称最多二十个字商品名称最多二十个字",yardage:"默认",totalNumber:10000},
           {name:"商品名称最多二十个字商品名称最多二十个字",yardage:"默认",totalNumber:10000},
           {name:"商品名称最多二十个字商品名称最多二十个字",yardage:"默认",totalNumber:10000}
         ],
         index:0
       }
     },
     methods:{
       change(num){
         this.index=num
       }
     }
  }
  </script>
  <style lang="scss" scoped>
  .orderDetails {
   width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
  padding-top: 1.08rem;
  box-sizing: border-box;
  .tabBar {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 .81rem .24rem;
    box-sizing: border-box;

    .item {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .active {
      font-size: 0.3rem;
      font-weight: 500;
    }
    .line {
      position: absolute;
      bottom: 0;
      left: 1.72rem;
      width: 0.32rem;
      height: 0.1rem;
      background: linear-gradient(
        45deg,
        rgba(237, 108, 0, 1),
        rgba(243, 152, 0, 1)
      );
      border-radius: 0.05rem;
      transition: 0.5s;
    }
  }
  }
  </style>
  