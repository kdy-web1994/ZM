<template>
  <div class="search">
    <div class="bg"></div>
    <div class="content">
      <div class="contentBox">
        <div class="item">
          <div class="box"></div>
          <div class="line"></div>
        </div>
        <div class="item">
          <div class="line"></div>
        </div>

        <div class="item">
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {};
</script>
  <style lang="scss" scoped>
.search {
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
  .content {
    position: relative;
    z-index: 10;
    min-height: 100vh;
    padding-top: 0.2rem;
    box-sizing: border-box;
    .contentBox {
      width: 6.9rem;
      // height: 3.66rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      margin: auto;
      padding: 0.1rem 0.3rem 0.5rem;
      box-sizing: border-box;

      .item {
        height: 1.5rem;
        display: flex;
        position: relative;

        .line {
          width: 100%;
          height: 0.04rem;
          background: rgba(238, 238, 238, 1);
          opacity: 0.4;
          border-radius: 2px;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .box {
          width: 100%;
        }
      }
    }
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
  