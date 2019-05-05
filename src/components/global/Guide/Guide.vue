<template>
  <div id="Guide">
    <div class="guide_a">

      <div class="close"></div>

      <div>
        <div class="back_t">CN</div>
        <div class="line_a"></div>
        <div class="hint_a"></div>
      </div>

      <!-- <div>
        <div class="id_card">身份证号码</div>
        <div class="line_b"></div>
        <div class="hint_b"></div>
      </div> -->

      <!-- <div>
        <div class="name">姓名</div>
        <div class="line_c"></div>
        <div class="hint_c"></div>
      </div> -->

      <!-- <div>
        <div class="cipher">设置8位数字及字母</div>
        <div class="line_d"></div>
        <div class="hint_d"></div>
      </div> -->
      
      <div class="next"></div>

      <!-- <div class="know"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guide',
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
      
  }
};
</script>

<style lang='scss' scoped>
#Guide{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;

  .guide_a{
    .close{
      width: 0.22rem;
      height: 0.22rem;
      background-image: url(/static/zmimg/login/login_icon_close@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      right: 0.5rem;
      top: 0.03rem;
    }

    .back_t{
      width: 4.78rem;
      height: 1.12rem;
      background-image: url(/static/zmimg/login/login_ba_guide@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 2.37rem;
      left: 0.32rem;
      text-align: left;
      line-height: 1.12rem;
      padding-left: 0.48rem;
      color: #333333;
    }
    .line_a{
      background-image: url(/static/zmimg/login/login_icon_arrow@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 1.01rem;
      height: 0.45rem;
      position: absolute;
      top: 3.74rem;
      left: 1.41rem;
    }
    .hint_a{
      background-image: url(/static/zmimg/login/login_icon_text@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 3.08rem;
      height: 0.81rem;
      position: absolute;
      top: 3.75rem;
      left: 2.59rem;
    }

    .id_card{
      width: 4.78rem;
      height: 1.12rem;
      background-image: url(/static/zmimg/login/login_ba_guide@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 3.36rem;
      left: 0.32rem;
      text-align: left;
      line-height: 1.12rem;
      padding-left: 0.48rem;
      color: #cccccc;
    }
    .line_b{
      background-image: url(/static/zmimg/login/login_icon_arrow@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 1.01rem;
      height: 0.45rem;
      position: absolute;
      top: 4.84rem;
      left: 1.31rem;
    }
    .hint_b{
      background-image: url(/static/zmimg/login/login_icon_text4@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 3.18rem;
      height: 1.41rem;
      position: absolute;
      top: 4.84rem;
      left: 2.59rem;
    }

    .name{
      width: 4.78rem;
      height: 1.12rem;
      background-image: url(/static/zmimg/login/login_ba_guide@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 3.36rem;
      left: 0.32rem;
      text-align: left;
      line-height: 1.12rem;
      padding-left: 0.48rem;
      color: #cccccc;
    }
    .line_c{
      background-image: url(/static/zmimg/login/login_icon_arrow@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 1.01rem;
      height: 0.45rem;
      position: absolute;
      top: 4.84rem;
      left: 1.41rem;
    }
    .hint_c{
      background-image: url(/static/zmimg/login/login_icon_text2@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 3.95rem;
      height: 0.81rem;
      position: absolute;
      top: 4.84rem;
      left: 2.59rem;
    }

    .cipher{
      width: 4.78rem;
      height: 1.12rem;
      background-image: url(/static/zmimg/login/login_ba_guide@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 4.44rem;
      left: 0.31rem;
      text-align: left;
      line-height: 1.12rem;
      padding-left: 0.48rem;
      color: #cccccc;
    }
    .line_d{
      background-image: url(/static/zmimg/login/login_icon_arrow@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 1.01rem;
      height: 0.45rem;
      position: absolute;
      top: 5.92rem;
      left: 1.41rem;
    }
    .hint_d{
      background-image: url(/static/zmimg/login/login_icon_text3@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 3.07rem;
      height: 0.81rem;
      position: absolute;
      top: 5.92rem;
      left: 2.59rem;
    }

    .next{
      background-image: url(/static/zmimg/login/login_btn_next@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 1.8rem;
      height: 0.74rem;
      position: absolute;
      bottom: 1.41rem;
      left: 0;
      right: 0;
      margin: 0 auto;
    }

    .know{
      background-image: url(/static/zmimg/login/login_btn_done@2x.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 1.8rem;
      height: 0.74rem;
      position: absolute;
      bottom: 1.41rem;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }

  
}


</style>

