<template>
    <div class="listLine">
      <div class="line"></div>
    </div>
  </template>
  <script>
  export default {
    name: 'listLine'
  }
  </script>
  <style lang="scss" scoped>
  .listLine {
width: 100%;
  .line{
    width: 100%;
    height: 0.04rem;
    background:rgba(204,204,204,1);
box-shadow:0px 0.04rem 0.07rem 0px rgba(82,82,82,0.17);
opacity:0.4;
border-radius:2px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
 
  }
  </style>
  