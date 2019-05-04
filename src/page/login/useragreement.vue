<template>
  <div class="conten">
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
.conten{
    background-color: #fff;
    position: relative;
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

