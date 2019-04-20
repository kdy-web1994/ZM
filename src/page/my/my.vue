<template>
  <div class="conten">
      <div class="myhead">
          <div class="top">
              <span class="name">买买提.买买不提</span>
              <span class="news"></span>
              <span class="phone"></span>
          </div>
          <div class="serialnum">用户编号：<span>CN0000000</span></div>
          <div class="bottom">
              <div class="func">
                  <p>扫码积分</p>
                  <span>99999</span>
              </div>
              <div class="func">
                  <p>我的收藏</p>
                  <span>111</span>
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

    p{
        margin: 0;
    }

    .myhead{
        width: 100%;
        height: 3.5rem;
        background: linear-gradient(left, #ee730d 0%, #e96a00 10%, #ef7a19 60%, #ee720b 100%);
        background: -ms-linear-gradient(left, #ee730d 0%, #e96a00 10%, #ef7a19 60%, #ee720b 100%);
        background: -webkit-linear-gradient(left, #ee730d 0%, #e96a00 10%, #ef7a19 60%, #ee720b 100%);
        background: -moz-linear-gradient(left, #ee730d 0%, #e96a00 10%, #ef7a19 60%, #ee720b 100%);

        .top{
            padding: 0.6rem 0.5rem 0.25rem;
            display: box;              /* OLD - Android 4.4- */
            display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;      /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;

            span{
                display: block;
            }
            .name{
                width: 80%;
                color: #fff;
                text-align: left;
                font-size: 0.35rem;
            }
            .news{
                width: 0.43rem;
                height: 0.43rem;
                background-color: #fff;
            }
            .phone{
                margin-left: 0.3rem;
                width: 0.43rem;
                height: 0.43rem;
                background-color: #fff;
            }
        }
        .serialnum{
            margin-left: 0.5rem;
            width: 2.71rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border-radius: 0.4rem;
            background-color: #ec8c0b;
            color: #ffffff;
            font-size: 0.16rem;
        }
    }
}

</style>

