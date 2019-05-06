<template>
  <div class="resultItem">
    <div class="open" v-if="item.status==='1'" ></div>
    <div class="close" v-else>未营业</div>
    <div class="top item">
      <div class="content">
        <div class="left">
          <div class="icon"></div>
          <div class="addressBox">{{item.address.street}}</div>
        </div>
        <div class="right" @click="map([item.address.longitude,item.address.latitude])">一键导航</div>
      </div>
      <boxLine />
    </div>
    <div v-for='phone in item.phone' :key='phone[1]' @click="phone(phone)" class="bottom item">
      <div class="content">
        <div class="icon"></div>
        <span>{{phone}}</span>
      </div>
      <boxLine />
    </div>
    <div class="more" v-if="!More">查看全部</div>
  </div>
</template>
  <script>
export default {
  props: ["item","More"],
  methods: {
    map(arr){
      this.$emit("map",arr)
    },
    phone(phone){
      if(phone.indexOf('/')>=0)
        phone=phone.slice(0,phone.indexOf('/'))
			window.location.href=`tel:${phone}`
   
    }
  }
};
</script>
  <style lang="scss" scoped>
.resultItem {
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.1rem;
  margin-bottom: 0.4rem;
  width: 6.9rem;
  padding-bottom: 0.2rem;
  box-sizing: border-box;
  .open {
    height: 0.12rem;
    background: linear-gradient(
      45deg,
      rgba(237, 108, 0, 1),
      rgba(243, 152, 0, 1)
    );
    border-radius: 0.1rem 0.1rem 0px 0px;
  }
  .close {
    height: 0.36rem;
    background: rgba(204, 204, 204, 1);
    border-radius: 0.1rem 0.1rem 0px 0px;
    line-height: 0.36rem;
    color: #666666;
    text-indent: 0.3rem;
    font-size: 0.22rem;
  }
  .more {
    margin-top: 0.2rem;

    font-size: 0.22rem;
    color: #ed6c00;
    text-align: center;
  }
  .item {
    position: relative;
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
    .content {
      display: flex;
      align-items: center;
    }
   
  }
  .top {
    .content {
      align-items: flex-start;
      justify-content: space-between;
      .left {
        display: flex;
        .icon {
          width: 0.23rem;
          height: 0.28rem;
          background: url("../../../assets/service_icon_locate@3x.png")
            no-repeat;
          background-size: 100% 100%;
          position: relative;
          top: 0.03rem
        }
        .addressBox {
          width: 3.9rem;
          margin-left: 0.26rem;
          font-size: 0.3rem;
        }
      }
      .right {
        width: 1.15rem;
        height: 0.4rem;
        border: 1px solid rgba(237, 108, 0, 1);
        border-radius: 0.1rem;
        text-align: center;
        font-size: 0.22rem;
        line-height: 0.4rem;
        color: #ed6c00;
      }
    }
  }
  .bottom {
    .content {
      .icon {
        width: 0.28rem;
        height: 0.28rem;
        background: url("../../../assets/service_icon_phone@3x.png") no-repeat;
        background-size: 100% 100%;
      }
      span {
        font-size: 0.3rem;
        margin-left: 0.23rem;
      }
    }
  }
}
</style>
  