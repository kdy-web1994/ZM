<template>
  <div class="study" :style="[{'padding-bottom':index==0?' .3rem':'3.36rem'}]">
    <Header leftIcon="back" titleColor="#333" title="美丽学堂" bg="#F6F6F6"/>
    <div class="tabBar">
      <div :class="['item',index==0?'active':'']" @click="change(0)">刊物</div>
      <div :class="['item',index==1?'active':'']" @click="change(1)" style="margin-left:3.1rem;">视频</div>
      <div class="line" :style="[{'left':index==0?' 1.75rem':'5.38rem'}]"></div>
    </div>
    <div class="book" v-if="index==0">
      <div class="item">
          <div class="imgBox">
             <div class="img"></div>
          </div>
          <p>产品画册</p>
      </div>
     <div class="item">
          <div class="imgBox">
             <div class="img"></div>
          </div>
          <p>产品画册</p>
      </div>
      <div class="item">
          <div class="imgBox">
             <div class="img"></div>
          </div>
          <p>产品画册</p>
      </div>
    </div>

    <div class="video" v-else>
      <div class="item">
        <div class="imgBox"></div>
        <p>品牌宣传片</p>
      </div>

      <div class="item">
        <div class="imgBox"></div>
        <p>梦想宫</p>
      </div>
      <div class="item">
        <div class="imgBox"></div>
        <p>品质宣传片</p>
      </div>
    </div>

    <div class="app" v-if="index==1">
      <span>美的人APP</span>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      index: 0
    };
  },
  methods: {
    change(index) {
      this.index = index;
    }
  }
};
</script>
  <style lang="scss" scoped>
.study {
  background: #f6f6f6;
  padding-top: 1.08rem;

  min-height: 100vh;
  .app {
    position: fixed;
    width: 6.9rem;
    height: 2.76rem;
    bottom: 0.4rem;
    left: 0.3rem;
    background: url("../../../static/home_img_beauty_news_2.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    span {
      position: absolute;
      bottom: 0.24rem;
      left: 0.24rem;
      color: #fff;
      font-size: 0.3rem;
      font-weight: 400;
    }
  }
  .tabBar {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 1.6rem 0.24rem;
    box-sizing: border-box;

    .item {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .active {
      font-size: 0.3rem;
      font-weight: 500;
    }
    .line {
      position: absolute;
      bottom: 0;
      left: 1.72rem;
      width: 0.32rem;
      height: 0.1rem;
      background: linear-gradient(
        45deg,
        rgba(237, 108, 0, 1),
        rgba(243, 152, 0, 1)
      );
      border-radius: 0.05rem;
      transition: 0.5s;
    }
  }
  .book {
    margin-top: 0.8rem;
      padding: 0 0.7rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .item{
      width: 2.7rem;
      margin-bottom: .84rem;
      .imgBox{
        width:2.7rem;
height:3.55rem;
border-radius:.1rem;
background: #fff;
display: flex;
align-items: center;
justify-content: center;

           .img{
             width: 2.5rem;
             height: 3.35rem;
              background: url("../../../static/home_img_beauty_news_2.png") no-repeat;
    background-size: 100% 100%;
    border-radius:.1rem;
    
           }
      }
    }
    p{
        font-size: 0.22rem;
        margin: 0;
        margin-top: 0.12rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
    }
    .item:nth-child(2n + 1) {
      margin-right: 0.7rem;
    }
  }
  .video {
    margin-top: 0.5rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 3.34rem;
      margin-bottom: 0.7rem;
     
      .imgBox {
        width: 100%;
        height: 1.88rem;
        background: red;
         border-radius:.1rem; 
      }
      p {
        font-size: 0.22rem;
        margin: 0;
        margin-top: 0.12rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
    .item:nth-child(2n + 1) {
      margin-right: 0.22rem;
    }
  }
}
</style>
  