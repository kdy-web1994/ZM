<template>
  <div class="detail">
    <Header leftIcon="back" titleColor="#333" title="店铺查询" bg="#F6F6F6" />
    <resultItem  :id="id"  :item="item" :More="false" @map="map"  />
    <div class="personal">
      <div class="top">
        <div class="title">
          <div class="icon"></div>
          <span>馆主个人信息</span>
        </div>
        <div class="item">姓名：{{shop.user.name}}</div>
        <div class="item">用户编号：{{shop.user.id}}</div>
        <div class="item">联系号码：{{shop.user.mobile}}</div>
        <div class="topBox">
          <div class="left"></div>
          <div class="personalBox">
            <div>所属决策：{{shop.user.departmentOne}}</div>
            <div>所属中策：{{shop.user.departmenTwo}}</div>
            <div>所属系统发展委：{{shop.user.departmenThree}}</div>
          </div>
        </div>
        <boxLine />
      </div>
      <div class="bottom">
        <div class="title">
          <div class="icon"></div>
          <span>店铺基本信息</span>
        </div>
        <div class="item">编号：{{shop.id}}</div>
        <div class="item">馆别：{{shop.type}}</div>
        <div class="item">开业日期：{{shop.dateopened}}</div>
        <div class="item">新增时间：{{shop.addtime}}</div>
        <div class="item">关闭日期：{{shop.closedDate}}</div>
         <boxLine />
      </div>
    </div>
    <div class="boss">
      <div class="top">
        <div class="title">
          <div class="icon"></div>
          <span>区域负责人信息</span>
        </div>
        <div class="item">姓名：{{shop.regionalHead.name}}</div>
        <div class="item">联系方式：{{shop.regionalHead.phone}}</div>
         <boxLine />
      </div>
      <div class="bottom">
        <div class="title">
          <div class="icon"></div>
          <span>店铺业务办理情况</span>
        </div>
        <div class="item">授权牌办理情况：{{shop.authorizationcard==1?'已办理':shop.authorizationcard==2?'未办理':shop.authorizationcard==3?'办理中':shop.authorizationcard==4?'已取消':''}}</div>
        <div class="item">合同期限：{{shop.contractperiod}}</div>
        <div class="item">是否有检测报告：{{shop.istestreport==1?'有':shop.istestreport==2?'无':shop.istestreport==3?'办理中':shop.istestreport==4?'已过期':shop.istestreport==5?'其他':''}}</div>
        <div class="item">更变类型：{{item.shop.changeType}}</div>
        <div class="item">更变日期：{{item.shop.changeDate}}</div>
         <div class="item">备注：{{item.shop.remarks}}</div>
         <boxLine />
      </div>
    </div>
  </div>
</template>
  <script>
  import { Toast } from 'vant'
export default {
  components: {
    resultItem: () => import("./components/resultItem")
  },
  data(){
    return {
      item:{},
      id:""
    }
  },
  created(){
    this.id=this.$route.query.id
    this.item={...this.$route.query.item}
       this.getData(this.id)
  },
  methods:{
    map(){

    },
     getData(id){
       this.$Api.getShopDetails(0,id).then(res=>{
        console.log(res)
        let q=res.q
        if(q.s==0){
          this.shop={...q.shop}

        }
      })
     }
  }
};
</script>
  <style lang="scss" scoped>
.detail {
  position: relative;
  background: #f6f6f6;
  min-height: 100vh;
  padding: 0.2rem 0.3rem;
  padding-top: 1.08rem;
  box-sizing: border-box;
  .personal {
    margin-top: 0.3rem;
    width: 6.9rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.1rem;
    padding: 0.1rem 0.3rem 0.4rem;
    box-sizing: border-box;
      .item {
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        font-size: 0.26rem;
        margin-top: 0.15rem;
      }
    .top {
      position: relative;
      padding: 0.4rem 0;
      .title {
        display: flex;
        align-items: center;
        .icon {
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 50%;
          background: url("../../assets/service/service_icon_person_orange@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        span {
          font-size: 0.26rem;
          font-weight: 500;
          margin-left: 0.12rem;
        }
      }
      
      .topBox {
        display: flex;
        margin-top: 0.17rem;
        .left {
          width: 0.6rem;
          height: 0.6rem;
          margin-left: 0.5rem;
          background: url("../../assets/service_icon_line_orange@3x.png")
            no-repeat;
          background-size: 100% 100%;
          position: relative;
          top: 0.08rem;
        }
        .personalBox {
          margin-left: 0.17rem;
          div {
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            font-size: 0.26rem;
            margin-bottom: 0.15rem;
          }
          div:last-child {
            margin: 0;
          }
        }
      }

      
    }

    .bottom {
      position: relative;
      padding: 0.4rem 0;
      .title {
        display: flex;
        align-items: center;
        .icon {
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 50%;
          background: url("../../assets/service/service_icon_store_orange@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        span {
          font-size: 0.26rem;
          font-weight: 500;
          margin-left: 0.12rem;
        }
      }
      
    }
  }
  .boss {
    margin-top: 0.3rem;
    width: 6.9rem;
    background: rgba(255, 255, 255, 1);
    padding: 0.1rem 0.3rem 0.4rem;
    box-sizing: border-box;
    border-radius: 0.1rem;
    padding: 0.1rem 0.3rem 0.4rem;
    box-sizing: border-box;
    position: relative;
    .item {
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        font-size: 0.26rem;
        margin-top: 0.15rem;
      }
    .top {
      position: relative;
      padding: 0.4rem 0;
      
      .title {
        display: flex;
        align-items: center;
        .icon {
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 50%;
          background: url("../../assets/service/service_icon_person_red@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        span {
          font-size: 0.26rem;
          font-weight: 500;
          margin-left: 0.12rem;
        }
      }
      
    }

    .bottom {
      position: relative;
      padding: 0.4rem 0;
      .title {
        display: flex;
        align-items: center;
        .icon {
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 50%;
          background: url("../../assets/service/service_icon_store_red@3x.png")
            no-repeat;
          background-size: 100% 100%;
        }
        span {
          font-size: 0.26rem;
          font-weight: 500;
          margin-left: 0.12rem;
        }
      }
      
    }
  }
}
</style>
  