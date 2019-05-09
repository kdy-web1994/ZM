<template>
  <div class="conten">
      <div class="myhead">
          <div class="top">
              <span class="name">{{user.nickName}}</span>
              <span class="news">
                  <div class="reddot">99<span class="add">+</span></div>
              </span>
              <span class="phone"></span>
          </div>
          <div class="serialnum">用户编号：<span>{{user.id}}</span></div>
          <div class="bottom">
              <div class="func">
                  <div class="funcbox" @click='$router.push({name:"integral"})'>
                    <div class="iconbox integrals"></div>
                    <p>扫码积分</p>
                    <span></span>
                  </div>
              </div>
              <div class="func">
                  <div class="funcbox" @click='$router.push({name:"collection"})'>
                    <div class="iconbox collections"></div>
                    <p>我的收藏</p>
                    <span>111</span>
                  </div>
              </div>
          </div>
      </div>
      <div class="mybody">
          <div class="item" @click='$router.push({name:"changepassword"})'>
              <i class="left lock"></i>
              <span class="cont" >修改密码</span>
              <i class="right"></i>
          </div>
          <div class="center">

               <div class="items" @click='$router.push({name:"feedback"})'>
                    <i class="left feedbacks"></i>
                    <span class="cont">意见反馈</span>
                    <i class="right"></i>
                </div>
                <div class="items" @click='$router.push({name:"aboutus"})'>
                    <i class="left people"></i>
                    <span class="cont">关于我们</span>
                    <i class="right"></i>
                </div>
                <div class="items">
                    <i class="left trash"></i>
                    <span class="cont">清理缓存</span>
                    <i class="right"></i>
                </div>

          </div>
          <div class="item">
              <span class="exit" @click="outLoginSubmit()">退出登录</span>
          </div>
      </div>
      <News />
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data() {
    return {
      power: JSON.parse(localStorage.getItem('zm_power')) || [],
      user: JSON.parse(localStorage.getItem('zm_user')) || {},
    };
  },
  created(){

  },
  mounted() {
      
  },
  methods: {
     
    outLoginSubmit(){ // 退出登录
      Dialog.confirm({
        title: '消息',
        message: '确认退出登录?'
      }).then(() => {
        this.$Api.UserLogout().then(res=>{
          let q=res.q
          if(q.s==0){
            localStorage.removeItem('zm_user')
            this.user={}
            this.$router.push({name:'login'})
          } else {
            this.$set(this.user,'integral','')
          }
        })
      }).catch(() => { })
    },
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
        background-image: url(/static/zmimg/my/my_bg@2x.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: left;

        .top{
            padding-bottom: 0.2rem;
            display: box;              /* OLD - Android 4.4- */
            display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;      /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;
            height: 0.63rem;
            line-height: 0.43rem;

            span{
                display: block;
            }
            .name{
                width: 75%;
                color: #fff;
                text-align: left;
                font-size: 0.38rem;
                font-weight: 600;
            }
            .news{
                width: 0.43rem;
                height: 0.43rem;
                background-image: url('~assets/common_icon_news@3x.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                position: relative;

                .reddot{
                    width: 0.4rem;
                    height: 0.4rem;
                    padding-right: 0.08rem;
                    text-align: center;
                    line-height: 0.4rem;
                    background-color: #fc2520;
                    color: #fff;
                    font-size: 0.12rem;
                    border-radius: 50%;
                    position: absolute;
                    right: -0.16rem;
                    top: -0.22rem;

                    .add{
                        position: absolute;
                        top: -0.05rem;
                        right: 0.04rem;
                    }
                }
                
            }
            .phone{
                margin-left: 0.5rem;
                width: 0.43rem;
                height: 0.43rem;
                background-image: url('~assets/common_icon_phone@3x.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }
        .serialnum{
            display: inline-block;
            height: 0.4rem;
            line-height: 0.3rem;
            border-radius: 0.4rem;
            background-color: #ec8a08;
            padding: 0.05rem 0.2rem;
            color: #ffffff;
            font-size: 0.22rem;
        }
        .bottom{
            display: box;              /* OLD - Android 4.4- */
            display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;      /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;

            .func{
                padding-top: 0.2rem;
                width: 50%;
                text-align: center;
                .funcbox{
                    margin: 0 auto;

                    .iconbox{
                        width: 0.6rem;
                        height: 0.6rem;
                        margin: 0 auto;
                    }
                    .integrals{
                        background-image: url(/static/zmimg/my/my_icon_star@2x.png);
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .collections{
                        background-image: url(/static/zmimg/my/my_icon_heart@2x.png);
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    p{
                        color: #fff;
                        font-size: 0.26rem;
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
                width: 0.28rem;
                height: 0.34rem;
                left: 0.24rem;
            }
            .lock{
                background-image: url(/static/zmimg/my/my_icon_password@2x.png);
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }

            .right{
                width: 0.4rem;
                height: 0.4rem;
                right: 0.24rem;
            }
            .cont{
                position: absolute;
                left: 0.7rem;
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
                    width: 0.28rem;
                    height: 0.34rem;
                    left: 0;
                }
                .feedbacks{
                    background-image: url(/static/zmimg/my/my_icon_opinion@2x.png);
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
                .people{
                    background-image: url(/static/zmimg/my/my_icon_person@2x.png);
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
                .trash{
                    background-image: url(/static/zmimg/my/my_icon_deleate@2x.png);
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }

                .right{
                    width: 0.4rem;
                    height: 0.4rem;
                    right: 0.3rem;
                }
                .cont{
                    position: absolute;
                    left: 0.46rem;
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

