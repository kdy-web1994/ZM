<template>
    <div class="News" @click="go">
        <div class="number">12</div>
    </div>
  </template>
  <script>
  export default {
    name: 'News',
    methods:{
      go(){
        this.$router.push({
          path: '/home/message'
        })
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  .News {
    position: fixed;
    z-index: 100;
    width:0.88rem;
    height: 0.88rem;
    border-radius:50%;
    bottom: 1.23rem;
    right: 0.22rem; 
    background: url("../../../assets/home_icon_customer_service@3x.png") no-repeat;
    background-size:100% 100%;
       .number{
         position: absolute;
        //  width: 0.3rem;
        box-sizing: border-box;
         font-size: 0.32rem;
         color: #fff;
         transform: scale(0.5);
         padding: 0rem 0.14rem ;
         top: -0.13rem;
         right: -0.2rem;
         z-index: 110;
         background: #FF2525;
         border-radius:0.25rem;
       }
  }
  </style>
  