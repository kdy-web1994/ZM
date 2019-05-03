import Vue from 'vue'

let base = {}

/* 时间格式化 */

Date.prototype.Format = function (fmt) {
  if (!fmt)
    fmt = "yyyy-MM-dd HH:mm:ss";
  var date = this;
  var o = {
    "M+": date.getMonth() + 1, //月份         
    "d+": date.getDate(), //日         
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
    "H+": date.getHours(), //小时         
    "m+": date.getMinutes(), //分         
    "s+": date.getSeconds(), //秒         
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度         
    "S": date.getMilliseconds() //毫秒         
  };
  var week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
  }
  if (/(z+)/.test(fmt)) {
    var date2 = new Date(date.getFullYear(), 0, 1),
      day1 = date.getDay() || 7,
      day2 = date2.getDay() || 7;
    fmt = fmt.replace(RegExp.$1, Math.ceil(Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000) / 7) + 1);
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k].toString()) : (("00" + o[k].toString()).substr(("" + o[k].toString()).length)));
    }
  }
  return fmt;
}
//#endregion


// 随机生成字符串 len:长度
base.randomString = (len) => {　　
  len = len || 32;
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let maxPos = $chars.length;
  let pwd = '';　　
  for (let i = 0; i < len; i++) {　　　　
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
  }　　
  return pwd;
}

base.Format = function (str, fmt) {
  if (!str || !fmt)
    return str

  var date = new Date(Date.parse(new Date(str)) || Date.parse(new Date(str.replace(/-/g,'/') )))

  var o = {
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "h+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// 批量拼接图片的域名前缀
// imgName为字符串, 图片key名
base.pinImgPrefix = (imgList, imgName) => {
  if (!imgList) return imgList
  if ('string' == typeof (imgList)) {
    if (imgList.indexOf('http') == 0)
      return imgList
    if (imgList[0] == '/') {
      imgList = imgList.slice(1)
    }
    return Vue.prototype.$imgUrl + '/' + imgList
  }
  if ('object' == typeof (imgList) && imgName) {
    for (let i = 0; i < imgList.length; i++) {
      let imgPath = imgList[i][imgName]
      if (imgPath.indexOf('http') == 0)
        continue
      if (imgPath[0] == '/') {
        imgPath = imgPath.slice(1)
      }
      imgPath = Vue.prototype.$imgUrl + '/' + imgPath
      imgList[i][imgName] = imgPath
    }
    return imgList
  }
}

// 批量时间格式化 
// format为时间格式字符串, 如: yyyy-MM-dd hh:mm:ss
base.timeFormat = (dateList, dateName, format) => {
  if (!dateList || !format) return dateList
  if ('string' == typeof (dateList))
    return base.Format(dateList, format)

  if ('object' == typeof (dateList) && dateName) {
    for (let i = 0; i < dateList.length; i++) {
      let time = dateList[i][dateName]
      time = base.Format(time, format)
      dateList[i][dateName] = time
    }
    return dateList
  }
}

base.getBase64 = (file, callback) => {
  var maxWidth = 640;
  if (file.files && file.files[0]) {
    var thisFile = file.files[0];
    if (thisFile.size > 2019200) {
      // mualert.alertBox("图片不能超过800K");  
      alert("图片不能超过2M");
      return
    };
    var reader = new FileReader();
    reader.onload = function (event) {
      var imgUrl = event.target.result;
      var img = new Image();
      img.onload = function () {
        var canvasId = 'canvasBase64Imgid',
          canvas = document.getElementById(canvasId);
        if (canvas != null) {
          document.body.removeChild(canvas);
        }
        var canvas = document.createElement("canvas");
        canvas.innerHTML = 'New Canvas';
        canvas.setAttribute("id", canvasId);
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
        canvas.width = this.width;
        canvas.height = this.height;
        var imageWidth = this.width,
          imageHeight = this.height;
        if (this.width > maxWidth) {
          imageWidth = maxWidth;
          imageHeight = this.height * maxWidth / this.width;
          canvas.width = imageWidth;
          canvas.height = imageHeight;
        }
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, imageWidth, imageHeight);
        context.drawImage(this, 0, 0, imageWidth, imageHeight);
        var base64 = canvas.toDataURL('image/png', 1);
        var imgbase = base64.substr(22);
        callback(imgbase)
        //this.imgUrl =   
      }
      img.src = imgUrl;
    }
    reader.readAsDataURL(file.files[0]);
  }
}
// 数组去重复
Array.prototype.distinct =  (arr)=>{
  let obj = {},
    result = []
  for(let i=0; i< arr.length; i++){
    if(!obj[arr[i]]){
      obj[arr[i]] = 1
      result.push(arr[i])
    }
  }
  return result
}

export default base
