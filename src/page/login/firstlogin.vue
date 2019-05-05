<template>
  <div class="conten">
    <Header leftIcon="backWhite" titleColor="#fff" title="" bg="url(/static/zmimg/login/login_bg@2x.png) no-repeat 0 0"/>
    <div class="loginhead"></div>
    <div class="loginbody">
      <div class="logo"></div>
      <div class="loginbox">
        <div class="inputbox">
          <span class="textlab">CN</span>
          <input class="ipt name" v-model="namesid" @input="iptinput()" type="text"  placeholder="用户编号"  @blur="UserRoleQuery()">
        </div>
        <div v-if='role==2' class="inputbox">
          <input class="ipt passwords" v-model="idcard" @input="iptinput()" type="text" placeholder="身份证号码" >
        </div>
        <div v-if='role==1' class="inputbox">
          <input class="ipt passwords" v-model="names" @input="iptinput()" type="text" placeholder="姓名" >
        </div>
        <div class="inputbox">
          <input class="ipt passwords" v-model="cipher" @input="iptinput()" :type="isActive==false?'password':'text'" placeholder="设置8位数字及字母新密码" >
          <i class="eyes" :class="[{eyesopen: isActive}]" @click="openeyes()"></i>
        </div>
        <div class="btn" :class="[{btnbackground:isbtn}]" @click="firstlogin()">登陆</div>
      </div>
    </div>
    <div class="base">
      我已阅读并同意
      <span class="agreement" @click="$router.push({name:'useragreement'})">《用户协议》</span>
    </div>
    <!-- <Guide />  -->
  </div>
</template>

<script>

import md5 from "blueimp-md5";
import { Toast } from 'vant';
export default {
  data() {
    return {
      password: "",
      isActive: false,
      isbtn:false,
      namesid: '',//编号
      names: '',//姓名
      idcard: '',//身份证
      cipher: '',//密码
      role: 2, //默认是会员
    };
  },
  mounted() {
    
  },
  methods: {
      openeyes(){//密码是否可见
        this.isActive = !this.isActive;
      },
      iptinput(){//btn状态操作
        if(this.role==1){
          this.idcard='';
        }else if(this.role==2){
          this.names='';
        }
        if(this.namesid!=''&&this.cipher!=''&&(this.idcard!=''||this.names!='')){
            this.isbtn = true;
        }else{
            this.isbtn = false;
        }
      },
      
      firstlogin(){// 首次登陆
        if(this.isbtn!=false){
          if(!this.regFn())
          return
          console.log(1)
          let a=1,
          user = {
            id:'CN'+this.namesid,
            password:md5(this.cipher)
          }
          if(this.role==1)
            user.name=this.names
          if(this.role==2)
            user.idCard=this.idcard
          this.$Api.getUserPasswordUpdate(a,user).then(res=>{
            // console.log(res)
            let q=res.q
            if(q.s==0){
              Toast.success('设置密码成功')
              setTimeout(() => {
                this.$router.go(-1)
              }, 1200)
            }
          })
        }
      },
     
    regFn (roleType=this.role){// 验证
      let [personid,password]=[
        this.idcard,
        this.cipher
      ]
      if(roleType==2&&personid.length!=15&&personid.length!=18){
        Toast('身份证输入有误');
        return false
      }
      if(!(/^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{8,16}$/.test(password))){
        Toast('新密码为8-16为字母、数字组合');
        return false
      }
      return true;
    },
   
    UserRoleQuery(){ // 查询当前编号角色
      this.role=2
      let uid='CN'+this.namesid
      if(!uid || !uid.length)   // 非登录才检查
        return
      this.$Api.getUserRoleQuery(uid).then(res=>{
        console.log(res)
        let q=res.q
        if(q.s==0){
          this.role=q.role;
        }
        this.iptinput();
      })
    },
  }
};
</script>

<style lang='scss' scoped>
*{
  box-sizing: content-box;
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
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #cccccc;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cccccc;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #cccccc;
}
.conten {
  background-color: #f6f6f6;
  position: relative;
  height: 100%;
  text-align: center;
  font-size: 0.3rem;
  padding-top: 0.88rem;

  .loginhead {
    width: 100%;
    height: 2.5rem;
    background-image: url(/static/zmimg/login/login_bg@2x.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
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

      .inputbox {
        padding: 0 0.3rem;
        color: #333333;
        overflow: hidden;
        position: relative;

        .textlab {
          width: 18%;
          display: inline-block;
          height: 0.64rem;
          line-height: 0.62rem;
          border-bottom: 0.01rem solid #e5e5e5;
        }
        .ipt {
          height: 0.61rem;
        }
        .name {
          width: 70%;
          margin-left: 4%;
          padding-left: 1%;
          border-bottom: 0.01rem solid #e5e5e5;
        }
        .passwords {
          padding: 0.4rem 5% 0;
          width: 85%;
          border-bottom: 0.01rem solid #e5e5e5;
        }

        .eyes {
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
        .eyesopen {
          background-image: url(/static/zmimg/login/login_icon_eye_on@2x.png);
        }
      }
      .btn {
        height: 0.88rem;
        width: 6.1rem;
        line-height: 0.88rem;
        text-align: center;
        color: #fff;
        border-radius: 0.88rem;
        margin: 0.9rem auto 0;
        background-color: #cccccc;
      }
      .btnbackground {
        background-image: url(/static/zmimg/login/login_bg_btn@2x.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .base {
    position: absolute;
    bottom: 0.4rem;
    left: 0;
    right: 0;
    margin: auto;
    color: #999999;

    .agreement {
      color: #ed6c00;
    }
  }
}
</style>

