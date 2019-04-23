<template>
    <div id="Footer">
      <div  v-for="(item,index) in arr" :key="index" @click="go(index)" :class="['item',activeIndex===index?'activeBox':'']">
          <div>
            <div :class="['icon',item.icon,activeIndex===index?item.activeIcon:'' ]"></div>
                 <p :class="[activeIndex===index?'active':'']">{{item.text}}</p>
          </div>
      </div>
    
    </div>
  </template>
  <script>
  
  export default {
    name: 'Footer',
    data(){
      return{
            activeIndex:0,
            arr:[{
               icon:'home',
               activeIcon:'homeActive',
               text:'首页'
            },{
               icon:'serve',
               activeIcon:'serveActive',
               text:'服务'
            },
            {
               icon:'product',
               activeIcon:'productActive',
               text:'产品'
            },
            {
               icon:'my',
               activeIcon:'myActive',
               text:'我的'
            }
            
            
            ]
      }
    },
    created(){
      
    },
    methods:{
      go(index){
        this.activeIndex=index
      }
    }

  }
  </script>
  <style lang="scss" scoped>
  #Footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 0.98rem;
    display: flex;
    .item{
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon{
               width: 0.44rem;
               height: 0.44rem;
               margin: auto;
        }

        .home{
          background: url("../../../assets/footer/1.png") no-repeat;
          background-size:100% 100%; 
        }
        .homeActive{
           background: url("../../../assets/footer/1_active.png") no-repeat;
          background-size:100% 100%; 
        }
        
         .serve{
          background: url("../../../assets/footer/2.png") no-repeat;
          background-size:100% 100%; 
        }
        .serveActive{
           background: url("../../../assets/footer/2_active.png") no-repeat;
          background-size:100% 100%; 
        }
         .product{
          background: url("../../../assets/footer/3.png") no-repeat;
          background-size:100% 100%; 
        }
        .productActive{
           background: url("../../../assets/footer/3_active.png") no-repeat;
          background-size:100% 100%; 
        }
         .my{
          background: url("../../../assets/footer/4.png") no-repeat;
          background-size:100% 100%; 
        }
        .myActive{
           background: url("../../../assets/footer/4_active.png") no-repeat;
          background-size:100% 100%; 
        }






        p{
          font-size: 0.2rem;
          margin: 0;
          color: #999999;
        }
        .active{
          color: #ED6C00;
        }

    }
    .activeBox{
      background:rgba(243,150,0,0.2);

    }
  }
  </style>
  