<template>
  <div class="qrcode">
    <div class="content">
      <div :class="['top',isFull===2?'showTop':'hideTop']">
        <p>1. 请问您所收到的包裹，外包装是否完好无损？</p>
        <div class="radioBox">
          <div class="item" @click="change(1)">
            <div class="icon">
            <div class="isSelect" v-show="isFull===1"></div>
            </div>
            <span>是</span>
          </div>
          <div class="item" @click="change(2)">
            <div class="icon">
              <div class="isSelect" v-show="isFull===2"></div>
            </div>
            <span>否</span>
          </div>
        </div>
           <p style="margin-top:0.5rem">为保障您的权益，请您将包裹破损处的外包装蛇皮袋 、纸箱拍照上传，如有产品破损，请将破损的产品图一并上传，感谢您的配合！</p>
         <div class="imgBox">
           <div class="item">
             <div class="del"></div>
           </div>
            <div class="item add">
              <div class="icon"></div>
            </div>
         </div>
      </div>
      <div :class="['bottom',isEnough===2?'showBottom':'hideBottom']" v-show="isFull!==0">
        <p>2. 请问您实收款式及数量是否与出库单实发款式数量一致？</p>
        <div class="radioBox">
          <div class="item" @click="changeBottom(1)">
            <div class="icon">
            <div class="isSelect" v-show="isEnough===1"></div>
            </div>
            <span>是</span>
          </div>
          <div class="item" @click="changeBottom(2)">
            <div class="icon">
              <div class="isSelect" v-show="isEnough===2"></div>
            </div>
            <span>否</span>
          </div>
        </div>
         <div class="textarea">
           <div class="title">备注<div class="isRequire"></div>
        </div>
           <textarea  placeholder="请输入"/>
            <div class="line"></div>
         </div>
      </div>
       <div class="msg" v-show="isEnough===2">
          <Item icon="person" title="联系人" :isRequire="true" placeholder="请输入" type="input" inputType="text" v-model="name"/>
        <Item icon="phone" title="联系电话" :isRequire="true" placeholder="请输入" type="input" inputType="tel" v-model="phone"/>

       </div>
       <div :class="['btn',isEnough===0?'disable':'']">确认</div>
    </div>
    <div class="bg">
        <div class="icon"></div>
    </div>
  </div>
</template>
  <script>
export default {
  components: {
    Item: () => import("./components/item")
  },
  data() {
    return {
      isFull: 0,
      isEnough: 0,
      name:"",
      phone:""
    };
  },

  methods: {
    change(num){
     this.isFull=num
    },
    changeBottom(num){
      this.isEnough=num
    }
  }
};
</script>
  <style lang="scss" scoped>
.qrcode {
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
    p {
      font-size: 0.26rem;
      margin: 0;
    }

    .radioBox {
      margin-top: 0.4rem;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 0.3rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.2rem;
          background: rgba(238, 238, 238, 1);
          border-radius: 50%;
         display: flex;
         align-items: center;
         justify-content: center;

          .isSelect {
            width: 0.14rem;
            height: 0.14rem;
            background: linear-gradient(
              45deg,
              rgba(237, 108, 0, 1),
              rgba(243, 152, 0, 1)
            );
            border-radius: 50%;
           
          }
        }
        span {
          font-size: 0.26rem;
          color: #666;
        }
      }
      .item:last-child {
        margin: 0;
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
      margin-top: 0.8rem;
    }
    .disable{
      background: #CCCCCC;
    }
    .msg{
       transition: 0.5s;
       padding: 0.1rem 0.3rem 0.5rem;
        background: rgba(255, 255, 255, 1);
         border-radius: 0.1rem;
         margin-top: 0.3rem;
    }
    .top {
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      transition: 0.5s;
      overflow: hidden;
      padding: 0.5rem 0.3rem;
      box-sizing: border-box;
      .imgBox{
        display: flex;
        margin-top: 0.55rem;
        align-items: center;
        .item{
          margin-right: 0.18rem;
          width:1.44rem;
height:1.44rem;
border-radius:0.1rem;
position: relative;
.del{
  position: absolute;
  right: -0.07rem;
  top: -0.15rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius:50%; 
  background: url('../../assets/service_btn_close@3x.png') no-repeat;
  background-size:100% 100%; 
}
        }
        .item:last-child{
          margin-right: 0;
        }
        .add{
             border:2px dashed rgba(238,238,238,1);
             position: relative;
             .icon{
               width: 0.66rem;
               height: 0.66rem;
               position: absolute;
               top: 0;
               left: 0;
               right: 0;
               bottom: 0;
               margin: auto;
               background: url('../../assets/add.png') no-repeat;
               background-size:100% 100%; 
             }
        }
      }
    }
    .showTop {
      height: 6.11rem;
    }
    .hideTop {
      height: 2.58rem;
    }

    .bottom {
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      transition: 0.5s;
      overflow: hidden;
      margin-top: 0.3rem;
      padding: 0.5rem 0.3rem;
      box-sizing: border-box;
      .textarea{
        position: relative;
        height: 1.8rem;
        margin-top: 0.5rem;
        
        display: flex;
        flex-wrap: wrap;
        .title {  
        position: relative;
        font-size: 0.26rem;
        
        .isRequire {
          
          position: absolute;
          right: -0.2rem;
          top: 0;
          width: 0.1rem;
          height: 0.1rem;
          background: linear-gradient(
            45deg,
            rgba(237, 108, 0, 1),
            rgba(243, 152, 0, 1)
          );
          border-radius: 50%;
        }
      }
        textarea{
          border: none;
          outline: none;
          height: 1.2rem;
          width: 100%;
          font-size: 0.26rem;
          margin-top: 0.1rem;
          padding: 0.1rem 0;
          box-sizing: border-box;
        }
        textarea::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #cccccc;
      }
      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #cccccc;
      }
      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #cccccc;
      }
      textarea:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #cccccc;
      }
        .line{
          width: 100%;
    height: 0.04rem;
    background: rgba(238, 238, 238, 1);
    opacity: 0.4;
    border-radius: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
        }
      }
    }

    .showBottom {
      height: 5.3rem;
    }
    .hideBottom {
      height: 2.95rem;
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
    .icon{
      width: 6rem;
      height: 4.18rem;
      position: absolute;
      bottom: 0.4rem;
      left: 0.8rem;
       background: url("../../../static/image/service_bg_order@3x.png") no-repeat;
       background-size:100% 100%; 
    }
  
  }
}
</style>
  