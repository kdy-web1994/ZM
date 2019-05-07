<template>
  <div class="Item">
    <div class="ItemBox" @click="show">
    <div class="box">
      <div class="top">
        <div :class="['icon',icon]"></div>
        <div class="title">
          {{title}}
          <div class="isRequire" v-if="isRequire"></div>
        </div>
      </div>
      <div class="bottom" v-if="type==='select'">
        <span class="placeholder" v-if="value===''">{{placeholder}}</span>
        <span v-else>{{value}}</span>
        <div class="icon"></div>
      </div>
      <div class="bottom" v-else>
        <input :type="inputType" :placeholder="placeholder" :value="value" @input="$emit('input',$event.target.value)">
      </div>
    </div>
    </div>
    <boxLine />
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
  </div>
</template>
  <script>
  import {Toast} from 'vant' ;
export default {
  props: ["placeholder", "type", "title", "isRequire", "icon", "inputType","value","regionId"],
  data(){
    return {
          isShowPopup1:false,
          isShowPopup2:false,
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

    }
  },
  created(){
    // this.getRegionList()
  },
  destroyed(){
    if(this.$loading){
      this.$loading.clear()
    }
  },
  methods:{
    show(){
      if(this.title==="所在地区"){
        this.getRegionList()
        
      }else if(this.title==="详细地址"){
         if(this.regionId===""){
            Toast({
            message:'请先选择省市区',
            duration: 4000
          })
          return
         }
         this.isShowPopup2=true
      }
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
            this.$loading.clear()
            this.renderArea(1,null,res.q.items)
            localStorage.setItem('zm_areaList',JSON.stringify(res.q.items))
          }
          localStorage.setItem('zm_areaTime',new Date().getTime())
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
        this.$emit("getArea",obj,temp)
        this.isShowPopup1=false
        return
        this.streetIdText=''  // 清空原详细地址文本
        this.postData.streetId=''  // 清空原详细地址参数
        this.postData.regionId=obj[obj.length-1].id  // 输出区域代号
        this.regionIdText=temp.join(' ')  // 输出区域字符串
        this.checkDetailAreaOrLatelyShop()  // 查询详细地址 a=2
        this.isShowPopup1=false
      } else if(status==0) {
        this.isShowPopup1=false
      } 
    }
    
  }
};
</script>
  <style lang="scss" scoped>
.Item {
  height: 1.5rem;
  
  position: relative;
  
  width: 100%;
  .ItemBox{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .box {
    width: 100%;
    .top {
      display: flex;
      align-items: center;
      .title {
        margin-left: 0.1rem;
        position: relative;
        font-size: 0.26rem;
        .isRequire {
          position: absolute;
          right: -0.2rem;
          top: 0;
          width: 0.1rem;
          height: 0.1rem;
          background: linear-gradient(
            45deg,
            rgba(237, 108, 0, 1),
            rgba(243, 152, 0, 1)
          );
          border-radius: 50%;
        }
      }
      .icon {
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
      }
      .region {
        background: url("../../../assets/service/service_icon_city@3x.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .address {
        background: url("../../../assets/service/service_icon_location@3x.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .shop {
        background: url("../../../assets/service/service_icon_store_orange@3x.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .person{
         background: url("../../../assets/service/service_icon_person_orange@3x.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .phone{
         background: url("../../../assets/service/service_icon_phone_orange@3x.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .orderNum{
        background: url("../../../assets/service/service_iconorder__number_orange@3x.png")
          no-repeat;
        background-size: 100% 100%;
      }
     .number{
       background: url("../../../assets/service/service_icon_number_orange@3x.png")
          no-repeat;
        background-size: 100% 100%;
       
     }
      .attribute{
         background: url("../../../assets/service/service_icon_attribute_orange@3x.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .audit{
        background: url("../../../assets/service/service_icon_audit_orange@3x.png") no-repeat;
        background-size: 100% 100%;
      }
      .date{
         background: url("../../../assets/service/service_icon_date_orange@3x.png") no-repeat;
        background-size: 100% 100%;
      }
      .order{
         background: url("../../../assets/service/service_icon_order_orange@3x.png") no-repeat;
        background-size: 100% 100%;
      }

    }
    .bottom {
      margin-top: 0rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .placeholder {
        color: #cccccc;
        font-size: 0.26rem;
      }
      input::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #cccccc;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #cccccc;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #cccccc;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #cccccc;
      }

      .icon {
        width: 0.44rem;
        height: 0.44rem;
        background: url("../../../assets/service_icon_arrow@3x.png") no-repeat;
        background-size: 100% 100%;
      }
      input {
        border: none;
        outline: none;
        width: 100%;
        font-size: 0.26rem;
        height: 0.44rem;
      }
    }
  }
}
</style>
  