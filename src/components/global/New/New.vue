<template>
    <div class="New" @click="go">
      New组件
    </div>
  </template>
  <script>
  export default {
    name: 'New',
    methods:{
      go(){
        this.$router.push({
          name:"new"
        })
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  .New {
  
  }
  </style>
  