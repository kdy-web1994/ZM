<template>
    <div class="new">
      <div>
             ji
      </div>
      <!-- <Footer /> -->
      <!-- <Pop  
      title="温馨提示" 
      type="comfirm" 
      contentText="亲爱的家人，您好！本次查询结果仅作为借力使用，不作为店铺审核依据，谢谢！"
      comfirmText="登录"
      @comfirm="comfirm"
      cancelText="忘记密码"
      v-if="show"
      /> -->

      <Success /> 
    </div>
  </template>
  <script>
  export default {
    
     created(){
       this.show=true
      //  console.log(1)
        // this.$alert("亲爱的家人，您好！本次查询结果仅作为借力使用，不作为店铺审核依据，谢谢！","登录") 
     },
     data(){
       return {
         show:false
       }
     },
     methods:{
       comfirm(){
         console.log(1)
       }
     }
  }
  </script>
  <style lang="scss" scoped>
  .new {
       height: 100px;
  }
  </style>
  