<template>
  <div class="search">
    <Header leftIcon="back" titleColor="#333" title="店铺查询" bg="#F6F6F6" rightIcon="shop"  rightText="附近的店" @cb="go"/>
    <div class="bg"></div>
    <div class="content">
      <div class="contentBox">
        <Item icon="region" title="所在地区" :isRequire="role==2?true:false" placeholder="请选择省/市/区/镇" :value="regionIdText" type="select" @showArea="getRegionList"/>
        <Item  icon="address" :value="streetIdText" :isRequire="role==2?true:false" :regionId="postData.regionId" title="详细地址"   placeholder="请选择" type="select" @showDetails="showDetails"/>
        <Item icon="shop" title="店铺状态" :value="statusText" :isRequire="false" placeholder="请选择" type="select" v-if='role==1' @showStatus="showStatus"/>
      </div>
      <div class="warning" v-if='typeof(nonoperation)==="number" && nonoperation>0'>
        <div class="icon"></div>
        <span >该区域共有 {{nonoperation}}家店铺暂未营运</span>
      </div>
      <div class="contentBox" style="margin-top:0.3rem;" v-if='role==1'>
        <Item icon="person" title="馆主姓名" :isRequire="false" placeholder="请输入" type="input" inputType="text" v-model="postData.userName"/>
        <Item icon="phone" title="馆主电话" :isRequire="false" placeholder="请输入" type="input" inputType="tel" v-model="postData.mobile"/>
        <Item icon="shop" title="店铺编号" :isRequire="false" placeholder="请输入" type="input" inputType="text" v-model="postData.shopSn"/>
         <Item icon="phone" title="店铺电话" :isRequire="false" placeholder="请输入" type="input" inputType="tel" v-model="postData.phone"/>
          
      </div>
      <div class="btn" @click="checkShop">查询</div>
    </div>
     <Pop  
      title="温馨提示" 
      type="alert" 
      contentText="亲爱的家人，您好！本次查询结果仅作为借力使用，不作为店铺审核依据，谢谢！"
      alertText="我已知悉"
      @alert="alert"
      
      v-if="show"
      /> 
      <van-popup v-model="isShowPopup1" position="bottom">
        <mt-picker value-key='name' :slots="slots" @change="areaPickerChange" showToolbar>
          <slot>
            <div class='van-hairline--top-bottom van-picker__toolbar'>
              <div @click='handleClick1(0)' class='van-picker__cancel'>取消</div>
              <div @click='handleClick1(1)' class='van-picker__confirm'>完成</div>
            </div>
          </slot>
        </mt-picker>
      </van-popup>
      <van-popup v-model="isShowPopup2" position="bottom">
        <van-picker show-toolbar :columns="areaDetailPicker" @confirm="handleClick2($event,1)" @cancel='isShowPopup2=false'/>
      </van-popup>
      <van-popup v-model="isShowPopup3" position="bottom">
        <van-picker show-toolbar :columns="shopStatusPicker" @confirm="handleClick3($event,1)" @cancel='isShowPopup3=false'/>
      </van-popup>
  </div>
</template>
  <script>
  import { Picker } from 'mint-ui';
import {Toast} from 'vant' ;
export default {
  components: {
    Item: () => import("./components/item"),
    "mt-picker":Picker
  },
  data(){
    return {
      role:"",
      isShowPopup1:false,
          isShowPopup2:false,
          isShowPopup3:false,
          shopStatusPicker:[
        { text:'营业', id:1, },
        { text:'未营业', id:2, },
        { text:'不对外', id:3 }
      ],
          areaDetailPicker:[],
          nonoperation:"",
          slots: [{
        flex: 1,
        values: [],
        defaultIndex:0,
        className: 'slot1',
        textAlign: 'center'
      }, {
        divider: true,
        content: '',
        className: 'slot2'
      }, {
        flex: 1,
        values: [],
        defaultIndex:0,
        className: 'slot3',
        textAlign: 'center'
      }, {
        divider: true,
        content: '',
        className: 'slot4'
      }, {
        flex: 1,
        values: [],
        defaultIndex:0,
        className: 'slot5',
        textAlign: 'center'
      }],
      selectArea: [],
      regionIdText:"",
      streetIdText:"",
      statusText:"",
          name:"",
          phone:"",
          tel:"",
          number:"",
          show:false,
          postData:{
        regionId:'',        // 地区编号
        streetId: '',       // 街道编号
        shopStatus:'',
        userName:'',
        mobile:'',
        shopSn:'',
        phone:'',
      },
      isload:false
    }
  },
  watch:{
     'tel'(a,b){
       console.log(a)
     }
  },
  created(){
      if(!localStorage.getItem("firstSearch")){
        this.show=true
      }
      this.role = (JSON.parse(localStorage.getItem('zm_user'))||{}).type

      console.log(this.role)
  },
  beforeRouteLeave(to,from,next){
    if(this.$loading){
      this.$loading.clear()
    }
    next()
  },
  methods:{
    regFn(){
      if (this.role==1) {
        for (let k in this.postData){
          let item=this.postData[k]
          if (item!=='') {
            return true
            break;
          }
        }
        Toast({
          message:'必须选择一项再查询',
          duration: 4000
        })
        return false
      }else if(this.role==2) {
        if (!this.postData.regionId || !this.postData.streetId) {
          Toast({
            message:'必须选择地区与详细地址',
            duration: 4000
          })
          return false
        }
        return true
      }
    },
    checkShop(){
      if(!this.regFn())
        return
      if(this.isload)
        return
      this.isload=true
      var a=0,
       p = {
        regionId:this.postData.regionId,
        streetId:this.postData.streetId  // 测试店铺列表
      }
      if (this.role==1){
        p.userName=this.postData.userName
        p.mobile=this.postData.mobile
        p.shopSn=this.postData.shopSn
        p.shopStatus=this.postData.shopStatus
        p.phone=this.postData.phone
      }
      else if(this.role==2){ }
      localStorage.setItem('zm_shopRecord',
      JSON.stringify({ postData:p, streetIdText:this.streetIdText, regionIdText: this.regionIdText }))
      this.$router.push({ name:'/service/result',query:[JSON.stringify({a:a,table:p})] })
      this.isload=false
    },
    handleClick3(obj){
        this.postData.shopStatus=obj.id
        this.statusText=obj.text
         this.isShowPopup3=false
    },
    showStatus(){
    this.isShowPopup3=true
    },
    showDetails(){
      var a=2,
        table={
          w:{}
        }
        this.$loading()
      table.w.regionId=this.postData.regionId
      
      this.$Api.getShopList(a,table).then(res=>{
       
        
        let q=res.q
        if(q.s==0){
          q.address.forEach(item=>{ item.text=item.name })
          console.log(q.address)
          if (!q.address || !q.address.length) {
            let p = table.w
            this.$router.push({ name:'/service/result',query:[JSON.stringify({a:0,table:p})] })
            return
          }
          this.$loading.clear()
          this.areaDetailPicker=q.address
          this.nonoperation=q.nonoperation
          this.isShowPopup2=true
          console.log(this.nonoperation)
        }
      }).finally(()=>{
        
      })


    },
    handleClick2(obj){
        
     this.streetIdText=obj.text
        this.postData.streetId=obj.id
        this.isShowPopup2=false
    },
    areaPickerChange(picker,values){
      this.selectArea=values
      this.renderArea(2,picker,values)
    },
    getRegionList(){
        
        let areaTime=localStorage.getItem('zm_areaTime')||0 ,
          areaList=localStorage.getItem('zm_areaList')
        if(areaList && areaTime && (new Date().getTime()-parseInt(areaTime))<1000*60*60*24/12) {
          this.renderArea(1,null,JSON.parse(areaList))
          return
        }
        this.$loading()
        this.$Api.getRegionList(0,0).then(res=>{
          // console.log(res)
          let q=res.q
          if(q.s==0){
            console.log(JSON.stringify(res.q.items))
            res.q.items[1].childs[0].name=' '+res.q.items[1].childs[0].name+' '
            
            this.renderArea(1,null,res.q.items)
            localStorage.setItem('zm_areaList',JSON.stringify(res.q.items))
          }
          localStorage.setItem('zm_areaTime',new Date().getTime())
        }).finally(()=>{
          this.$loading.clear()
        })
     
    },
    renderArea(status,picker,obj={}) {
      if(status==1) {
        // obj.unshift({name:'请选择省份',childs:[{name:'请选择城市',childs:[{name:'请选择地区'}]}]})
        this.$set(this.slots[0],'values',obj)
        this.$set(this.slots[2],'values',obj[0].childs)
        this.$set(this.slots[4],'values',obj[0].childs[0].childs)
        this.isShowPopup1=true
      } 
      if (status==2) {
        picker.setSlotValues(1, obj[0].childs)
        let town = []
        if(obj[1])
          town = obj[1].childs
        picker.setSlotValues(2,town)
        
      }
    },
    handleClick1(status) {
      if(status==1){
        let temp=[]
        let obj = this.selectArea
        for(let i=0;i<obj.length;i++){
          temp.push(obj[i].name)
        }
        console.log(temp)
        this.getArea(obj,temp)
        this.isShowPopup1=false
        return
        
        this.checkDetailAreaOrLatelyShop()  // 查询详细地址 a=2
        this.isShowPopup1=false
      } else if(status==0) {
        this.isShowPopup1=false
      } 
    },
    getArea(obj,temp){
        this.streetIdText=''  // 清空原详细地址文本
        this.postData.streetId=''  // 清空原详细地址参数
        this.postData.regionId=obj[obj.length-1].id  // 输出区域代号
        this.regionIdText=temp.join(' ')  // 输出区域字符串
       
    },
     alert(){
            this.show=false
            localStorage.setItem("firstSearch",1)
     },
     go(){
      this.$router.push({
        path:"/service/result",
        query:[JSON.stringify({a:1})]
      })
    }
  }
};
</script>
  <style lang="scss" scoped>
.search {
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

    .contentBox {
      width: 6.9rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      margin: auto;
      padding: 0.1rem 0.3rem 0.5rem;
      box-sizing: border-box;
    }
    .warning {
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      .icon {
        width: 0.24rem;
        height: 0.24rem;
        background: url("../../assets/service_icon_attention@3x.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 0.1rem;
      }
      span {
        font-size: 0.26rem;
        color: #666666;
      }
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
<style lang="scss">
 .search{
   .van-hairline--top-bottom::after {
    border-width: 1 !important;
}
.van-hairline--top-bottom{
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}
 }
</style>

  