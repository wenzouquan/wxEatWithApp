// pages/upload/index.js
const qiniuUploader = require("../../util/qiniuUploader");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        var filePath = res.tempFilePath;
        that.upload(filePath, (res) => {
          console.log(res);
          that.setData({
            src: res.imageURL
          })
        })
        
      }
    })
  },
  upload: function (filePath,suc){
    qiniuUploader.upload(filePath, (res) => {
      // that.setData({
      //   'imageURL': res.imageURL,
      // });
      suc ? suc(res) : '';  
    }, (error) => {
      console.log('error: ' + error);
    }, {
        region: 'ECN', // 华东区
        uploadURL: 'https://up.qiniup.com',
        domain: 'http://oi7jj3s01.bkt.clouddn.com/',
        uptokenURL: 'http://www.eatwith.me/api/upload/uptoken',
      })
    
  },
  didPressChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        that.upload(filePath,(res)=>{
          console.log(res);
        })
       }
      })    
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
  
  }
})