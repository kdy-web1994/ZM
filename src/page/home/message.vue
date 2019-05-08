<template>
  <div class="message">
    <Header leftIcon="back" titleColor="#333" title="我的消息"/>
    <mu-load-more :loading="false" @load="loadList" :loaded-all="all" v-if="List.length>0">
      <div class="box">
        <div class="item" v-for="(item,index) in List" :key="index">
        <div class="title">
          <div class="icon"></div>
          <div class="text">
            {{item.title}}
            <div class="new"></div>
          </div>
        </div>
        <div class="time"> {{item.time}}</div>
        <div class="content">
          {{item.content}}
        </div>
      </div>
      <div v-show="loading&&List.length>0" class="loading">
        <!-- 加载动画 -->
        <div class="mid">
          <i></i>
          <span>正在加载更多...</span>
        </div>
      </div>
      </div>
      
    </mu-load-more>
    <div v-else class="noData">
         <div class="icon">

         </div>
         <p>暂无消息哦~</p>
    </div>

  </div>
</template>
  <script>
export default {
  data() {
    return {
      all: false,
      loading: false,
      List: [],
      pa: 1
    };
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    }
  },
  watch: {
    getUser(a, b) {
      if (Object.keys(a).length > 0) {
        console.log(this.$store.state.user,2)
        this.loadList(this.pa);
      }
    }
  },
  created() {
    if (Object.keys(this.$store.state.user).length > 0) {
      console.log(1)
      this.loadList(this.pa);
    }
  },
  methods: {
    clear() {
      this.$Api.DeleteItem("1", this.$store.state.user.id, []).then(res => {
        console.log(res);
        let q = res.q;
        if (q.s == 0) {
          this.postData.pa = 1;
          this.List = [];
          this.loadList();
        }
      });
    },
    loadList(pa) {
      let table = {
        pa,
        li: 10
      };
      if(this.loading){
        return
      }
       if (Object.keys(this.$store.state.user).length <= 0) {
       return 
    }
      console.log(this.loading)
      this.loading = true;
      this.$Api
        .getMessageList(this.$store.state.user.id, table)
        .then(res => {
          console.log(res);
          let q = res.q;
          if (q.s == 0) {
            this.pa += 1;
            if (this.pa >= Math.ceil(q.total / 10)) this.all = true;
            setTimeout(()=>{
            this.List.push(...q.massages);
            
           this.loading = false;
            },700)
          

          }
        })
        ;
    }
  }
};
</script>
  <style lang="scss" scoped>
.message {
   padding-top: 0.88rem;
   box-sizing: border-box;
   background: #fff;
  min-height: 100vh;
  .noData{
    .icon{
      width: 5.45rem;
      height: 3.63rem;
      margin: auto;
      margin-top: 1.87rem;
      background: url("../../../static/zmimg/common/message.png") no-repeat;
      background-size:100% 100%; 
    }
    p{
          color: #999999;
          font-size: 0.3rem;
          margin: 0;
          margin-top: 0.4rem;
          text-align: center;
    }
  }
  .box{
     padding-top: 0.2rem;
    position: relative;
    min-height: 100vh;
    padding-bottom: 0.9rem;
    box-sizing: border-box;
    background: #f6f6f6;
  }
  .item {
    width: 6.9rem;
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
    background: #fff;
    margin: auto;
    margin-bottom: 0.3rem;
    
    .title {
      display: flex;
      align-items: center;
      .icon {
        width: 0.32rem;
        height: 0.32rem;
        background: url("../../assets/service/home_icon_message@3x.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .text {
        position: relative;
        max-width: 6rem;
        font-size: 0.3rem;
        margin-left: 0.1rem;
        .new {
          position: absolute;
          width: 0.1rem;
          height: 0.1rem;
          background: linear-gradient(
            45deg,
            rgba(237, 108, 0, 1),
            rgba(243, 152, 0, 1)
          );
          border-radius: 50%;
          right: -0.2rem;
          top: 0.05rem;
        }
      }
    }
    .time {
      margin-top: 0.15rem;
      font-size: 0.22rem;
      color: #999999;
    }
    .content {
      font-size: 0.26rem;
      margin-top: 0.3rem;
    }
  }
  .loading {
  padding: 0.2rem 0;
  width: 100%;
  position: absolute;
  bottom: 0.2rem;
	.mid {
		display: flex;
		display: -webkit-box;
		/* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
		display: -moz-box;
		/* 老版本语法: Firefox (buggy) */
		display: -ms-flexbox;
		/* 混合版本语法: IE 10 */
		display: -webkit-flex;
		/* 新版本语法: Chrome 21+ */
		-webkit-justify-content: center;
		-moz-justify-content: center;
		-ms-justify-content: center;
		-o-justify-content: center;
		justify-content: center;
		align-items: center;
		 -webkit-align-items:center;
box-align:center;
-moz-box-align:center;
-webkit-box-align:center;
border: none;
		i {
			width: 0.28rem;
			height: 0.3rem;
			float: left;
			background: url(../../assets/common_icon_Load@3x.png) no-repeat;
			background-size: 100%;
			position: relative;
			// top: 0.05rem;
			transition: 0.75s;
			animation: icon 1s 0s infinite linear;
		}
		@keyframes icon {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
		span {
			font-size: 0.28rem;
			margin-left: 0.08rem;
			color: #999999;
		}
	}
}
}
</style>
<style lang="scss">
 .message{
  .mu-infinite-scroll{
    display: none !important;
  }
 }
</style>

  