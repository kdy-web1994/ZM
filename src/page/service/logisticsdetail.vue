<template>
  <div class="logisticsdetail">
    <iframe
      class="logistics_box"
      frameborder="0"
      name="logistics"
      scrolling="auto"
      :src="logisticsUrl"
    ></iframe>
  </div>
</template>
  <script>
export default {
  data(){
    return {
        logisticsUrl:""
    }
  },
  mounted(){
    this.logisticsUrl="https://m.kuaidi100.com/result.jsp?nu="+this.$route.query.num
  }
};
</script>
  <style lang="scss" scoped>
.logisticsdetail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  /* padding-top: .92rem; */
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .logistics_box {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
  