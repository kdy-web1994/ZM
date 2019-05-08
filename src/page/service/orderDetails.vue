<template>
    <div class="orderDetails">
      <Header leftIcon="back" titleColor="#333" title="订单及发货详情" bg="#F6F6F6"/>
       <div class="tabBar">
      <div :class="['item',index==0?'active':'']" @click="change(0)">订单明细</div>
      <div :class="['item',index==1?'active':'']" @click="change(1)" style="margin-left:1.54rem;">已发货</div>
      <div :class="['item',index==2?'active':'']" @click="change(2)" style="margin-left:1.54rem;">未发货</div>
      <div class="line" :style="[{'left':index==0?' 1.22rem':index==1?'3.68rem':'6rem'}]"></div>
    </div>
       <div v-if="index==0&&productList" class="itemBox" >
         <orderItem :arr="productList.goodses" />
       </div>
       <div v-if="index==1&&(orderType===0||sendList)" class="itemBox">
          <div v-if='productList.status==0 && productList.auditStatus==2' class="order-prompt">
            <div v-if='orderIsInvalid'>亲爱的家人，该订单已发货完成，由于已超出物流追溯期，现无法查询到物流单号，请您谅解！</div>
            <div v-else>
              <div v-if='orderType!=0 && !sendList.length'>亲爱的家人，该订单正在配货中，请您耐心等待，谢谢！</div>
              <div v-else></div>
            </div>
          </div>
          <div v-if='productList.status==0 && productList.auditStatus==1' class="order-prompt">
            亲爱的家人，该订单已保存，等待完成支付。
          </div>
          <div v-if='productList.status==1' class="order-prompt">
            亲爱的家人，您好！该订单已取消。
          </div>
          <div class="mailBox" v-if='productList.status==0 && productList.auditStatus==2 && !orderIsInvalid && sendList'>
            
            <div class="item" v-for='(item,index) in sendList' :key='index' @click='go(item)'>
               <div class="box">
                 <div class="left">
                   <p>{{item.logistics.name+'：'+item.logistics.id}}</p>
                   <p>{{item.invoiceDate}}</p>
                 </div>
                  <div class="icon"></div>
               </div>
              <boxLine/>
            </div>
            
          </div>
       </div>
      <div v-if="index==2" class="itemBox">
        
        <div v-if='productList.status==0 && productList.auditStatus==2' class="order-prompt">
            <div v-if='orderIsInvalid'>亲爱的家人，该订单没有未发商品。</div>
            <div v-else>
              <div v-if='orderType!=0 && !notSendList.length'>亲爱的家人，该订单没有未发商品。</div>
              <div v-else></div>
            </div>
          </div>
          <div v-if='productList.status==0 && productList.auditStatus==1' class="order-prompt">
            亲爱的家人，该订单已保存，等待完成支付。
          </div>
          <div v-if='productList.status==1' class="order-prompt">
            亲爱的家人，您好！该订单已取消。
          </div>
         <orderItem :arr="notSendList" v-if='productList.status==0 && productList.auditStatus==2 && !orderIsInvalid && notSendList&&(orderType===0||notSendList)'/>
       </div>
        <div class="bg">
      <div class="icon"></div>
    </div>
    </div>
  </template>
  <script>
  export default {
     components:{
       orderItem:()=>import('./components/orderItem')
     },
     data(){
       return {
        
         index:0,
          productList: null,
      productTotal:0,
      sendList:null,
      notSendList:null,
      notSendTotal:0,
      orderType: null,
      orderIsInvalid: false
       }
     },
     computed:{
    pageParam(){
      return this.$route.query  // [0]:orderId  [1]:orderSn
    },
    pageQuery(){
      return this.$route.query['selected']  // selected
    }
    },
    created(){
          this.index = this.pageQuery || "0"
          this.loadProductList()
    },
     methods:{
       go(obj){
         if(obj.sys=="EC"){
           this.$router.push({
             path:"/service/invoicedetail",
             query:{
               sys:"EC",
               id:obj.id
             }
           })
         }else if(obj.sys=="ERP"){
           this.$router.push({
             path:"/service/invoicedetail",
             query:{
               sys:"ERP",
               id:obj.logistics.id
             }
           })
         }
      
       },
       change(num){
         console.log(num)
         this.index=num
       },
       loadProductList(){
      let orderId=this.$route.query.id
      this.$Api.getOrderDetails(orderId).then(res=>{
        console.log(res)
        let q=res.q
        if(q.s==0){
          try{
            this.orderIsInvalid=(Date.parse(new Date(q.order.auditDate))||Date.parse(new Date(q.order.auditDate.replace(/-/g,"/"))))<=1398873600000 // 1398873600000 2014-05-01
          }catch(e) { console.log('auditStatus:'+q.order.auditStatus ,'status:'+q.order.status,'orderIsInvalid不准确') }
          this.productTotal=q.goodsTotal
          this.productList=q.order
          this.getHouse((orderType)=>{ this.loadInvoiceList(1,orderType);this.loadInvoiceList(2,orderType) })
        }
      })
    },
    // 获取仓库个数
    getHouse(cb){
      let fn = this.productList.freightNumber
      let orderType=0,arr=[]
      fn.forEach(item=>{ arr.push(item.wareHouseNo) })
      arr = arr.distinct(arr)
      if(arr.length==1){
        orderType = arr[0].toLocaleLowerCase()!=='td001' ? 1 : 2
      } else if(arr.length>1) {
        orderType =3
      }
      this.orderType = orderType
      console.log(orderType)
      cb && cb(orderType)
    },
    // 加载发货列表 status=1 status=2   orderType=1 ec orderType=2 erp orderType=3 ec+erp
    loadInvoiceList(status,orderType){
      var table={
          pa:1,    // 此处不建议做分页
          li:2000,   // 此处不建议做分页
          ob:1,
          ot:2,
          w:{
            orderSn: this.$route.query.orderSn,
            status: status
          }
        }
      // 已发货
      if (status==1){
        // 只存在EC仓库
        if(orderType==1){
          this.$Api.getInvoiceList_EC(table).then(res=>{
            let q=res.q
            if(q.s==0){
              q.invoices.forEach(item=>{ item['sys']='EC' })
              q.invoices=this.$base.timeFormat(q.invoices,'invoiceDate','yyyy-MM-dd')
              this.sendList=q.invoices
            }
          })
        }
        // 只存在ERP仓库
        if(orderType==2){
          this.$Api.getInvoiceList_ERP(table).then(res=>{
            let q=res.q
            if(q.s==0){
              q.invoices.forEach(item=>{ item['sys']='ERP' })
              q.invoices=this.$base.timeFormat(q.invoices,'invoiceDate','yyyy-MM-dd')
              this.sendList=q.invoices
            }
          })
        }
        // 存在EC ERP仓库
        if(orderType==3){
          Promise.all([this.$Api.getInvoiceList_EC(table),this.$Api.getInvoiceList_ERP(table)]).then(resArr=>{
            console.log('-------------已发货--------------')
            console.log(resArr)
            var q1=resArr[0].q,
              q2=resArr[1].q
              let temp=[]
            if(q1.s==0 && q2.s==0){
              q1.invoices.forEach(item=>{ item['sys']='EC' })
              q2.invoices.forEach(item=>{ item['sys']='ERP' })
              q1.invoices=this.$base.timeFormat(q1.invoices,'invoiceDate','yyyy-MM-dd')
              q2.invoices=this.$base.timeFormat(q2.invoices,'invoiceDate','yyyy-MM-dd')
              temp.push(...q2.invoices,...q1.invoices)
              this.sendList=temp
            }
            console.log(temp)
          })
        }
      } 
      // 未发货
      else if(status==2) {
        // 只存在EC仓库
        if(orderType==1){
          this.$Api.getInvoiceList_EC(table).then(res=>{
            let q=res.q
            if(q.s==0){
              this.notSendList=q.goodses
              this.notSendTotal=q.goodsTotal
            }
          })
        }
        // 只存在ERP仓库
        if(orderType==2){
          this.$Api.getInvoiceList_ERP(table).then(res=>{
            let q=res.q
            if(q.s==0){
              this.notSendList=q.goodses
              this.notSendTotal=q.goodsTotal
            }
          })
        }
        // 存在EC ERP仓库
        if(orderType==3){
          Promise.all([this.$Api.getInvoiceList_EC(table),this.$Api.getInvoiceList_ERP(table)]).then(resArr=>{
            console.log('-------------未发货--------------')
            console.log(resArr)
            var q1=resArr[0].q,
              q2=resArr[1].q
              let temp=[]
            if(q1.s==0 && q2.s==0){
              temp.push(...q1.goodses,...q2.goodses)
              this.notSendList=temp
              this.notSendTotal=q1.goodsTotal+q2.goodsTotal
            }
            console.log(temp)
          })
        }
      }
    }

     }
  }
  </script>
  <style lang="scss" scoped>
  .orderDetails {
   width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
  padding-top: 1.08rem;
  box-sizing: border-box;
  .itemBox{
    position: relative;
    z-index: 10;
  }
  .bg {
    width: 100%;
    max-width: 700px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    .icon {
      width: 5.9rem;
      height: 5.57rem;
      position: absolute;
      bottom: 0.7rem;
      left: 0.8rem;
      background: url("../../assets/Order.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .mailBox{
    background: #fff;
    padding: 0 .3rem;
    padding-bottom: .5rem;
    margin-top: .4rem;

    .item{
           height: 1.6rem;
           position: relative;
           padding-top: .4rem;
           box-sizing: border-box;
           .box{
             display: flex;
             justify-content: space-between;
             align-items: center;
             font-size: .26rem;
             
             p{
               margin: 0;
               font-weight: 400;
             }
             p:last-child{
               margin-top: 0.05rem;
               color: #666;
             }
             .icon{
                width: 0.44rem;
        height: 0.44rem;
        background: url("../../assets/service_icon_arrow@3x.png") no-repeat;
        background-size: 100% 100%;
             }
           }
    }
  }
  .tabBar {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 .81rem ;
    
    z-index: 10;
    box-sizing: border-box;

    .item {
      font-size: 0.26rem;
      height: 0.6rem;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .active {
      font-size: 0.3rem;
      font-weight: 500;
    }
    .line {
      position: absolute;
      bottom: 0;
      left: 1.72rem;
      width: 0.32rem;
      height: 0.1rem;
      background: linear-gradient(
        45deg,
        rgba(237, 108, 0, 1),
        rgba(243, 152, 0, 1)
      );
      border-radius: 0.05rem;
      transition: 0.5s;
    }
  }
  }
  </style>
  