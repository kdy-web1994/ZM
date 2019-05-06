<template>
  <div id='shopMap'>
    <iframe id="mapIframe" frameborder=0 name="mapIframe" scrolling=auto :src="shopUrl"></iframe>
    <div id='return-page' @click='$router.go(-1)'></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopUrl: ''
    }
  },
  computed:{
    pageQuery0(){
      return JSON.parse(this.$route.query[0])
    },
    pageQuery1(){
      return JSON.parse(this.$route.query[1])
    }
  },
  mounted(){
    if(!this.pageQuery0.length){
      this.shopUrl = `https://uri.amap.com/marker?position=${this.pageQuery1[0]},${this.pageQuery1[1]}&name=店铺位置&coordinate=gaode&callnative=0`
    } else if (this.$call.testType().ios && localStorage.getItem('zm_app')==1){
      this.shopUrl = `https://uri.amap.com/navigation?from=${this.pageQuery0[0]},${this.pageQuery0[1]},我的位置&to=${this.pageQuery1[0]},${this.pageQuery1[1]},店铺位置`
    } else {
      this.shopUrl = `https://uri.amap.com/navigation?from=${this.pageQuery0[0]},${this.pageQuery0[1]},我的位置&to=${this.pageQuery1[0]},${this.pageQuery1[1]},店铺位置&callnative=1`
    }
    
  },
  methods: {

  }
}
</script>

<style scoped>
#mapIframe{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  box-sizing: border-box;
  z-index:99;
}
#return-page{
  position:fixed;
  top:1.2rem;
  left:.3rem;
  z-index:100;
  width:.8rem;
  height:.8rem;
  line-height:.7rem;
  color:#fff;
  border-radius:50%;
  text-align:center;
  background:rgba(0,0,0,.2) url('../../assets/back.png') no-repeat center;
  background-size:60%;
}
</style>