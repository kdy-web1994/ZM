<template>
    <div class="order">
      <Header leftIcon="back" titleColor="#333" title="订单查询" bg="#F6F6F6"/>
      <div class="content">
         <Item icon="orderNum" title="订单编号" :isRequire="false" placeholder="请输入" type="input" inputType="text" v-model="postData.orderSn"/>
         <Item icon="attribute" title="订单属性" :value='orderTypeText' :isRequire="false" placeholder="请选择" type="select" @showType="isShowPopup1=true" />
         <Item icon="number" title="用户编号" v-model="postData.uid" :isRequire="false" placeholder="请输入" type="input" inputType="text" />
         <Item icon="audit" title="审核状态" :value="auditStatusText" :isRequire="false" placeholder="请选择" type="select" @showAuditStatus="isShowPopup2=true"/>
         <Item icon="order" title="订单状态" :value="statusText" :isRequire="false" placeholder="请选择" type="select" @showStatus="isShowPopup3=true"/>
         <Item icon="date" title="审核日期" :value="auditDateText" :isRequire="false" placeholder="请选择日期区间" type="select"  @showData="isDate=true"/>
      </div>
      <div class="btn" @click='checkOrder'>查询</div>

      <van-popup v-model="isDate" position="bottom" :overlay="true" :close-on-click-overlay="true">
    <div class="MadePicktitle">
      <div class="item" @click="changeDate(0)">{{fromDate}}</div>
      <span>至</span>
      <div class="item" @click="changeDate(1)">{{toDate}}</div>
      <div class="MadePickLine" :style="[{'left':dateIndex==0?'0.22rem':'3.2rem'}]"></div>
      <span class="MadePickComfirm" @click="comfirmDate">完成</span>
    </div>
    <van-datetime-picker :show-toolbar='false' v-if="fromDatePicker" v-model="commonFromDate" type="date" :formatter="formatter" :min-date="datePicter.min" :max-date="datePicter.now" @change="fromDateChange" />
    <van-datetime-picker :show-toolbar='false' v-if="toDatePick" v-model="commonToDate" type="date" :formatter="formatter" :min-date="toObj.minDate" :max-date="datePicter.now"  @change="toDateChange"/>

  </van-popup>
  
  <van-popup v-model="isShowPopup3" position="bottom">
      <van-picker show-toolbar :columns="orderStatusColumns" @confirm="handleClick3($event)" @cancel='isShowPopup3=false'/>
    </van-popup>

<!-- 核审状态 -->
		<van-popup v-model="isShowPopup2" position="bottom">
      <van-picker show-toolbar :columns="orderVerifyColumns" @confirm="handleClick2($event)" @cancel='isShowPopup2=false'/>
    </van-popup>

<!-- 订单属性 -->
		<van-popup v-model="isShowPopup1" position="bottom">
      <van-picker show-toolbar :columns="orderPropColumns" @confirm="handleClick1($event,1,1)" @cancel='handleClick1($event,1)'/>
    </van-popup>
    </div>
  </template>
  <script>
  export default {
    components: {
    Item: () => import("./components/item")
  },
  data(){
    return {
      isShowPopup1:false,
     orderPropColumns:[
        { text:"会员首单",  id:10 },
        { text:"会员补单",  id:11 },
        { text:"县代理补单",id:18 },
        { text:"县代理订单",id:12 },
        { text:"店铺单",    id:20 },
        { text:"店铺补单",  id:19 },
        { text:"积分换购单", id:21 },
        { text:"重消单",     id:13 },
        { text:"辅销品订单", id:5 }
      ],
      orderTypeText:"",
      isShowPopup2:false,
      orderVerifyColumns:[
        { text:"待核订单",id:1 },
        { text:"已审核",id:2 }
      ],
      auditStatusText:"",
      isShowPopup3:false,
       orderStatusColumns:[
        { text:"正常",id:0 },
        { text:"取消",id:1 }
      ],
      statusText:"",
      auditDateText:"",
       commonFromDate: "",
      commonToDate: "",
      isDate:false,
      fromDate:"",
      toDate:"",
      
      toObj: {
        minDate: "",
        maxDate: ""
      },
      dateIndex:0,
     fromDatePicker: true,
      toDatePick: false,
       datePicter:
      {
        cur1: new Date((new Date().getTime()-1000*60*60*24*7)),  // date1 初始值
        cur2: new Date(),  // date2 初始值
        now: new Date( (Date.parse(new Date(new Date().toLocaleDateString())) || Date.parse(new Date(new Date().toLocaleDateString().replace(/\//g,'-'))))+24*60*60*1000-1),   // 今天
        min: new Date( (Date.parse(new Date('2012-06-21')) || Date.parse(new Date('2012-06-21'.replace(/-/g,'/')))))
      },
      maxDate: new Date((new Date() / 1000 + 86400 * 365 * 1) * 1000),
      postData:{
        pa: 1,
        li: 10,
        ob: 2,
        ot: 1,
        orderSn:'',
        orderType:undefined,
        uid:'',
        auditStatus:undefined,
        status:undefined,
        auditDate: undefined,
        startDate: undefined,
        endDate: undefined,
      },
      isload:false,
      role:""
    }
  },
  created(){
      this.initDate()
      this.role = (JSON.parse(localStorage.getItem('zm_user'))||{}).type
  },
  methods:{
    checkOrder(){
      if(this.isload)
        return 
      this.isload=true
      let table = {
        pa: this.postData.pa,
        li: this.postData.li,
        ob: this.postData.ob,
        ot: this.postData.ot,
        w:{
          orderSn: this.postData.orderSn,
          type:    this.postData.orderType,
          uid:     this.postData.uid,
          auditStatus:   this.postData.auditStatus,
          status:        this.postData.status,
          auditDate:     this.postData.auditDate
        }
      }
     
      
      this.$Api.getOrderList(table).then(res=>{
         console.log(res)
        let q=res.q
        if(q.s==0){
          q.orders=this.$base.timeFormat(q.orders,'auditDate','yyyy-MM-dd hh:mm')
          localStorage.setItem('zm_orderResultData',JSON.stringify(q))
          localStorage.setItem('zm_orderRecord', 
          JSON.stringify({ postData:table.w,orderTypeText:this.orderTypeText,auditStatusText:this.auditStatusText,statusText:this.statusText,auditDateText:this.auditDateText }))

          if(!q.orders||!q.orders.length) {
            if(this.role==1){
               this.$alert(
        "亲爱的家人，您好！暂无该订单记录，请重新输入，目前仅支持查询您名下或您报的订单，谢谢！",
        "我已知悉"
      )
            }else{
               this.$alert(
        "亲爱的家人，您好！暂无该订单记录，请重新输入，目前仅支持查询您名下订单，谢谢！",
        "我已知悉"
      )
            }
       

          } else {
            this.$router.push({ name:'/service/orderResult', query:[JSON.stringify(table.w)] })
          }
        }
      }).finally(()=>{ this.isload=false })
      
    },
    handleClick1(obj){
 this.orderTypeText=obj.text
          this.postData.orderType=obj.id
           this.isShowPopup1=false
    },
    handleClick2(obj){
        this.auditStatusText=obj.text
          this.postData.auditStatus=obj.id
           this.isShowPopup2=false
    },
    handleClick3(obj){
     this.statusText=obj.text
          this.postData.status=obj.id
          this.isShowPopup3=false
    },
    initDate(){
     if (!this.postData.startDate) {
        this.postData.startDate = this.format(new Date(), 'yyyy-MM-dd')
      }
      if (!this.postData.endDate) {
        this.postData.endDate = this.format(new Date((new Date / 1000 ) * 1000), 'yyyy-MM-dd')
      }
      let arr = this.postData.startDate.split("-")
      this.fromDate = arr[0] + "年" + arr[1] + "月" + arr[2] + "日"
      this.commonFromDate = new Date(arr[0], arr[1] - 1, arr[2])
      this.toObj.minDate = new Date((this.commonFromDate / 1000 ) * 1000)
      
      let nextArr = this.postData.endDate.split("-")
      this.toDate = nextArr[0] + "年" + nextArr[1] + "月" + nextArr[2] + "日"
      this.commonToDate = new Date(nextArr[0], nextArr[1] - 1, nextArr[2])

     
    },
    changeDate(num) {
      console.log(1)
      if (num == 0) {
        this.fromDatePicker = true
        this.toDatePick = false
      } else {
        this.fromDatePicker = false
        this.toDatePick = true

      }

      this.dateIndex = num

    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value;

    },
     format(time, format) {
      var t = new Date(time);
      var tf = function(i) {
        return (i < 10 ? '0' : '') + i
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
          case 'yyyy':
            return tf(t.getFullYear());
            break;
          case 'MM':
            return tf(t.getMonth() + 1);
            break;
          case 'mm':
            return tf(t.getMinutes());
            break;
          case 'dd':
            return tf(t.getDate());
            break;
          case 'HH':
            return tf(t.getHours());
            break;
          case 'ss':
            return tf(t.getSeconds());
            break;
        }

      })

    },
  comfirmDate(){
      
        this.postData.startDate =this.format(this.commonFromDate, 'yyyy-MM-dd')
        this.postData.endDate = this.format(this.commonToDate, 'yyyy-MM-dd')
          let fromArr = this.postData.startDate.split("-")
        let toArr = this.postData.endDate.split("-")

        this.auditDateText=fromArr[0] + "年" + fromArr[1] + "月" + fromArr[2] + "日 至 " + toArr[0] + "年" + toArr[1] + "月" + toArr[2] +"日"
       this.isDate=false
   
  },
 fromDateChange(value) {

      let arr = this.format(this.commonFromDate, 'yyyy-MM-dd').split("-")
      this.fromDate = arr[0] + "年" + arr[1] + "月" + arr[2] + "日"
      this.toObj.minDate = new Date((this.commonFromDate / 1000 ) * 1000)
      
      if (this.commonFromDate >=this.commonToDate) {

        this.commonToDate = new Date((this.commonFromDate / 1000 ) * 1000)
        let nextArr = this.format(this.commonToDate, 'yyyy-MM-dd').split("-")

        this.toDate = nextArr[0] + "年" + nextArr[1] + "月" + nextArr[2] + "日"
      }

    },
    toDateChange(value){
          
let arr = this.format(this.commonToDate, 'yyyy-MM-dd').split("-")
      this.toDate = arr[0] + "年" + arr[1] + "月" + arr[2] + "日"
      



    }
  }
  }
  </script>
  <style lang="scss" scoped>
  .order {
   width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
   padding: 0.2rem 0.3rem;
   padding-top: 1.08rem;
   box-sizing: border-box;
   .content{
     background: #fff;
     padding: 0.1rem 0.3rem 0.4rem;
   }
   .btn {
      width: 2.6rem;
      height: 0.7rem;
      background: linear-gradient(
        45deg,
        rgba(237, 108, 0, 1),
        rgba(243, 152, 0, 1)
      );
      border-radius: 0.35rem;
      text-align: center;
      color: #fff;
      margin: auto;
      font-size: 0.3rem;
      line-height: 0.7rem;
      margin-top: 0.35rem;
    }
  }
  </style>
  <style type="text/css" lang="scss">
.van-popup {
  

    .MadePicktitle {
        height: 0.88rem;
        background: #EEEEEE;
        display: flex;
        display: -webkit-box;
        /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;
        /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;
        /* 混合版本语法: IE 10 */
        display: -webkit-flex;
        position: relative;
        line-height: 0.88rem;
        font-size: 0.28rem;
        .item {
            width: 2.2rem;
            margin-right: 0.3rem;
            margin-left: 0.24rem;
        }
        .MadePickComfirm {
            font-size: 0.28rem;
            color: #333333;
            position: absolute;
            right: 0.24rem;
            line-height: 0.88rem;
        }
        .MadePickLine {
            position: absolute;
            bottom: 0;
            height: 0.02rem;
            width: 2.2rem;
            background: #666666;
            left: 0.22rem;
            transition: 0.5s;
        }
    }
}
</style>