<template>
  <div class="conten">
     <Header leftIcon="backWhite" titleColor="#fff" title="用户协议" bg="linear-gradient(135deg,rgba(243,152,0,1) 0%,rgba(237,109,0,1) 100%)"/>
    <div class="check-info2">
			<div v-html="article.content"></div>
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article:{}
    };
  },
  mounted() {
    this.loadAgreeMent();
  },
  methods: {
      loadAgreeMent(){
        this.$Api.getArticleDetails(2).then(res=>{
          console.log(res)
          let q=res.q
          if(q.s==0){
            q.article.imagePath=this.$base.pinImgPrefix(q.article.imagePath)
            this.article = q.article
          }
        })
      }
  }
};
</script>

<style lang='scss' scoped>
*{
  box-sizing: content-box;
}
.conten{
    background-color: #fff;
    position: relative;
    padding-top: 0.88rem;
    box-sizing: border-box;
    height: 100%;
    text-align: center;
    font-size: 0.3rem;

    h3,p{
        margin: 0;
    }
    .check-info2{
      padding: 0 0.2rem;
    }
}
</style>

