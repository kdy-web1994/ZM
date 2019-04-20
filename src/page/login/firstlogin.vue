<template>
  <div class="conten">
    <div class="loginhead"></div>
    <div class="loginbody">
      <div class="logo">logo</div>
      <div class="loginbox">
        <div class="inputbox">
            <span class="textlab">CN</span>
          <input class="ipt name" v-model="name" @focus="iptfocus()" type="text" placeholder="用户编号">
        </div>
        <div class="inputbox">
          <input class="ipt passwords" v-model="idcard" @focus="iptfocus()" type="text" placeholder="身份证号码">
        </div>
        <div class="inputbox">
          <input class="ipt passwords" v-model="cipher" @focus="iptfocus()" :type="isActive==false?'password':'text'" placeholder="设置8位数字及字母新密码">
          <i class="eyes" :class="[{eyesopen: isActive}]" @click="openeyes()"></i>
        </div>
        <div class="btn" :class="[{btnbackground:isbtn}]">
            登陆
        </div>
        
      </div>
    </div>
    <div class="base">我已阅读并同意 <span class="agreement" @click='$router.push({name:"useragreement"})'>《用户协议》</span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      visible: false,
      isActive: false,
      isbtn:false,
      name: '',
      idcard: '',
      cipher: '',
    };
  },
  mounted() {},
  methods: {
      openeyes(){
          this.isActive = !this.isActive;
      },
      iptfocus(){
          if(this.name!=''&&this.cipher!=''&&this.idcard!=''){
              this.isbtn = true;
          }else{
              this.isbtn = false;
          }
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
.conten {
  background-color: #f6f6f6;
  position: relative;
  height: 100%;
  text-align: center;
  font-size: 0.3rem;

  .loginhead {
    width: 7.5rem;
    height: 2.8rem;
    background: linear-gradient(to right, #f4aa31, #f19a2f, #f08a31);
  }
  .loginbody {
    width: 6.9rem;
    height: 5.31rem;
    background-color: #fff;
    padding-top: 1.51rem;
    border-radius: 0.2rem;
    margin: 0 auto;
    margin-top: -1.51rem;
    position: relative;

    .logo {
      width: 1.8rem;
      height: 1.8rem;
      line-height: 1.8rem;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: #fcf4ed 0 0.03rem 0.02rem 0.03rem;
      position: absolute;
      top: -0.9rem;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .loginbox {
      width: 6.9rem;
      height: 4.76rem;
      position: relative;

      .inputbox{
          padding: 0 0.3rem;
          color: #333333;
          overflow: hidden;
          position: relative;

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
              padding: 0.4rem 5% 0;
              width: 85%;
              border-bottom: 0.01rem solid #e5e5e5;
          }

          .eyes{
              display: block;
              width: 0.37rem;
              height: 0.22rem;
              background-color: #cccccc;
              border-radius: 0.3rem;
              position: absolute;
              right: 0.5rem;
              bottom: 0.3rem;
          }
          .eyesopen{
              background-color: #999999;
          }
      }
      .btn{
          height: 0.88rem;
          width: 6.1rem;
          line-height: 0.88rem;
          text-align: center;
          color: #fff;
          border-radius: 0.88rem;
          margin: 0.9rem auto 0;
          background-color: #cccccc;
      }
      .btnbackground{
          background: linear-gradient(to right bottom, #f18a00, #f39700, #ee7000);
      }
      
    }
  }
  .base{
      position: absolute;
      bottom: 0.4rem;
      left: 0;
      right: 0;
      margin: auto;
      color: #999999;
      
      .agreement{
          color: #ed6c00;
      }
  }
}
</style>

