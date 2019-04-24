<template>
  <div class="detail">
    <resultItem :isOpen="true" phone="020-89898989" address="广东省广州市荔湾区周门北路38号" :More="true"/>
    <div class="personal">
      <div class="top">
        <div class="title">
          <div class="icon"></div>
          <span>馆主个人信息</span>
        </div>
        <div class="item">姓名：张嘉欣</div>
        <div class="item">用户编号：890622</div>
        <div class="item">联系号码：18919890622</div>
        <div class="topBox">
          <div class="left"></div>
          <div class="personalBox">
            <div>所属决策：所属决策</div>
            <div>所属中策：所属中策</div>
            <div>所属系统发展委：系统发展委</div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="bottom">
        <div class="title">
          <div class="icon"></div>
          <span>店铺基本信息</span>
        </div>
        <div class="item">编号：89890622</div>
        <div class="item">馆别：馆别1</div>
        <div class="item">开业日期：2018-01-01</div>
        <div class="item">新增时间：2017-12-06</div>
        <div class="item">关闭日期：2018-06-22</div>
        <div class="line"></div>
      </div>
    </div>
    <div class="boss">
      <div class="top">
        <div class="title">
          <div class="icon"></div>
          <span>区域负责人信息</span>
        </div>
        <div class="item">姓名：王晓霞</div>
        <div class="item">联系方式：13989890622</div>
        <div class="line"></div>
      </div>
      <div class="bottom">
        <div class="title">
          <div class="icon"></div>
          <span>店铺业务办理情况</span>
        </div>
        <div class="item">授权牌办理情况：办理情况</div>
        <div class="item">合同期限：2018-01-01至2018-06-22</div>
        <div class="item">是否有检测报告：是</div>
        <div class="item">更变类型：更变类型</div>
        <div class="item">更变日期：2017-12-06</div>
         <div class="item">备注：备注备注备注备注备注备注</div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  components: {
    resultItem: () => import("./components/resultItem")
  }
};
</script>
  <style lang="scss" scoped>
.detail {
  position: relative;
  background: #f6f6f6;
  min-height: 100vh;
  padding: 0.2rem 0.3rem;
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

      .line {
        width: 100%;
        height: 0.04rem;
        background: rgba(238, 238, 238, 1);
        opacity: 0.4;
        border-radius: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
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
      .line {
        width: 100%;
        height: 0.04rem;
        background: rgba(238, 238, 238, 1);
        opacity: 0.4;
        border-radius: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
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
      .line {
        width: 100%;
        height: 0.04rem;
        background: rgba(238, 238, 238, 1);
        opacity: 0.4;
        border-radius: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
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
      .line {
        width: 100%;
        height: 0.04rem;
        background: rgba(238, 238, 238, 1);
        opacity: 0.4;
        border-radius: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>
  