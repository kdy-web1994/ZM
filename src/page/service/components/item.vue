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
    
  </div>
</template>
  <script>
  import {Toast} from 'vant' ;
export default {
  props: ["placeholder", "type", "title", "isRequire", "icon", "inputType","value","regionId"],
  data(){
    return {
          

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
        this.$emit("showArea")
        
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
  