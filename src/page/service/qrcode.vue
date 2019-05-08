<template>
  <div class="qrcode">
     <Header leftIcon="back" titleColor="#333" title="签收问卷" bg="#F6F6F6"/>
    <div class="content">
      <div :class="['top',postData.questionnaires[0].answerType===2?'showTop':'hideTop']">
        <p>1. 请问您所收到的包裹，外包装是否完好无损？</p>
        <div class="radioBox">
          <div class="item" @click="change(1)">
            <div class="icon">
            <div class="isSelect" v-show="postData.questionnaires[0].answerType===1"></div>
            </div>
            <span>是</span>
          </div>
          <div class="item" @click="change(2)">
            <div class="icon">
              <div class="isSelect" v-show="postData.questionnaires[0].answerType===2"></div>
            </div>
            <span>否</span>
          </div>
        </div>
           <p style="margin-top:0.5rem">为保障您的权益，请您将包裹破损处的外包装蛇皮袋 、纸箱拍照上传，如有产品破损，请将破损的产品图一并上传，感谢您的配合！</p>
          <div class="imgBox" >
           <div class="item" v-for='(item,index) in postData.questionnaires[0].imageFiles' :key='index'>
             <img :src="item.content" alt="">
             <div class="del" @click="deleteImg(index)"></div>
           </div>
           	<van-uploader class="item add" id="file" name="file" :max-size="5000000" :disabled="postData.questionnaires[0].imageFiles.length>=4" :after-read="addImg" accept="image/*" multiple @oversize='oversize'>
							
								<div class="icon"></div>
							
						</van-uploader>
         
         </div>
         
      </div>
      <div :class="['bottom',postData.questionnaires[1].answerType===2?'showBottom':'hideBottom']" v-show="isoneself==1">
        <p>2. 请问您实收款式及数量是否与出库单实发款式数量一致？</p>
        <div class="radioBox">
          <div class="item" @click="changeBottom(1)">
            <div class="icon">
            <div class="isSelect" v-show="postData.questionnaires[1].answerType===1"></div>
            </div>
            <span>是</span>
          </div>
          <div class="item" @click="changeBottom(2)">
            <div class="icon">
              <div class="isSelect" v-show="postData.questionnaires[1].answerType===2"></div>
            </div>
            <span>否</span>
          </div>
        </div>
         <div class="textarea">
           <div class="title">备注<div class="isRequire"></div>
        </div>
           <textarea  placeholder="请输入"  maxlength="120" v-model="postData.questionnaires[1].notes"/>
             <boxLine />
         </div>
      </div>
       <div class="msg" v-if='postData.questionnaires[0].answerType==2||postData.questionnaires[1].answerType==2'>
          <Item icon="person" title="联系人" :isRequire="true" placeholder="请输入" type="input" inputType="text" v-model="postData.contact"/>
        <Item icon="phone" title="联系电话" :isRequire="true" placeholder="请输入" type="input" inputType="tel" v-model="postData.phone"/>

       </div>
       <div  v-show="isoneself==1" :class="['btn',postData.questionnaires[0].answerType==0||postData.questionnaires[1].answerType==0?'disable':'']" @click="upLoadImg">确认</div>
     <div  v-show="isoneself==2" :class="['btn',postData.questionnaires[0].answerType==0?'disable':'']" @click="upLoadImg">确认</div>
    </div>
    <div class="bg">
        <div class="icon"></div>
    </div>
  </div>
</template>
  <script>
  import {Toast} from 'vant'
  import { Dialog } from 'vant'
  import { ImagePreview } from 'vant'
export default {
  components: {
    Item: () => import("./components/item")
  },
  data() {
    return {
      isoneself:this.$route.query.isoneself,
      name:"",
      phone:"",
      postData:{
				questionnaires:[
					{
						type: 1,
						answerType: "0",
						imageFiles: [],
					},
					{
						type: 2,
						answerType: "0",
						notes: ''
					},
				],
				trackingNumber:'',
				contact:'',   // type=2
				phone:'', 		// type=2
      },
      isload:false
    };
  },
  created(){
       console.log(this.isoneself)
  },
  methods: {
    // 表单检查
		regFn(){
			if (this.postData.questionnaires[0].answerType==1 && this.postData.questionnaires[1].answerType==1) {
				return true
			}
			if (this.postData.questionnaires[0].answerType==2 && !this.postData.questionnaires[0].imageFiles.length) {
				Toast({ message: '请上传图片', duration: 4000 })
				return false
			}
			if (this.postData.questionnaires[1].answerType==2 && !this.postData.questionnaires[1].notes) {
				Toast({ message: '请填写备注', duration: 4000 })
				return false
			}
			if (!this.postData.contact) {
				Toast({ message: '联系人不能为空', duration: 4000 })
				return false
			}
			else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.postData.phone))) {
				Toast({ message: '手机号格式错误', duration: 4000 })
				return false
			}
			return true
    },
    // 删除图片
		deleteImg(index){
			this.postData.questionnaires[0].imageFiles.splice(index,1)
			console.log(this.postData.questionnaires[0].imageFiles)
    },
    // 检测图片尺寸
		oversize(a){
			Toast({ message: '图片不能超过5M', duration: 4000 })
		},
		// 检查图片是否重复
		checkImgIsExit(imageFiles,file){
			for(let i=0;i<imageFiles.length;i++){
				let content=imageFiles[i].content
				if (content==file.content){
					Toast({ message: '请勿重复添加相同图片,忽略本张图片', duration: 1200 })
					return true
					break
				}
			}
			return false
		},
		// 成功添加图片
		addImg(file) {
			console.log(file)
			if('object'===typeof(file) && file.length===undefined)
				file=[file]
			let imageFiles=this.postData.questionnaires[0].imageFiles

			let canAddNum=4-imageFiles.length  // 剩余几张
			if(canAddNum<=0)
				return
			for(let j=0; j<file.length && j<canAddNum; j++){
				let item=file[j]
				if(!item.file.type.length || 'image/gif,image/jpeg,image/jpg,image/png,image/bmp'.indexOf(item.file.type)<0){
					Toast({ message: '当前图片文件类型错误,忽略本张图片', duration: 4000 })
					continue
				}
				if(this.checkImgIsExit(imageFiles,item))
					continue
				this.$set(this.postData.questionnaires[0].imageFiles,imageFiles.length,item)
			}
		},
		// 上传图片
		upLoadImg(){
			if (this.regFn()) {
				if (this.isload) return
				this.isload=true
				let imageFiles=this.postData.questionnaires[0].imageFiles
				let answerType0=this.postData.questionnaires[0].answerType
				if(answerType0==1 || !imageFiles.length) {
					this.submitQuestion()
					return 
				}
				let data = {
					'n': 'Upload',
					's': localStorage.getItem('session'),
					'file[]': imageFiles,
					'q': {}
				}
				let fd = new FormData()
				console.log(fd)
				for (let k in data) {
					if(k=='file[]'){
						for(let i=0;i<imageFiles.length;i++){
							fd.append(k, imageFiles[i].file, imageFiles[i].file.name)
						}
					}else {
						fd.append(k, data[k])
					}
				}
				this.$Api.getUploadImg(fd).then(res=>{
					console.log(res)
					let q=res.q
					let imageUrls=[]
					q.files.forEach(item=>{ imageUrls.push(item.path) })
					this.submitQuestion(imageUrls)
				})
			}
    },
    submitQuestion(imageUrls){
			let p={
				questionnaires:[
					{
						type: this.postData.questionnaires[0].type,
						answerType: parseInt(this.postData.questionnaires[0].answerType),
						imageUrls: imageUrls,
					},
					{
						type: this.postData.questionnaires[1].type,
						answerType: parseInt(this.postData.questionnaires[1].answerType),
						notes: this.postData.questionnaires[1].answerType==2 ? this.postData.questionnaires[1].notes : undefined
					},
				],
				trackingNumber: this.postData.trackingNumber,
				contact: this.postData.contact,
				phone: this.postData.phone
			}
			this.$Api.getPackageStatusUpdate(p).then(res=>{
				console.log(res)
				let q=res.q
				if(q.s==0){
					// Toast({ type:'success', message: q.d, duration: 4000 })
					this.$router.push({
            path:"/qrcodeResult",
            query:{
              text: q.d,
              type:1
            }
          })
				} else {
          	
					Dialog.confirm({
						title: '消息',
						message: q.d,
						className: 'dialog-text-left',
						showCancelButton: false,
						closeOnClickOverlay: true,
					})
				}
			}).finally(()=>{ this.isload=false })
		},
    change(num){
     this.postData.questionnaires[0].answerType=num
    },
    changeBottom(num){
      this.postData.questionnaires[1].answerType=num
    }
  }
};
</script>
  <style lang="scss" scoped>
.qrcode {
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  position: relative;
   padding: 0.2rem 0.3rem;
  padding-top: 1.08rem;
    box-sizing: border-box;
  .content {
    position: relative;
    z-index: 10;
    
    p {
      font-size: 0.26rem;
      margin: 0;
    }

    .radioBox {
      margin-top: 0.4rem;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 0.3rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.2rem;
          background: rgba(238, 238, 238, 1);
          border-radius: 50%;
         display: flex;
         align-items: center;
         justify-content: center;

          .isSelect {
            width: 0.14rem;
            height: 0.14rem;
            background: linear-gradient(
              45deg,
              rgba(237, 108, 0, 1),
              rgba(243, 152, 0, 1)
            );
            border-radius: 50%;
           
          }
        }
        span {
          font-size: 0.26rem;
          color: #666;
        }
      }
      .item:last-child {
        margin: 0;
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
      margin-top: 0.8rem;
    }
    .disable{
      background: #CCCCCC;
    }
    .msg{
       transition: 0.5s;
       padding: 0.1rem 0.3rem 0.5rem;
        background: rgba(255, 255, 255, 1);
         border-radius: 0.1rem;
         margin-top: 0.3rem;
    }
    .top {
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      transition: 0.5s;
      overflow: hidden;
      padding: 0.5rem 0.3rem;
      box-sizing: border-box;
      .imgBox{
        display: flex;
        margin-top: 0.55rem;
        align-items: center;
        .item{
          margin-right: 0.18rem;
          width:1.44rem;
height:1.44rem;
border-radius:0.1rem;
position: relative;
img{
  width: 100%;
  height: 100%;
}
.del{
  position: absolute;
  right: -0.07rem;
  top: -0.15rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius:50%; 
  background: url('../../assets/service_btn_close@3x.png') no-repeat;
  background-size:100% 100%; 
}
        }
        .item:last-child{
          margin-right: 0;
        }
        .add{
             border:2px dashed rgba(238,238,238,1);
             position: relative;
             .icon{
               width: 0.66rem;
               height: 0.66rem;
               position: absolute;
               top: 0;
               left: 0;
               right: 0;
               bottom: 0;
               margin: auto;
               background: url('../../assets/add.png') no-repeat;
               background-size:100% 100%; 
             }
        }
      }
    }
    .showTop {
      height: 6.11rem;
    }
    .hideTop {
      height: 2.58rem;
    }

    .bottom {
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      transition: 0.5s;
      overflow: hidden;
      margin-top: 0.3rem;
      padding: 0.5rem 0.3rem;
      box-sizing: border-box;
      .textarea{
        position: relative;
        height: 1.8rem;
        margin-top: 0.5rem;
        
        display: flex;
        flex-wrap: wrap;
        .title {  
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
        textarea{
          border: none;
          outline: none;
          height: 1.2rem;
          width: 100%;
          font-size: 0.26rem;
          margin-top: 0.1rem;
          padding: 0.1rem 0;
          box-sizing: border-box;
        }
        textarea::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #cccccc;
      }
      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #cccccc;
      }
      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #cccccc;
      }
      textarea:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #cccccc;
      }
        
      }
    }

    .showBottom {
      height: 5.3rem;
    }
    .hideBottom {
      height: 2.95rem;
    }
  }
  .bg {
    width: 100%;
    max-width: 700px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    .icon{
      width: 6rem;
      height: 4.18rem;
      position: absolute;
      bottom: 0.4rem;
      left: 0.8rem;
       background: url("../../../static/image/service_bg_order@3x.png") no-repeat;
       background-size:100% 100%; 
    }
  
  }
}
</style>
  