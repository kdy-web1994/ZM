<template>
  <div class="qrcodeResult">
    <div class="success" v-if="type==='1'">
      <div class="icon"></div>
      <p class="text1">签收完成</p>
      <p class="text2">感谢您的反馈，我们会尽快为您跟进。</p>
    </div>
    <div class="fail" v-if="type==='2'">
          <div class="icon"></div>
          <p>本活动仅限订单所属人参与哦~</p>
          <p>此包裹已在2018-06-22完成扫码签收啦~</p>
          <p>暂无此快递单号信息哦~</p>
    </div>

    <div class="btnBox">
      <div class="box">
        <div class="left">回到首页</div>
      <div class="right">继续签收</div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  date() {
    return {
      type: ""
    };
  },
  created() {
    this.type = this.$route.query.type;
  }
};
</script>
  <style lang="scss" scoped>
.qrcodeResult {
  min-height: 100vh;
 
 
  .fail{
     margin-bottom: 0.8rem;
     padding-top:2.4rem; 
      
    .icon{
      width: 5.45rem;
      height: 3.5rem;
      background: url("../../assets/default page_delivery@3x.png") no-repeat;
      background-size: 100% 100%;
      margin: auto;
    }
    p{
      margin: 0;
      margin-top: 0.2rem;
      color: #999999;
      font-size: 0.26rem;
      text-align: center;
    }
  }

  .success {
     margin-bottom: 1.6rem;
      padding-top: 0.8rem;
      box-sizing: border-box;
    .icon {
      width: 1.78rem;
      height: 2.41rem;
      background: url("../../assets/default page_order@3x.png") no-repeat;
      background-size: 100% 100%;
      margin: auto;
    }
    p{
      text-align: center;
      margin: 0
    }
    .text1{
      font-size: 0.3rem;
      margin-top: 0.4rem;
      margin-bottom: 0.2rem
      
    }
    .text2{
      font-size: 0.26rem;
      color: #999999;
    }
  }
  .btnBox {
    display: flex;
    align-items: center;
    justify-content: center;
   
    .box{
      display: flex;
      align-items: center;
.left {
      width: 2.6rem;
      height: 0.7rem;
      border: 1px solid rgba(237, 108, 0, 1);
     
      border-radius: 0.35rem;
      color: #ED6C00;
      text-align: center;
      line-height: 0.7rem;
      font-size: 0.3rem;
      margin-right: 0.7rem;
    }
    .right {
       width: 2.6rem;
height:0.7rem;
background:linear-gradient(45deg,rgba(237,108,0,1),rgba(243,152,0,1));
border-radius: 0.35rem;
color: #fff;
      text-align: center;
      line-height: 0.7rem;
      font-size: 0.3rem;
    }
    }
  }
}
</style>
  