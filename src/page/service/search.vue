<template>
  <div class="search">
    <div class="bg"></div>
    <div class="content">
      <div class="contentBox">
        <Item icon="region" title="所在地区" :isRequire="true" placeholder="请选择省/市/区/镇" type="select"/>
        <Item icon="address" title="详细地址" :isRequire="false" placeholder="请选择" type="select"/>
        <Item icon="shop" title="店铺状态" :isRequire="false" placeholder="请选择" type="select"/>
      </div>
      <div class="warning">
        <div class="icon"></div>
        <span>该区域共有 3 家店铺暂未营运</span>
      </div>
      <div class="contentBox" style="margin-top:0.3rem;">
        <Item icon="person" title="馆主姓名" :isRequire="false" placeholder="请输入" type="input" inputType="text" v-model="name"/>
        <Item icon="phone" title="馆主电话" :isRequire="false" placeholder="请输入" type="input" inputType="tel" v-model="phone"/>
        <Item icon="shop" title="店铺编号" :isRequire="false" placeholder="请输入" type="input" inputType="text" v-model="number"/>
         <Item icon="phone" title="店铺电话" :isRequire="false" placeholder="请输入" type="input" inputType="tel" v-model="tel"/>
          
      </div>
      <div class="btn">查询</div>
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
          name:"",
          phone:"",
          tel:"",
          number:""
    }
  },
  watch:{
     'tel'(a,b){
       console.log(a)
     }
  },
  methods:{

  }
};
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
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;

    .contentBox {
      width: 6.9rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      margin: auto;
      padding: 0.1rem 0.3rem 0.5rem;
      box-sizing: border-box;
    }
    .warning {
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      .icon {
        width: 0.24rem;
        height: 0.24rem;
        background: url("../../assets/service_icon_attention@3x.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 0.1rem;
      }
      span {
        font-size: 0.26rem;
        color: #666666;
      }
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
  