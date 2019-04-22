<template>
  <div class="Pop">
    <div class="PopBox">
      <div class="top">
        <div class="title" v-if="title">{{title}}</div>
        <div class="content">{{contentText}}</div>
      </div>
      <div class="bottom">
        <div class="alert" v-if="type==='alert'" @click="alert">{{alertText}}</div>
        <div class="cancel" v-if="type!=='alert'" :style="[{'color':cancelColor}]" @click="cancel">{{cancelText}}</div>
        <div class="comfirm" v-if="type!=='alert'" @click="comfirm">{{comfirmText}}</div>
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
      this.$emit("comfirm")
    }
  }
};
</script>
  <style lang="scss" scoped>
.Pop {
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .PopBox {
    width: 5.4rem;
    border-radius: 0.2rem;
    background: #fff;

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
        flex: 1;
        text-align: center;
        line-height: 0.88rem;
        font-size: 0.34rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        border-right: 1px solid #d6d7d9;
      }
      .comfirm {
        flex: 1;
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
  