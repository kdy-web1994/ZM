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

.banner .titleBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,0.3);
  z-index: 20;
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
    z-index: 999;
     bottom: .1rem; 
  }
 .swiper-pagination{
   text-align: right;
   padding-right: 0.2rem;
   box-sizing: border-box;
 }
  .banner .swiper-container .swiper-pagination-bullets .swiper-pagination-bullet {
   width:0.08rem;
height:0.08rem;
background:rgba(237,108,0,1);
opacity:0.5;
border-radius:50%;
 margin: 0;
margin-right: 0.1rem;
  }
.banner .swiper-container .swiper-pagination-bullets .swiper-pagination-bullet:last-child{
   margin: 0;
}
  .banner .swiper-container .swiper-pagination-bullets .swiper-pagination-bullet-active {
    width:0.1rem;
height:0.1rem;
opacity:1;
background:rgba(237,108,0,1);
border-radius:50%;
  }

  .banner .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
   

  }
</style>
