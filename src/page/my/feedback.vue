<template>
  <div class="conten">
    <Header leftIcon="back" titleColor="#333" title="意见反馈" bg="#F6F6F6"/>
    <div class="feedbackbox">
      <textarea class="tex" name=""  placeholder="您对中脉有什么意见和建议吗？告诉我们，帮中脉做得更好，每一条内容我们都会真诚对待。"></textarea>
      <div class="inputbox">
        <p class="introduce"><i class="icons"></i> 联系人</p>
        <input class="ipt passwords" v-model="contact" type="text" placeholder="请输入">
      </div>
    </div>
    <div class="btn" @click="submit()">提交</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: '',
    };
  },
  mounted() {},
  methods: {
      submit(){
        console.log('提交')
      }
  }
};
</script>

<style lang='scss' scoped>
textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ccc;
}
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ccc;
}
textarea::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ccc;
 
}
input {
  outline: none;
  background: transparent;
  border: none;
  outline: medium;
  font-size: 0.3rem;
}
*:focus {
  outline: none;
  background-color: transparent;
}
::selection {
  background: transparent;
}
::-moz-selection {
  background: transparent;
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:#cccccc;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:#cccccc;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:#cccccc;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:#cccccc;
}

.conten{
    background-color: #f6f6f6;
    background-image: url(/static/zmimg/my/my_bg_advice@2x.png);
    background-size: 3.65rem 4.85rem;
    background-repeat: no-repeat;
    background-position: 50% 90%;
    position: relative;
    height: 100%;
    text-align: center;
    font-size: 0.3rem;
    padding-top: 0.88rem;
    h3,p{
        margin: 0;
    }

    .feedbackbox{
      padding: 0.4rem 0.2rem 0.5rem;
      width: 94%;
      height: 6.18rem;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 0.1rem;

      .tex{
        width: 100%;
        height: 3.42rem;
        border: 0;
        resize:none;
        font-size: 0.3rem;
        border-bottom: 0.04rem solid #f8f8f8;
      }
     
      textarea:focus {
        outline: none;
    }
    .inputbox{
      padding-top: 0.2rem;
      height: 1.3rem;
      color: #333333;
      overflow: hidden;
      position: relative;
      

      .introduce{
        text-align: left;
        padding-left: 0.4rem;
        height: 0.5rem;
        line-height: 0.5rem;
        position: relative;

        .icons{
          display: inline-block;
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 50%;
          background-color: #ffecdb;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }

      .textlab{
          width: 18%;
          display: inline-block;
          height: 0.64rem;
          line-height: 0.62rem;
          border-bottom: 0.01rem solid #e5e5e5;
        }
      .ipt{
        padding-bottom: 0.1rem;
        height: 0.61rem;
      }
      .passwords{
          width: 100%;
          border-bottom: 0.04rem solid #f8f8f8;
      }
      
    }
  }
  .btn{
    width: 2.6rem;
    height: 0.7rem;
    line-height: 0.7rem;
    background-color: rgba($color: #ed6f00, $alpha: 0.9);
    color: #fff;
    border-radius: 0.35rem;
    margin: 0.8rem auto 0;
  }
}

</style>

