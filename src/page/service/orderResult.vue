<template>
    <div class="orderResult">
      <div class="content"></div>
      <div class="bg">
        <div class="icon"></div>
      </div>
    </div>
  </template>
  <script>
  export default {
    
  }
  </script>
  <style lang="scss" scoped>
  .orderResult {
width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
    .content{
      position: relative;
    z-index: 10;
    min-height: 100vh;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    }
   .bg {
    width: 100%;
    max-width: 700px;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    .icon{
      width: 5.9rem;
      height: 5.57rem;
      position: absolute;
      bottom: 0.7rem;
      left: 0.8rem;
       background: url("../../assets/Order.png") no-repeat;
       background-size:100% 100%; 
    }
  }
  }
  </style>
  