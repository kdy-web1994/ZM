<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  max-width: 700px;
  margin: auto;
}
body{
  margin: 0;
}
html,body,#app{
 height: 100%;
}
.van-hairline--top-bottom::after {
    border-width: 0 0;
}
.van-badge{
  background-color: #fff;
  color: #333333;
}
.van-badge--select{
  background-color: #fff8f2;
  color: #ed6c00;
  border-color: #fff8f2;
}
.van-tabs__content{
  height: 100% !important;
}
.van-tab__pane{
  height: 100% !important;
}

</style>
