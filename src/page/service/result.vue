<template>
  <div class="result">
    <Header leftIcon="back" titleColor="#333" title="店铺查询" bg="#F6F6F6"/>
    <div class="bg"></div>
    <div class="content">
      <resultItem v-for='item in List' :key='item.id' :isOpen="true" :item="item" :More="true" @map="map"/>
     
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
      user: JSON.parse(localStorage.getItem('zm_user')),
      List:[],
      action:0,    // 当前查询模式
      isload:false,
      isend: false,
      postData0:{  // 普通查询参数
        pa: 0,
        li: 10,
        ob: 2,
        ot: 2,
      },
      postData1:{  // 附近店铺参数
        longitude:'',
        latitude:'',
        pa: 0,
        li: 10,
        ob: 2,
        ot: 2,
      },
      qsCode: null,
		}
	},
	computed:{
		pageQuery(){
			return JSON.parse(this.$route.query[0])   // 接收 a=0店铺列表参数组, a=1附近店铺参数组
		}
	},
	mounted(){
    this.getLastPageParams()
	},
	methods:{
	  map(arr){
    this.checkMap(arr)
    },
    // 初始化参数整理-查询
    getLastPageParams(){
      this.action=this.pageQuery['a']
      if (Number(this.action)===0) {
        this.postData0=Object.assign(this.postData0,this.pageQuery['table'])
        this.checkShop()
      }
      if (Number(this.action)===1) {
        this.getLocation(this.checkShop)
      }
    },
    // 普通查询/ a=0 查询最近店铺/ a=1 通用函数
    checkShop(){
      let a=this.action,
        table={
          pa: this.postData0.pa+1,
          li: this.postData0.li,
          ob: this.postData0.ob,
          ot: this.postData0.ot,
          w:{}
        }
      if(a==0){
        table.w.regionId=this.postData0.regionId
        table.w.streetId=this.postData0.streetId
        table.w.userName=this.postData0.userName
        table.w.mobile=this.postData0.mobile
        table.w.shopSn=this.postData0.shopSn
        table.w.shopStatus=this.postData0.shopStatus
        table.w.phone=this.postData0.phone
      }
      if(a==1){
        table.w.longitude=this.postData1.longitude
        table.w.latitude=this.postData1.latitude
      }
      this.isload=true
      this.$Api.getShopList(a,table).then(res=>{
        console.log(res)
        let q=res.q
        this.qsCode=q.s
        if(q.s==0){
          q.shops.forEach(item=>{ item.phone=item.phone.split('/') })
          if(a==0){
            this.postData0.pa+=1
            if (this.postData0.pa>=Math.ceil(q.total/this.postData0.li))
              this.isend=true
          }
          if(a==1){
            this.postData1.pa+=1
            if (this.postData1.pa>=Math.ceil(q.total/this.postData1.li))
              this.isend=true
          }
          q.shops.forEach(item => {  item['shop']={}; item['showAll']=false })
          this.List.push(...q.shops)
        }
      }).finally(()=>{
        this.isload=false
      })
    },
    // 点击查询最近店铺
    checkLatelyShop(){
      this.List=[]
      this.action=1
      this.getLocation(this.checkShop)
    },
		// 获取位置信息
		getLocation(scb,fcb){
      var toast = Toast.loading({ mask:true, message: '定位中..', duration:0})
      new AMap.Map('').plugin('AMap.Geolocation', ()=> {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 5000,
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
          buttonPosition: 'RB',
          GeoLocationFirst: true,
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', (data) => {
          console.log('获取当前位置成功')
          console.log(data)
          toast.clear()
          this.postData1.longitude=data.position.lng
          this.postData1.latitude=data.position.lat
          scb && scb.bind(this)()
        })
        AMap.event.addListener(geolocation, 'error', (data)=> {
          console.log(data)
          toast.clear()
          Toast({
            message: '获取当前位置失败',
            duration: 4000
          })
          fcb && fcb.bind(this)()
        })
      })
    },
    // 检查线路规划
    getDriving(startLngLat,endLngLat){
      AMap.plugin('AMap.Driving', ()=> {
        let driving = new AMap.Driving({
          policy: AMap.DrivingPolicy.LEAST_TIME
        })
        driving.search(startLngLat, endLngLat,  (status, result)=> {
          console.log(result)
          if('string'===typeof(result)){ // 不能规划成功
            this.$router.push({ path:'/service/shopMap',query:[ JSON.stringify([]) , JSON.stringify(endLngLat) ] })
          } else if('object'===typeof(result) && result.info==='OK'){ // 能规划成功
            this.$router.push({path:'/service/shopMap',query:[JSON.stringify(startLngLat),JSON.stringify(endLngLat) ]})
          }
        })
      })
    },
    // 点击查看地图
    checkMap(targetArr){
      let s = ()=>{
        let nowArr=[ this.postData1.longitude, this.postData1.latitude ]
        if(targetArr[0] && targetArr[1]){
          this.getDriving(nowArr,targetArr)
        }else{
          Toast({ message: '未获取的该店铺位置', duration:4000})
        }
      },
      f = ()=>{
        if(targetArr[0] && targetArr[1]){
          this.$router.push({path:'/service/shopMap',query:[JSON.stringify([]),JSON.stringify(targetArr)]})
        }else{
          Toast({ message: '未获取的该店铺位置', duration:4000})
        }
      }
      this.getLocation(s,f)
    },
    // 查询店铺详情
    checkShopDetail(id){
      for(let i=0;i<this.List.length;i++) {
        let item=this.List[i]
        if(item.id==id){
          if(Object.keys(item.shop).length>0){
            item.showAll=!item.showAll
            return
            break
          }
        }
      }
      this.$Api.getShopDetails(0,id).then(res=>{
        console.log(res)
        let q=res.q
        if(q.s==0){
          for(let i=0;i<this.List.length;i++) {
            let item=this.List[i]
            if(item.id==id){
              item.shop=q.shop
              item.showAll=!item.showAll
              break
            }
          }
        }
      })
    }
    
	}
};
</script>
  <style lang="scss" scoped>
.result {
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
  .content {
    position: relative;
    z-index: 10;
    min-height: 100vh;
   padding: 0.2rem 0.3rem;
  padding-top: 1.08rem;
    box-sizing: border-box;
  }
  .bg {
    width: 100%;
    max-width: 700px;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background: url("../../../static/image/serviceBg.png") no-repeat;
    background-size: 100% auto;
    background-position: bottom;
  }
}
</style>
  