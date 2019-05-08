<template>
  <div class="content">
    <div class="homeHeader">
      <div class="left" @click="goMessage">
        <div class="num">12</div>
        <div class="icon"></div>
      </div>
      <div class="input">
        <div class="icon"></div>
        <input type="text" placeholder="输入关键字搜索">
      </div>
      <div class="right" @click="tel">
        <div class="icon"></div>
      </div>
    </div>
    <div class="swiperBox">
      <swiperBox :swiperList="swList" :canJump="true"></swiperBox>
    </div>
    <div class="tabBar">
      <div :class="['item',activeIndex===0?'active':'']" @click="change(0)">
        <div class="text">
          新闻
          <div class="new">99+</div>
        </div>
      </div>
      <div :class="['item',activeIndex===1?'active':'']" @click="change(1)">
        <div class="text">
          公告
          <div class="new">99+</div>
        </div>
      </div>
      <div class="line" :style="[{'left':activeIndex===1?'50%':'0'}]"></div>
    </div>

    <div class="imgBox">
      <img src="../../../static/home_img_beauty_news_2.png" alt>
      <div class="mask">2018美体内衣上海发布会</div>
      <listLine/>
    </div>

    <div class="contentBox">
      <listItem/>
    </div>

    <News/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swList: [],
      activeIndex: 0,
      pa:1,
      List:[]
    };
  },
  created() {
    this.getSwiper();
    this.loadAdList();
    this.getList()
  },
  mounted() {},
  methods: {
    goMessage() {
      this.$router.push({
        path: "/home/message"
      });
    },
    getList(){
       let table={
        pa:  this.pa,
        li: 10,
        w: {
          cid : 1,
          sk : this.searchKey
        }
      }
      
      this.source = this.$axios.CancelToken.source()
      console.log(this.source )
      this.$Api.getArticleList(1, table,this.source.token)
        .then(res => {
          // console.log(res)
          let q = res.q
          if (q.s == 0) {
            this.pa+=1
            if (this.pa>=Math.ceil(q.total/10))
              
            q.articles = this.$base.pinImgPrefix(q.articles, "imagePath");
            this.List.push(...q.articles)
          }
        }).finally(()=>{ })
    },
    loadAdList(){
      this.$Api.getAdList(2).then(res=>{
				// console.log(res)
        let q=res.q
        if(q.s==0){
          q.ads = this.$base.pinImgPrefix(q.ads,'imagePath')
					this.adList=q.ads
					this.position=q.position
        }
      })
		},
    tel() {
      window.location.href = `tel:${this.$config.user.mobile}`;
    },
    change(index) {
      this.activeIndex = index;
    },
    getSwiper() {
      this.$Api.getAdList(1).then(res => {
        // console.log(res)
        let q = res.q;
        if (q.s == 0) {
          q.ads = this.$base.pinImgPrefix(q.ads, "imagePath");
          this.swList = q.ads;
          this.$nextTick(() => {
            this.initSwiper();
          });
        }
      });
    },
    initSwiper() {
      this.swiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        observer: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        speed: 500
        // autoplayDisableOnInteraction: false
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  // background-color: #fff;
  position: relative;
  height: 100%;
  font-size: 0.3rem;
  padding-top: 0.88rem;
  padding-bottom: 1.18rem;
  .homeHeader {
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
    height: 0.88rem;
    background: url("../../../static/zmimg/common/common_bg_nav@3x.png")
      no-repeat;
    background-size: 100% 100%;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.95rem;
      height: 100%;
      position: relative;
      .icon {
        width: 0.44rem;
        height: 0.44rem;
        background: url("../../assets/common_icon_news@3x.png") no-repeat;
        background-size: 100% 100%;
      }
      .num {
        background: #ff2525;
        color: #fff;
        font-size: 0.32rem;
        border-radius: 0.3rem;
        transform: scale(0.5) translateY(-50%);
        position: absolute;
        right: -0.12rem;
        padding: 0rem 0.12rem;
        top: 0.1rem;
      }
    }
    .input {
      width: 5.57rem;
      height: 0.56rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.28rem;
      display: flex;
      align-items: center;
      .icon {
        width: 0.23rem;
        height: 0.23rem;
        background: url("../../assets/common_icon_search@3x.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 0.25rem;
        margin-right: 0.16rem;
      }
      input {
        background: transparent;
        border: none;
        outline: none;
        width: 4.97rem;
        height: 100%;
        color: #fff;
      }
      input::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #fff;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #fff;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #fff;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #fff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.98rem;
      .icon {
        width: 0.44rem;
        height: 0.44rem;
        background: url("../../assets/common_icon_phone@3x.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
      }
    }
  }
  .imgBox {
    width: 7.1rem;
    height: 3.14rem;
    margin: auto;
    margin-top: 0.3rem;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 0.3rem;
    img {
      width: 100%;
      height: 2.84rem;
    }
    .mask {
      position: absolute;
      bottom: 0.3rem;
      width: 100%;
      height: 0.56rem;
      background: rgba(0, 0, 0, 0.4);
      font-size: 0.3rem;
      color: #fff;
      line-height: 0.56rem;
      text-indent: 0.2rem;
    }
  }
  .contentBox {
    width: 7.1rem;
    margin: auto;
    position: relative;
  }
  .swiperBox {
    position: relative;
    height: 3rem;
  }
  .tabBar {
    height: 0.88rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ededed;
    background: #fff;
    display: flex;
    position: relative;
    .item {
      width: 50%;
      font-size: 0.3rem;
      color: #999999;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .text {
        .new {
          color: #fff;
          font-size: 0.36rem;
          transform: scale(0.5);
          padding: 0.01rem 0.1rem;
          background: #ff2525;
          border-radius: 0.3rem;
          text-align: center;
          position: absolute;
          top: 0.06rem;
          right: 0.95rem;
        }
      }
    }
    .active {
      color: #ed6c00;
    }
    .line {
      height: 2px;
      width: 50%;
      background: #ed6c00;
      position: absolute;
      bottom: 0;
      transition: 0.5s;
      left: 0;
    }
  }
  h3,
  p {
    margin: 0;
  }
}
</style>

