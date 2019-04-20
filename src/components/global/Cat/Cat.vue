<template>
    <div class="Cat" @click="go">
      Cat组件
    </div>
  </template>
  <script>
  export default {
    name: 'Cat',
    methods:{
      go(){
        console.log(1)
        console.log(this.$router)
        this.$router.push({
          name:"new"
        })
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  .Cat {
  
  }
  </style>
  