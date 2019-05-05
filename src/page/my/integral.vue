<template>
  <div class="conten">
    <Header leftIcon="back" titleColor="#333" title="积分明细" bg="#F6F6F6"/>
    <div class="integralbox">
      <ul class="oul">
        <li>
          <span class="icons"></span>
          <span>获得途径：</span>
          <span>扫一扫物流码</span>
        </li>
        <li>
          <span class="icons"></span>
          <span>物流单号：</span>
          <span>0000011111</span>
        </li>
        <li>
          <span class="icons"></span>
          <span>获得个人积分及明细：</span>
          <span>3积分</span>
        </li>
        <li>
          <span class="icons"></span>
          <span>问卷提交时间：</span>
          <span>2018/01/01 20:00</span>
        </li>
      </ul>
    </div>
    <div class="integralbox">
      <ul class="oul">
        <li>
          <span class="icons"></span>
          <span>获得途径：</span>
          <span>扫一扫物流码</span>
        </li>
        <li>
          <span class="icons"></span>
          <span>物流单号：</span>
          <span>0000011111</span>
        </li>
        <li>
          <span class="icons"></span>
          <span>获得个人积分及明细：</span>
          <span>3积分</span>
        </li>
        <li>
          <span class="icons"></span>
          <span>问卷提交时间：</span>
          <span>2018/01/01 20:00</span>
        </li>
      </ul>
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
    text-align: center;
    font-size: 0.3rem;
    padding-top: 0.88rem;
    h3,p,ul{
      padding: 0;
        margin: 0;
    }
    li{
      list-style: none;
    }
    

    .integralbox{
      padding: 0.3rem;
      width: 6.3rem;
      height: 1.76rem;
      background-color: #fff;
      border-radius: 0.1rem;
      margin: 0 auto 0.3rem;

      ul{
        text-align: left;

        li{
          height: 0.44rem;
          line-height: 0.44rem;
          padding-left: 0.43rem;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .icons{
            width: 0.32rem;
            height: 0.32rem;
            border-radius: 50%;
            background-color: #ffecdb;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto;
          }
        }
      }
    }
}

</style>

