<template>
  <div class="conten">
    <Header leftIcon="back" titleColor="#333" title="我的收藏" bg="#F6F6F6"/>
    <div class="collectionbox">
      <div class="collectioncon">
        <div class="collectionimg"></div>
        <div class="collectionmatter">
          <div class="cont">2018美体内衣上海发布会成功举行</div>
          <div class="time">2018-12-17</div>
        </div>
      </div>
    </div>
    <div class="collectionbox">
      <div class="collectioncon">
        <div class="collectionimg"></div>
        <div class="collectionmatter">
          <div class="cont">为什么选择我们品牌的内衣？</div>
          <div class="time">2018-12-11</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  mounted() {},
  methods: {
      
  }
};
</script>

<style lang='scss' scoped>
.conten{
    background-color: #f6f6f6;
    position: relative;
    height: 100%;
    font-size: 0.3rem;
    padding-top: 0.88rem;
    h3,p{
        margin: 0;
    }
    .collectionbox{
      padding: 0 0.22rem;

      .collectioncon{
        border-bottom: 0.04rem solid #e5e5e5;
        box-shadow: 0px 0px  0.1rem 0.1rem #f1f1f1;
        box-shadow:0rem 0.15rem 0.10rem -0.1rem #f1f1f1;
        padding: 0.3rem 0;
        display: box;              /* OLD - Android 4.4- */
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;

        .collectionimg{
          width: 2.84rem;
          height: 1.6rem;
          background-color: #ff0;
        }
        .collectionmatter{
          padding-left: 0.2rem;
          width: 4.02rem;
          height: 1.6rem;

          .cont{
            height: 1.28rem;
            overflow: hidden;
            color: #333333;
          }
          .time{
            height: 0.32rem;
            line-height: 0.4rem;
            font-size: 0.25rem;
            color: #808080;
          }
        }
      }
    }
}

</style>

