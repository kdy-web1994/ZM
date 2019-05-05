<template>
    <div class="boxLine">
       <div class="line"></div>
    </div>
  </template>
  <script>
  export default {
    name: 'boxLine'
  }
  </script>
  <style lang="scss" scoped>
  .boxLine {
    width: 100%;
  .line{
    width: 100%;
    height: 0.04rem;
    background: rgba(238, 238, 238, 1);
    opacity: 0.4;
    border-radius: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  }
  </style>
  