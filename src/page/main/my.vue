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
                  <div class="funcbox" @click='$router.push({name:"integral"})'>
                    <div class="iconbox"></div>
                    <p>扫码积分</p>
                    <span>99999</span>
                  </div>
              </div>
              <div class="func">
                  <div class="funcbox" @click='$router.push({name:"collection"})'>
                    <div class="iconbox"></div>
                    <p>我的收藏</p>
                    <span>111</span>
                  </div>
              </div>
          </div>
      </div>
      <div class="mybody">
          <div class="item" @click='$router.push({name:"changepassword"})'>
              <i class="left"></i>
              <span class="cont" >修改密码</span>
              <i class="right"></i>
          </div>
          <div class="center">

               <div class="items" @click='$router.push({name:"feedback"})'>
                    <i class="left"></i>
                    <span class="cont">意见反馈</span>
                    <i class="right"></i>
                </div>
                <div class="items" @click='$router.push({name:"aboutus"})'>
                    <i class="left"></i>
                    <span class="cont">关于我们</span>
                    <i class="right"></i>
                </div>
                <div class="items">
                    <i class="left"></i>
                    <span class="cont">清理缓存</span>
                    <i class="right"></i>
                </div>

          </div>
          <div class="item">
              <span class="exit">退出登录</span>
          </div>
      </div>
      <News />
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
        padding: 0.6rem 0.5rem 0;
        height: 3.5rem;
        background-color: #eb6b00;
        text-align: left;

        .top{
            padding-bottom: 0.2rem;
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
                font-size: 0.4rem;
            }
            .news{
                width: 0.43rem;
                background-color: #fff;
            }
            .phone{
                margin-left: 0.3rem;
                width: 0.43rem;
                background-color: #fff;
            }
        }
        .serialnum{
            display: inline-block;
            height: 0.4rem;
            line-height: 0.4rem;
            border-radius: 0.4rem;
            background-color: #ec8a08;
            padding: 0 0.1rem;
            color: #ffffff;
            font-size: 0.16rem;
        }
        .bottom{
            display: box;              /* OLD - Android 4.4- */
            display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;      /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;

            .func{
                padding-top: 0.5rem;
                width: 50%;
                text-align: center;
                .funcbox{
                    width: 1.2rem;
                    margin: 0 auto;

                    .iconbox{
                        width: 0.44rem;
                        height: 0.38rem;
                        background-color: #fff;
                        margin: 0 auto;
                    }
                    p{
                        color: #fff;
                    }
                    span{
                        color: #ffca9e;
                    }
                }
            }
        }
    }
    .mybody{
        padding-top: 0.01rem;
        .item{
            padding: 0 0.3rem;
            height: 1.08rem;
            line-height: 1.08rem;
            background-color: #fff;
            font-size: 0.35rem;
            position: relative;

            i{
                display: inline-block;
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
            }
            .left{
                width: 0.23rem;
                height: 0.29rem;
                background-color: #ed6d00;
                left: 0.24rem;
            }
            .right{
                width: 0.4rem;
                height: 0.4rem;
                right: 0.24rem;
            }
            .cont{
                position: absolute;
                left: 0.6rem;
                top: 0;
                bottom: 0;
                margin: auto;
            }
            .exit{
                display: block;
                text-align: center;
            }
        }
        .center{
            margin: 0.2rem 0;
            padding-left: 0.3rem;
            background-color: #fff;

            .items{
                height: 1.08rem;
                line-height: 1.08rem;
                font-size: 0.35rem;
                position: relative;
                border-bottom:0.01rem solid #e5e5e5; 

                i{
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
                .left{
                    width: 0.23rem;
                    height: 0.29rem;
                    background-color: #ed6d00;
                    left: 0;
                }
                .right{
                    width: 0.4rem;
                    height: 0.4rem;
                    right: 0.3rem;
                }
                .cont{
                    position: absolute;
                    left: 0.36rem;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
    
            }
            .items:last-child{
                border-bottom:0; 
            }
        }
        .right{
            background-image: url("../../assets/next.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }
    .microphone{
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 50%;
        background-color: #f3ad49;
        position: absolute;
        bottom: 1.23rem;
        right: 0.22rem;
    }
}

</style>

