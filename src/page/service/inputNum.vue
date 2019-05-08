<template>
    <div class="inputNum">
      <Header leftIcon="back" titleColor="#333" title="物流单号" bg="#F6F6F6"/>
    <div class="bg">
        <div class="icon"></div>
    </div>
    <div class="content">
      <div class="contentBox">
        <Item icon="orderNum" title="物流单号" v-model="num" :isRequire="false" placeholder="请输入" type="input"/>
       
      </div>
      <div class="btn" @click="checkLog">查询</div>
    </div>
    </div>
  </template>
  <script>
  export default {
     components: {
    Item: () => import("./components/item")
  },
  data(){
    return {
      num:""
    }
  },
  methods:{
    // 查询物流单号是否合法  是否被签收过
    checkLog() {

      this.$Api.getExpressDetails(1, this.num).then(res => {
        console.log(res);
        let q = res.q;
        if (q.s == 0)
          this.$router.push({
            path: "/service/qrcode",
            query: {
              num: trackingNumber,
              isoneself: q.isOneself
            }
          });
        else {
          this.$router.push({ path: "/service/qrcodeResult", query: {
            text:q.d,
            type:2
          } });
        }
      });
    },
  }
  }
  </script>
  <style lang="scss" scoped>
  .inputNum {
   width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
   padding: 0.2rem 0.3rem;
  padding-top: 1.08rem;
  box-sizing: border-box;
  .content {
    position: relative;
    z-index: 10;
   

    .contentBox {
      width: 6.9rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      margin: auto;
      padding: 0.1rem 0.3rem 0.5rem;
      box-sizing: border-box;
    }
    
    .btn {
      width: 2.6rem;
      height: 0.7rem;
      background: linear-gradient(
        45deg,
        rgba(237, 108, 0, 1),
        rgba(243, 152, 0, 1)
      );
      border-radius: 0.35rem;
      text-align: center;
      color: #fff;
      margin: auto;
      font-size: 0.3rem;
      line-height: 0.7rem;
      margin-top: 0.35rem;
    }
  }
  .bg {
    width: 100%;
    max-width: 700px;
    height: 100vh;
   position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    .icon{
      width: 6rem;
      height: 4.18rem;
      position: absolute;
      bottom: 0.4rem;
      left: 0.8rem;
       background: url("../../../static/image/service_bg_order@3x.png") no-repeat;
       background-size:100% 100%; 
    }
  
  }
  }
  </style>
  