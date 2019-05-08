<template>
	<div class="order-check">
		 <Header leftIcon="back" titleColor="#333" title="订单及发货详情" bg="#F6F6F6"/>
          <div class="message">
            <div class="item">
                <div class="person"></div>
                <span>收件人：陈爽</span>
            </div>
            <div class="item">
                <div class="phone"></div>
                <span>联系电话：18919890622</span>
            </div>
            <div class="item">
                <div class="address"></div>
                <span>收件地址：广州市荔湾区荔湾路89号骏丰大厦0622室</span>
            </div>
          </div>
          <div class="mailBox" v-if='sys=="ERP"'>
            
            <div class="item" v-for='(item,index) in invoiceList.logistics' :key='index' @click='go(item.trackingNumber)'>
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

           <div class="mailBox" v-if='sys=="EC"'>
            
            <div class="item"  @click='go(invoiceList.logistics.trackingNumber)'>
               <div class="box">
                 <div class="left">
                   <p>{{invoiceList.logistics.name+"："+invoiceList.logistics.trackingNumber}}</p>
                   <p>{{invoiceList.logistics.invoiceDate}}</p>
                 </div>
                  <div class="icon"></div>
               </div>
              <boxLine/>
            </div>
            
          </div>





           <orderItem :arr="invoiceList.goodses" />
	</div>
</template>

<script>

export default {
  data() {
    return {
			invoiceList:{}
    }
    },
     components:{
       orderItem:()=>import('./components/orderItem')
     },
	computed:{
		sys(){
			return this.$route.query.sys  // [0]: 系统名 
		},
		pageParam(){
			return this.$route.query.id// [1]: id 发货单或物流单
		}
  },
  beforeRouteLeave(to,from,next){
    to.query['selected']='1'
    next()
  },
	mounted(){
		this.loadInvoiceList()
	},
  methods: {
      go(num){
        this.$router.push({
            path:"/service/logisticsdetail",
            query:{
                num
            }
        })
      },
		loadInvoiceList(){
			let id=this.pageParam	
			if(this.sys=='EC'){
				this.$Api.getInvoiceDetails_EC(id).then(res=>{
					console.log(res)
					let q=res.q
					if(q.s==0){
						q.invoice.logistics.invoiceDate=this.$base.timeFormat(q.invoice.logistics.invoiceDate,'','yyyy-MM-dd')
						this.invoiceList=q.invoice
					}
				})
			} else if(this.sys=='ERP') {
				this.$Api.getInvoiceDetails_ERP(id).then(res=>{
					console.log(res)
					let q=res.q
					if(q.s==0){
						q.invoice.logistics=this.$base.timeFormat(q.invoice.logistics,'invoiceDate','yyyy-MM-dd')
            if (q.invoice.logistics.length===undefined)
              q.invoice.logistics=[q.invoice.logistics]
						this.invoiceList=q.invoice
					}
				})
			}
			
		}
	}
	
}
</script>


<style scoped lang="scss">
.order-check{
    padding-top: 1.08rem;
     min-height: 100vh;
     background: #F6F6F6;
     .message{
         width: 6.9rem;
         background: #fff;
         padding: 0.4rem 0.3rem;
         box-sizing: border-box;
         margin: auto;
         border-radius:.1rem;
         .item{
             display: flex;
             align-items: center;
             margin-bottom: .2rem;
             .person{
                 width: .32rem;
                 height: .32rem;
                 background: url('../../assets/service/service_icon_person_orange@3x.png') no-repeat;
                 background-size:100% 100%;
                 margin-right: .12rem; 
             }
             .phone{
                  width: .32rem;
                 height: .32rem;
                 background: url('../../assets/service/service_icon_phone_orange@3x.png') no-repeat;
                 background-size:100% 100%;
                 margin-right: .12rem; 
                
             }
              .address{
                  width: .32rem;
                 height: .32rem;
                 background: url('../../assets/service/service_icon_location@3x.png') no-repeat;
                 background-size:100% 100%;
                 margin-right: .12rem; 
                
             }
         }
         .item:last-child{
             align-items: flex-start;
             margin: 0;
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
}
</style>
