<template>
  <div class="conten">
    <div class="search">
      <input class="ipt" type="text" placeholder="搜索">
    </div>
    <van-tabs class="tabs" background="#fff8f2" color="#ed7000" title-active-color="#333333">
        <van-tab v-for="item in goods" :key="item" :title="item">
          <div class="head">
            <div class="headimg"></div>
          </div>
          <div class="goods">
            <van-row class="goodsrow">
              <van-col span="8" class="goodsleft">
                <van-badge-group :active-key="activeKey" @change="onChange" >
                  <van-badge title="金色系列" />
                  <van-badge title="黑色系列"/>
                  <van-badge title="男士系列"/>
                </van-badge-group>
              </van-col>
              <van-col span="16" class="goodsright">
                <div class="productarea" @click="$router.push({name:'productdetails'})">
                  <ul>
                    <li class="imgoli">

                    </li>
                    <li class="name">商品</li>
                  </ul>
                </div>
              </van-col>
            </van-row>
            
          </div>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods:['美体内衣','护肤品','保健品','健康枕','化妆品','个人'],
      activeKey: 0
    };
  },
  mounted() {},
  methods: {
      onChange(key) {
        this.activeKey = key;
      }
  }
};
</script>

<style lang='scss' scoped>
input {
  outline: none;
  background: transparent;
  border: none;
  outline: medium;
  font-size: 0.3rem;
}
*:focus {
  outline: none;
  background-color: transparent;
}
::selection {
  background: transparent;
}
::-moz-selection {
  background: transparent;
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #cccccc;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    #cccccc;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    #cccccc;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:    #cccccc;
}
.conten{
    background-color: #f6f6f6;
    position: relative;
    height: 100%;
    text-align: center;
    font-size: 0.3rem;
    box-sizing: border-box;
    overflow: hidden;
     
    h3,p{
        margin: 0;
    }
    .search{
      width: 100%;
      // height: 0.6rem;
      background-color: #fff8f2;
     padding-top: 0.2rem;

      .ipt{
        padding: 0 0.76rem;
        width: 5.38rem;
        height: 0.6rem;
        background-color: #fff;
        border-radius: 0.3rem;
        font-size: 0.25rem;
        background-image: url("~assets/search.png");
        background-size: 0.26rem 0.25rem;
        background-repeat: no-repeat;
        background-position: 0.29rem 0.17rem;
      }
    }
    .tabs{
      height: 100%;
      box-sizing: border-box;
      .head{
        width: 100%;
        height: 2.76rem;
        background-color: #fff8f2;
        position: relative;

        .headimg{
          width: 6.1rem;
          height: 2rem;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          background-image: url("~assets/productbackground.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      
      
        .goods{
          height: 100%;
          .goodsrow {
            height: 100%;

            .goodsleft{
              width: 1.9rem;
              height: 100%;
              background-color: #fff;
            }
            .goodsright{
              padding: 0 0.16rem 0 0.1rem;
              width: 5.6rem;
              height: 100%;
              background-color: #fff8f2;
              overflow-x: hidden;
              overflow-y: scroll;

              .productarea{
                margin: 0.06rem 0 0 0.06rem;
                width: 2.6rem;
                height: 2.6rem;
                float: left;
                background-image: url(/static/zmimg/product/product_bg@2x.png);
                background-size: 100% 100%;
                background-repeat: no-repeat;

                .imgoli{
                  width: 2.4rem;
                  height: 1.9rem;
                  background-color: #ccc;
                  margin: 0.08rem auto;
                }
                .name{
                  font-size: 0.16rem;
                  color: #999999;
                }
              }

            }
            .goodsright::-webkit-scrollbar {
                display: none;
            }

          }
        }
      
    }
    
    
}

</style>

