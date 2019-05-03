<template lang="html">
  <div class="banner">
      <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in swiperList" :key="item.imagePath"  @click="jump(item.actionType,item.id)">
        	<img :src="item.imagePath"/>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    swiperList: {
       type: Array,
    },
    canJump: {
      type: Boolean,
      default:false
    },
  },
  data(){
    return {
    }
  },
  created(){},
  mounted() {},
  methods: {
      jump(type,id) {
        if(this.canJump) {//轮播图跳转
            if(type==1){
              return;
            }
           if(type==2){
             this.$router.push({  //2 商品详情
              name:"ShoppingMallDetails",
              query:{
                spuId:id
              }

             })
           }

           if(type==3){
             this.$router.push({ //3 攻略详情
              name:"StrategyDetail",
              query:{
                id:id
              }

             })
           }
           if(type==4){
             this.$router.push({ //4 游记详情
              name:"TravelDetails",
              query:{
                id:id
              }

             })
           }
        }
      }
  }
}
</script>

<style lang="css">
.banner{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}
 .banner .swiper-container {
    width: 100%;
    height: 100%;
    background-color: #d2d2d2;
  }
   .banner .swiper-container .swiper-slide {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
   .banner .swiper-container .swiper-slide img{
   	width: 100%;
   	height: 100%;
   }
  .banner .swiper-container .swiper-pagination-bullets {
    /* bottom: .8rem; */
  }

  .banner .swiper-container .swiper-pagination-bullets .swiper-pagination-bullet {
    width: 0.6rem;
    height: .05rem;
    border-radius: 0;
    background: rgba(255,255,255,0.4);
    opacity: 1;
  }

  .banner .swiper-container .swiper-pagination-bullets .swiper-pagination-bullet-active {
    width: .6rem;
    height: .05rem;
    border-radius: 0;
    background: #FADC56;
  }

  .banner .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0;

  }
</style>
