<template>
  <div class="Pop" v-if="contentText">
    <div class="PopBox">
      <div class="top">
        <div class="title" v-if="title">{{title}}</div>
        <div class="content">{{contentText}}</div>
      </div>
      <div class="bottom">
        <div class="alert" v-if="type==='alert'" @click.stop="alert">{{alertText}}</div>
        <div class="cancel" v-if="type!=='alert'" :style="[{'color':cancelColor}]" @click.stop="cancel">{{cancelText}}</div>
        <div class="comfirm" v-if="type!=='alert'" @click.stop="comfirm">{{comfirmText}}</div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  name: "Pop",
  props: {
    title: {
      //弹框title
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true,
      default: "alert"
    },
    contentText: {
      type: String,
      required: true,
      default: ""
    },
    alertText: {
      type: String,
      required: false,
      default: "确定"
    },
    cancelText: {
      type: String,
      required: false,
      default: "取消"
    },
    cancelColor: {
      type: String,
      required: false,
      default: "#333333"
    },
    comfirmText: {
      type: String,
      required: false,
      default: "确认"
    }
  },
  methods:{
    alert(){
      this.$emit("alert")
    },
    cancel(){
      this.$emit("cancel")
    },
    comfirm(){
      console.log("11")
      this.$emit("comfirm")
    },
    mask(){
      console.log("mask")
    }
  }
};
</script>
  <style lang="scss" scoped>
.Pop {
 
  position: fixed;
  
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .PopBox {
    width: 5.4rem;
    border-radius: 0.2rem;
    background: #fff;
    z-index: 99999;
   position: relative;
    
    .top {
      min-height: 1.48rem;
      border-bottom: 1px solid #d6d7d9;
      padding: 0.45rem 0.35rem 0.35rem 0.35rem;
      box-sizing: border-box;
      .title {
        font-size: 0.34rem;
        font-weight: 500;
        text-align: center;
        margin-bottom: 0.2rem;
      }
      .content {
        font-size: 0.26rem;
      }
    }

    .bottom {
      width: 100%;
      height: 0.88rem;
      display: flex;
      .alert {
        font-weight: 500;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 0.88rem;
        font-size: 0.34rem;
        color: rgba(237, 108, 0, 1);
      }
      .cancel {
       width: 50%;
        text-align: center;
        line-height: 0.88rem;
        font-size: 0.34rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        border-right: 1px solid #d6d7d9;
      }
      .comfirm {
        width: 50%;
        text-align: center;
        line-height: 0.88rem;
        font-size: 0.34rem;
        font-weight: 500;
        color: #ed6c00;
      }
    }
  }
}
</style>
  