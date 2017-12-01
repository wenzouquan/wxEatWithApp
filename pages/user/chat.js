// pages/user/chat.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[1],
    chatBntRecordText: '按住 说话',
    showChatBntBox: 0,
    toView: 'msgBoxBottom',
    voicePlaying: 0,
    pageY: 0,
    recordOver: 0,
    recording: 0,
    recordtime: 0,
    showRecordVaule: 0,
    msgList: [
      {
        msgType: 'voice',
        voiceUrl: 'http://tmp/wx61ce8c6ace48a236.o6zAJs9kw1E5trPjcSd89PNPv-W0.ff6f9cd1ee24a0bd756e9341bc300a4c.silk',
        showType: 'rev',
        duration: 10,

      },
      {
        msgType: 'voice',
        voiceUrl: 'http://tmp/wx61ce8c6ace48a236.o6zAJs9kw1E5trPjcSd89PNPv-W0.ff6f9cd1ee24a0bd756e9341bc300a4c.silk',
        showType: 'rev',
        duration: 20,
      },
      {
        msgType: 'voice',
        voiceUrl: 'http://tmp/wx61ce8c6ace48a236.o6zAJs9kw1E5trPjcSd89PNPv-W0.ff6f9cd1ee24a0bd756e9341bc300a4c.silk',
        showType: 'rev',
        duration: 40,
      },
      {
        msgType: 'text',
        text: '不断膨胀的共享经济星系里“新华视点”记者初步梳理发现',
        showType: 'rev',
      }, {
        msgType: 'image',
        imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1629089538,987246310&fm=27&gp=0.jpg',
        showType: 'rev',
      }, {
        msgType: 'voice',
        voiceUrl: 'http://tmp/wx61ce8c6ace48a236.o6zAJs9kw1E5trPjcSd89PNPv-W0.ff6f9cd1ee24a0bd756e9341bc300a4c.silk',
        showType: 'send',
        duration: 3,
      }, {
        msgType: 'voice',
        voiceUrl: 'http://tmp/wx61ce8c6ace48a236.o6zAJs9kw1E5trPjcSd89PNPv-W0.ff6f9cd1ee24a0bd756e9341bc300a4c.silk',
        showType: 'send',
        duration: 40,
      }, {
        msgType: 'location',
        location: {
          name: "黄浦区上海市委(人民大道北)",
          address: "上海市黄浦区人民大道200号",
          latitude: 31.230416,
          longitude: 121.473701,
        },
        markers:[
          {
            iconPath: "/image/pin.png",
            id: 0,
            latitude: 31.230416,
            longitude: 121.473701,
            width: 25,
            height: 25
          }
        ],
        showType: 'rev',
      }, {
        msgType: 'location',
        location: {
          name: "黄浦区上海市委(人民大道北)",
          address: "上海市黄浦区人民大道200号",
          latitude: 31.230416,
          longitude: 121.473701,
        },
        markers: [
          {
            iconPath: "/image/pin.png",
            id: 0,
            latitude: 31.230416,
            longitude: 121.473701,
            width: 25,
            height: 25
          }
        ],
        showType: 'send',
      },
      {
        msgType: 'text',
        text: '不断膨',
        showType: 'send',
      }, {
        msgType: 'image',
        imageUrl: 'https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/text.png?t=20171116',
        showType: 'rev',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sendSocketMessage({
      userId: 1,
      toUserId: 2,
      content: '你好啊！',
      dosometing: 'chatMessage',
    });
    this.revMessage();
  },
  //打开地图
  showLocation:function(e){
    var longitude = e.currentTarget.dataset.longitude;
    var latitude = e.currentTarget.dataset.latitude;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28
    });
  },
  //浏览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current);
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  //发送图片
  chooseImage: function (e) {
    var that = this;
    var sourceType = [];
    var source = e.currentTarget.dataset.source;
    sourceType.push(source);
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        for (var i in tempFilePaths) {
          var data = {
            msgType: 'image',
            imageUrl: tempFilePaths[i],
            showType: 'send',
          };
          that.sendmessage(data);
        }
      }
    })
  },
  revMessage: function () {
    app.revMessage("chatMessage", function (res) {
      console.log(res);
    })
  },
  //滚动到最新消息位置
  setToView: function () {
   // var id = "msg" + (Number(this.data.msgList.length) - 1);
    
    var id ="msgBoxBottom";
    this.setData({ toView: id });
    // setTimeout(function(){
    //   wx.pageScrollTo({
    //     scrollTop: 8000
    //   })
    // },500);
    //  this.data.array.push(1);
    //  this.setData({ array: this.data.array});
    // wx.pageScrollTo({
    //     scrollTop: 890100
    //   })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setToView();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bodyclick: function () {
    this.setData({ showChatBntBox: 0 })
  },
  showBntAct: function (e) {
    var id = e.currentTarget.dataset.id;
    this.data.showChatBntBox != id ? this.setData({ showChatBntBox: id }) : this.setData({ showChatBntBox: 0 })
    console.log(id);
  },
  inputFocus: function () {
    this.setData({ showChatBntBox: 0 });
  },
  //录音开始
  startRecord: function (e) {
    // console.log("startRecord",e);
    var that = this;
    var recordtime = 0;
    var timer = setInterval(function () {
      recordtime = recordtime+400;
      console.log(recordtime);
    }, 400);
    //console.log(that.data.recording, 'startRecord');
    this.setData({
      chatBntRecordText: '松开 结束',
      recording: 1,
      recordOver: 1,
      pageY: e.changedTouches[0].pageY
    });
    wx.showToast({
      title: '手指上滑，取消发送',
      image: '/image/record.png',
      duration: 200000
    })
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        if (recordtime > 200 && that.data.recordOver == 1) {
          var data = {
            msgType: 'voice',
            voiceUrl: tempFilePath,
            showType: 'send',
            duration: Math.ceil(recordtime/1000),
          };
          that.sendmessage(data);
        }
        console.log("success", recordtime, that.data.recordOver, tempFilePath);
      },
      complete: function () {
        if (that.data.recording === 0) {
          setTimeout(function () {
            //结束录音  
            wx.stopRecord()
          }, 100)
        }
        clearTimeout(timer);
      },
      fail: function (res) {
        console.log("fail", 'startRecord');
        //录音失败
      }
    })
    console.log('startRecord');
  },
  //录音结束
  stopRecord: function () {
    wx.hideToast();
    this.setData({ chatBntRecordText: '按住 说话', recording: 0 });
    wx.stopRecord();
    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 200)
    console.log('stopRecord');
  },
  //取消说话
  cancelRecord: function () {
    wx.hideToast();
    this.setData({ chatBntRecordText: '按住 说话', recording: 0, recordOver: 0 });
  },
  //松开手指
  recordTouchmove: function (e) {
    var Y = this.data.pageY - e.changedTouches[0].pageY;
    if (Y > 20) {
      wx.showToast({
        title: '松开手指，取消发送',
        image: '/image/12.png',
        duration: 200000
      });
      this.setData({ chatBntRecordText: '松开 结束', recordOver: 0 });
    } else {
      wx.showToast({
        title: '手指上滑，取消发送',
        image: '/image/record.png',
        duration: 200000
      });
      this.setData({ chatBntRecordText: '松开 取消', recordOver: 1 });
    }
  },
  //播放语言
  playVoice: function (e) {
    var that = this;
    if (this.data.voicePlaying) {
      wx.stopVoice();
    } else {
      this.data.voicePlaying = 1;
      var voiceUrl = e.currentTarget.dataset.voiceurl;
      console.log(voiceUrl);
      wx.playVoice({
        filePath: voiceUrl,
        complete: function (e) {
          console.log(e);
        }
      });
      that.data.voicePlaying = 0;
    }
  },
  //发送地理位置
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (obj) {
        console.log("success", obj);
        var data = {
          msgType: 'location',
          location: {
            name: obj.name,
            address: obj.address,
            latitude: obj.latitude,
            longitude: obj.longitude,
          },
          markers: [
            {
              iconPath: "/image/pin.png",
              id: 0,
              latitude: obj.latitude,
              longitude: obj.longitude,
              width: 25,
              height: 25
            }
          ],
          showType: 'send',
        };
        that.sendmessage(data);
        // that.setData({ address: obj.address });
      },
      fail: function (obj) {
        console.log("fail", obj);
      },
      complete: function (obj) {
        console.log("complete", obj);
      }
    });
  },
  //confirmSend
  confirmSend:function(e){
    var data = {
      msgType: 'text',
      text: e.detail.value,
      showType: 'send',
    };
    this.sendmessage(data);
   // console.log(e.detail.value);
    this.setData({ msgValue:''});
  },
  //发送消息
  sendmessage: function (data) {
    console.log(data);
    var msgList = this.data.msgList;
    msgList.push(data)
    this.setData({ msgList: msgList });
    this.setToView();
  },
})