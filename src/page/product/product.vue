<template>
  <div class="conten">
    
    <van-tabs>
        <van-tab v-for="item in goods" :title="item">
            {{ item }}
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods:['美体内衣','护肤品','保健品','健康枕','化妆品','个人']
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

    h3,p{
        margin: 0;
    }
}

</style>

