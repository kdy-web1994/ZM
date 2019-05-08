<template>
  <div class="conten">
    <Header leftIcon="back" titleColor="#333" title="修改密码" bg="#F6F6F6"/>
    <div class="pass">
      <div class="passbody">
        <div class="inputbox">
          <p class="introduce"><i class="icons serial"></i> 用户编号</p>
          <input class="ipt passwords" v-model="serialnum" @focus="iptfocus()" disabled type="text" placeholder="请输入">
        </div>
        <div class="inputbox">
          <p class="introduce"><i class="icons card"></i> 身份证号码</p>
          <input class="ipt passwords" v-model="idcard" @focus="iptfocus()" type="text" placeholder="请输入">
        </div>
        <div class="inputbox">
          <p class="introduce"><i class="icons old"></i> 旧密码</p>
          <input class="ipt passwords" v-model="oldcipher" @focus="iptfocus()" type="password" placeholder="请输入">
        </div>
        <div class="inputbox">
          <p class="introduce"><i class="icons new"></i> 新密码</p>
          <input class="ipt passwords" v-model="newcipher" @focus="iptfocus()" type="password" placeholder="请输入8位数字及字母">
        </div>
      </div>
      <div class="validation">
        <span v-if="mistake"><span class="warning"></span> {{tips}}</span>
      </div>
      <div class="btn" @click="modification()">确认修改</div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      serialnum: '',
      idcard: '',
      oldcipher: '',
      newcipher: '',
      mistake:false,
      tips:'',
    };
  },
  mounted() {},
  methods: {
      iptfocus(){
        this.mistake = false;
      },
      modification(){
        if(this.idcard==''){
          this.mistake = true;
          this.tips = '身份证不能为空';
          return;
        }
        if(!this.IdCodeValid(this.idcard).pass){
          this.mistake = true;
          this.tips = '身份证错误，请重新输入';
          return;
        }
        if(this.oldcipher==''){
          this.mistake = true;
          this.tips = '旧密码不能为空';
          return;
        }
        if(this.newcipher==''){
          this.mistake = true;
          this.tips = '新密码不能为空';
          return;
        }
        if(this.newcipher==this.newcipher){
          this.mistake = true;
          this.tips = '新密码不能与旧密码相同';
          return;
        }
      },
      IdCodeValid(code){
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var row={
          'pass':true,
          'msg':'验证成功'
        };
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)){
          row={
            'pass':false,
            'msg':'身份证号格式错误'
          };
        }else if(!city[code.substr(0,2)]){
          row={
            'pass':false,
            'msg':'身份证号地址编码错误'
          };
        }else{
          //18位身份证需要验证最后一位校验位
          if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++){
              ai = code[i];
              wi = factor[i];
              sum += ai * wi;
            }
            if(parity[sum % 11] != code[17].toUpperCase()){
              row={
                'pass':false,
                'msg':'身份证号校验位错误'
              };
            }
          }
        }
      return row;
    }
  }
};
</script>

<style lang='scss' scoped>
input {
  outline: none;
  background: transparent;
  border: none;
  outline: medium;
  font-size: 0.3rem;
}
*:focus {
  outline: none;
  background-color: transparent;
}
::selection {
  background: transparent;
}
::-moz-selection {
  background: transparent;
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:#cccccc;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:#cccccc;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:#cccccc;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:#cccccc;
}
.conten{
    background-color: #f6f6f6;
    background-image: url(/static/zmimg/my/my_bg_lock@2x.png);
    background-size: 5.56rem 4.1rem;
    background-repeat: no-repeat;
    background-position: 50% 95%;
    position: relative;
    height: 100%;
    text-align: center;
    font-size: 0.3rem;
    padding-top: 0.88rem;
    box-sizing: border-box;
    h3,p{
        margin: 0;
    }

    .pass{
      padding: 0.3rem;

      .passbody{
        width: 6.9rem;
        height: 7.12rem;
        background-color: #fff;
        border-radius: 0.1rem;
        margin:0 auto;

        .inputbox{
          padding: 0.35rem 0.3rem 0;
          height: 1.45rem;
          color: #333333;
          position: relative;
         

          .introduce{
            text-align: left;
            padding-left: 0.4rem;
            height: 0.5rem;
            line-height: 0.5rem;
            position: relative;
            

            .icons{
              display: inline-block;
              width: 0.38rem;
              height: 0.38rem;
              border-radius: 50%;
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            .serial{
              background-image: url(/static/zmimg/service/service_icon_number_orange@2x.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            .card{
              background-image: url(/static/zmimg/my/my_icon_id@2x.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            .old{
              background-image: url(/static/zmimg/my/my_icon_old_password@2x.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            .new{
              background-image: url(/static/zmimg/my/my_icon_new_password@2x.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
          }

          .ipt{
            padding-bottom: 0.1rem;
            height: 0.71rem;
          }
          .passwords{
              width: 100%;
              border-bottom: 0.04rem solid #f8f8f8;
          }
          
        }
      }
      .validation{
        padding-top: 0.2rem;
        text-align: left;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #666666;

        .warning{
          display: inline-block;
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 50%;
          background-color: #f18a00;
        }
      }
      .btn{
        width: 2.6rem;
        height: 0.7rem;
        line-height: 0.7rem;
        border-radius: 0.7rem;
        background-color: rgba($color: #ed6d00, $alpha: 0.9);
        color: #fff;
        margin: 0.3rem auto 0;
      }
    }
    
}

</style>

