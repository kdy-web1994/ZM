<template>
  <div class="content">
    <div class="swiperBox">
      <swiperBox :swiperList="swList" :canJump="true"></swiperBox>
    </div>

    <News />
  </div>
</template>

<script>
export default {
  data() {
    return {
      swList:[]
    };
  },
  created(){
    this.getSwiper()
  },
  mounted() {},
  methods: {
    getSwiper() {
     this.$Api.getAdList(1).then(res=>{
        // console.log(res)
        let q=res.q
        if(q.s==0){
          q.ads = this.$base.pinImgPrefix(q.ads,'imagePath')
          this.swList=q.ads
          this.$nextTick(() => {
              this.initSwiper()

            })
        }
      })
    },
    initSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        observer: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        speed: 500,
        // autoplayDisableOnInteraction: false
      })
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  background-color: #f6f6f6;
  position: relative;
  height: 100%;
  font-size: 0.3rem;
     .swiperBox{
       position: relative;
       height: 3rem;
     }
  h3,
  p {
    margin: 0;
  }
}
</style>

