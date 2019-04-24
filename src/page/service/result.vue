<template>
  <div class="result">
    <div class="bg"></div>
    <div class="content">
      <resultItem :isOpen="true" phone="020-89898989" address="广东省广州市荔湾区周门北路38号"/>
      <resultItem :isOpen="false"  phone="020-89898989" address="广东省广州市荔湾区周门北路38号"/>
    </div>
  </div>
</template>
  <script>
export default {
  components: {
    resultItem: () => import("./components/resultItem")
  }
};
</script>
  <style lang="scss" scoped>
.result {
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
  .content {
    position: relative;
    z-index: 10;
    min-height: 100vh;
    padding: 0 0.3rem;
    padding-top: 0.2rem;
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
  