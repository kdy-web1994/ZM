<template>
  <div class="conten">
     <Header leftIcon="back" titleColor="#333" title="关于我们"/>
     
    <div class="check-info2" v-html="article.content"></div>
      
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
    this.loadAbout();
  },
  methods: {
      loadAbout(){
      this.$Api.getArticleDetails(1).then(res=>{
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

<style lang='scss'>
.conten{
    background-color: #fff;
    width: 100%;
    height: 100%;
    font-size: 0.3rem;
    padding-top: 0.88rem;
    box-sizing: border-box;
    
    
    .check-info2{
      padding: 0 0.1rem;
      p{
        margin: 0;
      }
      img{
        width: 98%;
        display: block;
        margin: 0 auto;
      }
    }
}

</style>

