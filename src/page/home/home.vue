<template>
  <div class="content">
           <swiperBox :swiperList="items" :canJump="true"></swiperBox>
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
.content{
    background-color: #f6f6f6;
    position: relative;
    height: 100%;
    font-size: 0.3rem;

    h3,p{
        margin: 0;
    }
}

</style>

