//app.js
var util = require('/util/util.js');
App({
  data:{
    'apiHost':'http://www.eatwith.me/',
    socketOpen:false,
    socketMsgQueue:[],
    socketRevQueue:{}
  },
  util: util,
  window:function(){
     console.log("window");
     var _this=this;
      wx.getSystemInfo({complete:function(res){
          _this.globalData.window=res;
          _this.globalData.window.rpx=750/res.windowWidth;
      }})
  },
  getLocation:function(cb){
    var that = this
    if (this.globalData.userLocation) {
      typeof cb == "function" && cb(this.globalData.userLocation)
    } else {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
            console.log(res);
            that.globalData.userLocation = res;
            typeof cb == "function" && cb(that.globalData.userLocation);
        }
      })
    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    window:{}
  },
  onShow: function() {
    console.log("onshow");
      // Do something when show.
  },
  onHide: function() {
     console.log("onHide");
      // Do something when hide.
  },
  //请求接口
 requestParam:function(url,data,cb){
   var host=this.data.apiHost; 
   var url=host+url;
   var param={};
   var cbf=cb;
   if(typeof(data)=='function'){
     cbf=data; 
   }else if(typeof(data)=='object'){
    param=data;
   }
   param['from_wx_app']=1;
   param['uuid']='wx101';
   param['runThreadKey']='eee50acd6ee441d75ad2b87c9747d09b'; 
   
   return {
     'param':param,
     'url':url,
     'cb':cbf,
   };
 },
 postData:function(url,data,cb){
   var p=this.requestParam(url,data,cb);
   console.log("postData:");
   console.log(p);
   var cbf=p['cb'];
   wx.request({
        url: p['url'], //仅为示例，并非真实的接口地址
        data: p['param'],
        method:'GET',
        header: {
           'Content-Type': 'application/json'
        },
        success: function(res) {
          typeof(cbf)=="function"?cbf(res.data):"";
          console.log(res.data)
        }
    })
 },
  getPageData:function(url,data,cb){
  wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
  });
   var p=this.requestParam(url,data,cb);
   var cbf=p['cb'];
   wx.request({
        url: p['url'], //仅为示例，并非真实的接口地址
        data: p['param'],
        method:'GET',
        header: {
           'Content-Type': 'application/json'
        },
        success: function(res) {
          typeof(cbf)=="function"?cbf(res.data):"";
          console.log(p);
          console.log(res);
           wx.hideToast();
        },
        complete:function(){
           wx.hideToast();
        }
    })
  },
  //上传图片
  uploadFile:function(imgLists,cbf){  
   
    var uploadCount=0;
    var uploadfiles=new Array();
    for(var i in imgLists){
      wx.uploadFile({
        url: this.data.apiHost+'/BoxApi/Index/wxUpload', //
        filePath: imgLists[i],
        name: 'file',
        formData:{
          'user': 'test'
        },
        complete: function(res){
          uploadCount++;
          var data = res.data;
          if(data){
            data=JSON.parse(data);
          }else{
            data={};
          }
          if(data.error==0){
             uploadfiles.push(data.data);
          }
          if(uploadCount==imgLists.length){
               typeof(cbf)=="function"?cbf(uploadfiles):"";
              // console.log(uploadfiles);
          }
        }
      })

    }
    
  },
  alert:function(content){
    wx.showModal({
      title: '提示',
      content: content,
      showCancel:false,
    })
  },
   onLaunch: function (options) {
     //建connectSocket
     this.connectSocket();
     //console.log(options);
    // Do something initial when launch.
     this.window();
     this.getUserInfo(function (userInfo) {
       wx.setStorageSync("user_info", userInfo);
     });
  },

   sendSocketMessage:function(data){
     var data = JSON.stringify(data);
     if (this.data.socketOpen === false) {
       this.data.socketMsgQueue.push(data);
     }else{
       wx.sendSocketMessage({
         data: data
       });
     }
   },

  revMessage(k,fn){
    this.data.socketRevQueue[k] = fn;
  },
   
  //connectSocket
   connectSocket:function(data){
     var that =this;
     wx.connectSocket({
       url: 'ws://127.0.0.1:9501'
     });
     wx.onSocketOpen(function (res) {
       console.log('onSocketOpen');
       that.data.socketOpen = true
       console.log(that.data.socketMsgQueue);
       for (var i = 0; i < that.data.socketMsgQueue.length; i++) {
         wx.sendSocketMessage({
           data: that.data.socketMsgQueue[i]
         });
       }
       that.data.socketMsgQueue = []
     })

     wx.onSocketMessage(function (r) {
       var res = JSON.parse (r.data);
       var key = res.dosometing;
       if (key && that.data.socketRevQueue[key] && typeof (that.data.socketRevQueue[key])=="function"){
         that.data.socketRevQueue[key](res);
       }
      // console.log('收到服务器内容：', res);
     })

     wx.onSocketError(function (res) {
       console.log('WebSocket连接打开失败，请检查！')
     })
   }

})