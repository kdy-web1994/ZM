<template>
  <div class="conten">
    <div class="loginhead"></div>
    <div class="loginbody">
      <div class="logo"></div>
      <div class="loginbox">
        <div class="inputbox">
            <span class="textlab">CN</span>
          <input class="ipt name" v-model="names" @input="iptinput()" type="text" placeholder="用户编号">
        </div>
        <div class="inputbox">
          <input class="ipt passwords" v-model="cipher" @input="iptinput()" :type="isActive==false?'password':'text'" placeholder="密码">
          <i class="eyes" :class="[{eyesopen: isActive}]" @click="openeyes()"></i>
        </div>
        <div class="btn" :class="[{btnbackground:isbtn}]" @click="login()">
            登陆
        </div>
        <div class="functionbtn">
            <a class="first" @click='$router.push({name:"firstlogin"})'>首次登陆</a>
            <a class="forget" @click='$router.push({name:"forgotpassword"})'>忘记密码</a>
        </div>
      </div>
    </div>
    <div class="base">我已阅读并同意 <span class="agreement" @click='$router.push({name:"useragreement"})'>《用户协议》</span></div>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
import { Toast } from 'vant';
export default {
  data() {
    return {
      password: "",
      visible: false,
      isActive: false,
      isbtn:false,
      names: '',
      cipher: '',
    };
  },
  mounted() {},
  methods: {
      openeyes(){//密码是否可见切换
        this.isActive = !this.isActive;
      },
      iptinput(){//btn按钮切换
        if(this.names!=''&&this.cipher!=''){
            this.isbtn = true;
        }else{
            this.isbtn = false;
        }
      },
      login(){//登陆
        if(this.isbtn!=false){
          let uid = 'CN'+this.names
          let password = md5(this.cipher)
          this.$Api.UserLogin(uid,password).then(res=>{
            let q=res.q
            if(q.s==0){
              this.loadUserDetails() // 更新设备用户  // 更新用户信息
            }
          }).finally((c)=>{
            
          })
        }
      },
      // 更新用户信息
    loadUserDetails(){
      this.$Api.UserDetails(0).then(res=>{
        let q=res.q
        if(q.s==0){
          this.getPowerInfo()
          this.getUpdateDeviceUser(q.user.id)
        } else {
          Toast(q.d);
        }
      })
    },
    // 更新设备用户
    getUpdateDeviceUser(userid) {
      this.$Api.UpdateDeviceUser(userid).then(res=>{ })
    },
    // 更新权限
    getPowerInfo() {
      this.$Api.getPowerInfo().then(res=>{
        if(res.q.s==0) {
          Toast.success('登录成功');
            setTimeout(() => { this.$router.go(-1) }, 200)
        }
      })
    },

  },
};
</script>

<style lang='scss' scoped>
.demo-loading {
  .van-loading {
    display: inline-block;
    margin: 5px 0 5px 20px;
  }
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
    height: 2.8rem;
    background-image: url(/static/zmimg/login/login_bg@2x.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .loginbody {
    width: 6.9rem;
    height: 4.76rem;
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
      background-image: url(/static/zmimg/login/login_logo@2x.png);
      background-size: 1.18rem 0.74rem;
      background-position: 50% 50%;
      background-repeat: no-repeat;
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
              background-image: url(/static/zmimg/login/login_icon_eye_off@2x.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
              border-radius: 0.3rem;
              position: absolute;
              right: 0.5rem;
              bottom: 0.3rem;
          }
          .eyesopen{
              background-image: url(/static/zmimg/login/login_icon_eye_on@2x.png);
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
          background-image: url(/static/zmimg/login/login_bg_btn@2x.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
      }
      .functionbtn{
          width: 6rem;
          padding-top: 0.3rem;
          margin: 0 auto;

          .first{
              float: left;
              color: #ed6c00;
          }
          .forget{
              float: right;
              color: #999999;
          }
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

