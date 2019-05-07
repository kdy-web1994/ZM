<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog } from 'vant'
export default {
  name: 'App',
  created(){
       this.getSession()
    this.getUserDetails()
  },
  methods:{
    // 当前h5 session获取
    getSession(){
      if(localStorage.getItem('zm_app')==1 || this.$call.inApp())   // app
        return
      if(localStorage.getItem('session'))
        return
      let deviceToken=this.$base.randomString(32)
      this.$Api.getSession(deviceToken).then((res)=>{
        console.log('我是session接口')
      })
    },
    // 当前h5 session是否已掉登
    getUserDetails(){
      if(localStorage.getItem('zm_app')==1 || this.$call.inApp())   // app
        return
      if (!localStorage.getItem('session')){
        setTimeout(()=>{
          this.getUserDetails()
        },50)
        return
      }
      this.$Api.UserDetails(0).then(res=>{
        if(res.q.s==0) {
          console.log(res)
          this.$store.commit("changeUser",res.q.user)
          this.getPowerInfo()
        }
      })
    },
    // 更新权限
    getPowerInfo() {
      if(localStorage.getItem('zm_app')==1 || this.$call.inApp())   // app
        return
      this.$Api.getPowerInfo().then(res=>{  })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  max-width: 700px;
  margin: auto;
}
body{
  margin: 0;
}
html,body,#app{
 height: 100%;
}

.van-badge{
  background-color: #fff;
  color: #333333;
}
.van-badge--select{
  background-color: #fff8f2;
  color: #ed6c00;
  border-color: #fff8f2;
}
.van-tabs__content{
  height: 100% !important;
}
.van-tab__pane{
  height: 100% !important;
}

.van-popup {
  .van-picker__toolbar {
    height:.8rem;
    line-height:.8rem;
    .van-picker__cancel, .van-picker__confirm{
      padding:0 .3rem;
    }
  }
}

.van-picker__toolbar{
  background:rgba(238,238,238,1);
  .van-picker__confirm{
    color:#333;
  }
  .van-picker__cancel{
    color:#333;
  }
  .van-picker-column__item{
    font-size:.35rem;
  }
}

.van-hairline--top-bottom{
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}



</style>
