<template>
  <div class="conten">
    <div class="pass">
      <div class="passbody">
        <div class="inputbox">
          <p class="introduce"><i class="icons"></i> 用户编号</p>
          <input class="ipt passwords" v-model="serialnum" @focus="iptfocus()" type="text" placeholder="请输入">
        </div>
        <div class="inputbox">
          <p class="introduce"><i class="icons"></i> 身份证号码</p>
          <input class="ipt passwords" v-model="idcard" @focus="iptfocus()" type="text" placeholder="请输入">
        </div>
        <div class="inputbox">
          <p class="introduce"><i class="icons"></i> 旧密码</p>
          <input class="ipt passwords" v-model="oldcipher" @focus="iptfocus()" type="password" placeholder="请输入">
        </div>
        <div class="inputbox">
          <p class="introduce"><i class="icons"></i> 新密码</p>
          <input class="ipt passwords" v-model="newcipher" @focus="iptfocus()" type="password" placeholder="请输入8位数字及字母">
        </div>
      </div>
      <div class="validation">
        <span class="warning"></span> 身份证错误，请重新输入
      </div>
      <div class="btn">确认修改</div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      serialnum: '',
      idcard: '',
      oldcipher: '',
      newcipher: '',
    };
  },
  mounted() {},
  methods: {
      iptfocus(){

      }
  }
};
</script>

<style lang='scss' scoped>
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
    color:    #cccccc;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    #cccccc;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    #cccccc;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:    #cccccc;
}
.conten{
    background-color: #f6f6f6;
    position: relative;
    height: 100%;
    text-align: center;
    font-size: 0.3rem;

    h3,p{
        margin: 0;
    }

    .pass{
      padding: 0.3rem;

      .passbody{
        width: 6.9rem;
        height: 6.72rem;
        background-color: #fff;
        border-radius: 0.1rem;
        margin:0 auto;

        .inputbox{
          padding: 0.35rem 0.3rem 0;
          height: 1.2rem;
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
              height: 0.61rem;
          }
          .name{
              width: 70%;
              margin-left:4%;
              padding-left: 1%;
              border-bottom: 0.01rem solid #e5e5e5;
          }
          .passwords{
              width: 100%;
              border-bottom: 0.01rem solid #e5e5e5;
          }
          
        }
      }
      .validation{
        padding-top: 0.2rem;
        text-align: left;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #666666;

        .warning{
          display: inline-block;
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 50%;
          background-color: #f18a00;
        }
      }
      .btn{
        width: 2.6rem;
        height: 0.7rem;
        line-height: 0.7rem;
        border-radius: 0.7rem;
        background-color: #ed6d00;
        color: #fff;
        margin: 0.3rem auto 0;
      }
    }
    
}

</style>

