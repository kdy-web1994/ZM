<template>
    <div class="order">
      <Header leftIcon="back" titleColor="#333" title="订单查询" bg="#F6F6F6"/>
      <div class="content">
         <Item icon="orderNum" title="订单编号" :isRequire="false" placeholder="请输入" type="input" inputType="text" v-model="orderNum"/>
         <Item icon="attribute" title="订单属性" :isRequire="false" placeholder="请选择" type="select" />
         <Item icon="number" title="用户编号" :isRequire="false" placeholder="请输入" type="input" inputType="text" v-model="number"/>
         <Item icon="audit" title="审核状态" :isRequire="false" placeholder="请选择" type="select" />
         <Item icon="order" title="订单状态" :isRequire="false" placeholder="请选择" type="select" />
         <Item icon="date" title="审核日期" :isRequire="false" placeholder="请选择日期区间" type="select" />
      </div>
      <div class="btn">查询</div>
    </div>
  </template>
  <script>
  export default {
    components: {
    Item: () => import("./components/item")
  },
  data(){
    return {
      number:"",
      orderNum:""
    }
  }
  }
  </script>
  <style lang="scss" scoped>
  .order {
   width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
   padding: 0.2rem 0.3rem;
   padding-top: 1.08rem;
   box-sizing: border-box;
   .content{
     background: #fff;
     padding: 0.1rem 0.3rem 0.4rem;
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
  </style>
  