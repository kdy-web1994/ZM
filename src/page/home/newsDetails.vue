<template>
    <div class="newsDetails">
      <div class="detailsHeader">
         <div class="left"></div>
         <div class="right">
           <div class="like">
             <div class="icon"></div>
             <div class="num">1</div>
           </div>
           <div class="good">
             <div class="icon"></div>
             <div class="num">11+</div>
           </div>
           <div class="share"></div>
         </div>
      </div>
      <div class="content"></div>
    </div>
  </template>
  <script>
  export default {
    created(){
        
    },
    methods:{
      loadNewsDetail(){
			let id=this.pageParam,
				userId = (JSON.parse(localStorage.getItem('zm_user'))||{}).id||0
			this.$Api.getArticleDetails(0,id,userId).then(res=>{
				console.log(res)
				let q=res.q
				if(q.s==0){
					q.article.imagePath=this.$base.pinImgPrefix(q.article.imagePath)
					this.detail=q.article
					this.shareConfig()
				}
			})
		}
    }
  }
  </script>
  <style lang="scss" scoped>
  .newsDetails {
    min-height: 100vh;
    padding-top: 0.88rem;
    .detailsHeader{
      position: fixed;
      top: 0;
      width: 100%;
      height: .88rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
        .left{
           width: 0.44rem;
       height: 0.44rem;
       background: url("../../assets/common_icon_back@3x.png") no-repeat;
       background-size:100% 100%; 
       position: relative;
       left:-0.1rem;
       margin-left: .3rem;
        }
        .right{
          display: flex;
          align-items: center;
        .like{
          margin-right: .63rem;
          position: relative;
          .icon{  
            width: 0.44rem;
            height: 0.44rem;
            background: url('../../assets/common_icon_heart_normal@3x.png') no-repeat;
            background-size:100% 100%; 
             
          }
          .num{
            width: .8rem;
            height: .44rem;
               position: absolute;
            font-size: 0.36rem;
            text-align: center;
            border-radius: .44rem;
            line-height: .44rem;
            background: #FF2525;
            color: #fff;
            text-align: center;
             transform: scale(.5) translateY(-50%);
             top: 0;
            // top: -0.2rem;
            right: -.6rem;
             }
        }
        .good{
          margin-right: .63rem;
          position: relative;
          .icon{
             width: 0.44rem;
            height: 0.44rem;
            background: url('../../assets/common_icon_like_normal@3x.png') no-repeat;
            background-size:100% 100%; 
          }
          .num{
            width: .8rem;
            height: .44rem;
               position: absolute;
            font-size: 0.36rem;
            text-align: center;
            border-radius: .44rem;
            line-height: .44rem;
            background: #FF2525;
            color: #fff;
            text-align: center;
             transform: scale(.5) translateY(-50%);
             top: 0;
            // top: -0.2rem;
            right: -.6rem;
             }
        }

          .share{
             width: 0.44rem;
       height: 0.44rem;
        background: url("../../assets/common_icon_share@3x.png") no-repeat;
       background-size:100% 100%; 
       position: relative;
       margin-right: .3rem;
       
          }
        }
    } 
  
  }
  </style>
  