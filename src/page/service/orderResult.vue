<template>
    <div class="orderResult">
      <div class="content"></div>
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
    background: url("../../../static/image/serviceBg.png") no-repeat;
    background-size: 100% auto;
    background-position: bottom;
  }
  }
  </style>
  