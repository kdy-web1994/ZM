<template>
  <div
    class="qrcodeResult"
    :style="[{'padding-top':this.$route.query.type==1?'1.74rem':'2.88rem'}]"
  >
    <Header titleColor="#333" :title="title" bg="#fff"/>
    <div class="content">
      <div :class="[this.$route.query.type==1?'icon':'icon1']"></div>
    </div>
    <p class="type" v-if="this.$route.query.type==1">签收完成</p>
    <p class="text">此包裹已确认签收，感谢您的参与！</p>
    <div class="btnBox" :style="[{'margin-top':this.$route.query.type==1?'1.6rem':'0.8rem'}]">
      <div class="left">回到首页</div>
      <div class="right">继续签收</div>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      title: "签收问卷"
    };
  },
  methods: {},
  created() {
    console.log(this.$route.query.type);
    if (this.$route.query.type == 2) {
      this.title = "扫描结果";
    }
  }
};
</script>
  <style lang="scss" scoped>
.qrcodeResult {
  background: #fff;

  min-height: 100vh;
  .content {
    display: flex;
    justify-content: center;
    .icon {
      width: 1.78rem;
      height: 2.14rem;
      background: url("../../assets/default page_order@3x.png") no-repeat;
      background-size: 100% 100%;
    }
    .icon1 {
      width: 5.45rem;
      height: 3.5rem;
      background: url("../../assets/default page_delivery@3x.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .type {
    margin: 0;
    margin-top: 0.4rem;
    margin-bottom: 0.1rem;
    font-weight: 500;
    font-size: 0.3rem;
    text-align: center;
  }
  .text {
    color: #999;
    font-weight: 400;
    text-align: center;
    margin: 0;
  }

  .btnBox {
    display: flex;
    .left {
      border: 1px solid rgba(237, 108, 0, 1);

      border-radius: 0.35rem;
      margin-left: 0.9rem;
      margin-right: 0.5rem;
      width: 2.6rem;
      height: 0.7rem;
      font-weight: 400;
      color: rgba(237, 108, 0, 1);
      text-align: center;
      line-height: 0.7rem;
    }
    .right {
      width: 2.6rem;
      height: 0.7rem;
      background: linear-gradient(
        45deg,
        rgba(237, 108, 0, 1),
        rgba(243, 152, 0, 1)
      );
      border-radius: 0.35rem;
      font-weight: 400;
      text-align: center;
      line-height: 0.7rem;
      color: #fff;
    }
  }
}
</style>
  