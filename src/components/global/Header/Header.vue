<template>
    <div id="Header" :style="[{'background':bg}]">
        <div class="left" @click='goBack'>
          <div :class="['icon',leftIcon]" v-if="leftIcon!==''"></div>
        </div>
        <div class="title" :style="[{'color':titleColor}]">{{title}}</div>
        <div class="right">
          <div :class="['icon',rightIcon]" v-if="rightIcon!==''"></div>
          <span v-if="rightText!==''">{{rightText}}</span>
        </div>
    </div>
  </template>
  <script>
  export default {
    name: 'Header',
    props:{
      title:{
        default:""
      },
      bg:{
        default:"#fff"
      },
      leftIcon:{
        default:''
      },
      rightIcon:{
        default:''
      },
      rightText:{
         default:''
      },
      titleColor:{
        default:''
      }
    },
    methods:{
      goBack(){
        if(this.$route.query.app==1){
				this.$call.goBack('')
			}else{
				// this.$router.go(-1)
				history.back(-1)
			}
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  #Header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 0.88rem;
    z-index: 999;
    background-size: 100% 100%;
  
   .left{
     min-width: 0.95rem;
     height: 0.88rem;
     position: absolute;
     left: 0;
     top: 0;
      display: flex;
     align-items: center;
     padding-left: 0.3rem;
     box-sizing: border-box;
     .back{
       width: 0.44rem;
       height: 0.44rem;
       background: url("../../../assets/common_icon_back@3x.png") no-repeat;
       background-size:100% 100%; 
       position: relative;
       left:-0.1rem;
     }
     .backWhite{
        width: 0.32rem;
       height: 0.32rem;
       background: url("../../../assets/back.png") no-repeat;
       background-size:100% 100%; 
       position: relative;
        left:-0.06rem;
     }
   }
   .title{
     font-size:0.36rem;
     font-weight: 500;
     line-height: 0.88rem;
     text-align: center;
   }
   .right{
     min-width: 0.95rem;
     height: 0.88rem;
     display: flex;
     align-items: center;
     justify-content: center;
      padding-right: 0.3rem;
     box-sizing: border-box;
      position: absolute;
     right: 0;
     top: 0;
     color: #ED6C00;
     .share{
       width: 0.44rem;
       height: 0.44rem;
        background: url("../../../assets/common_icon_share@3x.png") no-repeat;
       background-size:100% 100%; 
       position: relative;
       right:-0.12rem;
     }
     .shop{
         width: 0.44rem;
       height: 0.44rem;
        background: url("../../../assets/service_icon_store@3x.png") no-repeat;
       background-size:100% 100%; 
       position: relative;
       
       
     }
   }
  }
  </style>
  