<template>
    <div class="listItem">
      <div class="box">

      
      <div class="imgBox">
        <div class="read">已读</div>
      </div>
      <div class="rightBox">
        <div class="title">2018美体内衣上海发布会成功举行</div>
        <div class="top">置顶</div>
        <p>2018-12-17</p>
      </div>
      </div>
      <listLine />
    </div>
  </template>
  <script>
  export default {
    name: 'listItem'
  }
  </script>
  <style lang="scss" scoped>
  .listItem {
     height: 2.2rem;
    position: relative;
    padding: 0.3rem 0;
    box-sizing: border-box;
   
    width: 100%;
    .box{
       display: flex;
       align-items: center;
       .imgBox{
      width: 2.84rem;
      height: 1.6rem;
      position: relative;
      .read{
        width: 0.66rem;
        height: 0.37rem;
        position: absolute;
        right:0;
        top:0;
        background:rgba(0,0,0,0.5);
        text-align: center;
        line-height: 0.37rem;
        color: #fff;
        font-weight:bold;
        font-size: 0.2rem;
      }
    }
    .rightBox{
      margin-left: 0.2rem;
      width: 4rem;
      height: 1.6rem;
      position: relative;
      .title{
        font-size: 0.3rem;
        line-height: .36rem
      }
      .top{
        width:1.16rem;
        margin-top: .1rem;
height:.6rem;
border:1px solid rgba(235,153,43,1);
border-radius:.2rem;
color: #EB992B;
text-align: center;
line-height: .6rem;
font-size: 0.4rem;
transform:scale(.5) translate(-50%,-50%);

      }
      p{
        margin: 0;
        position: absolute;
        bottom: 0;
        font-size: 0.24rem;
        color: #808080;
      }
    }
    }
    
  }
  </style>
  