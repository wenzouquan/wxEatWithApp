// pages/user/chat.js
var app  = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatBntRecordText:'长按开始录音',
    showChatBntBox:3,
    showRecordVaule:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.sendSocketMessage({
      userId:1,
      toUserId:2,
      content:'你好啊！',
      dosometing:'chatMessage',
    });
    this.revMessage();
  },

  revMessage:function(){
    app.revMessage("chatMessage",function(res){
      console.log(res);
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
  
  },
  showBntAct:function(e){
    var id = e.currentTarget.dataset.id;
    this.data.showChatBntBox != id ? this.setData({ showChatBntBox: id}) : this.setData({ showChatBntBox:0})
    console.log(id);
  },
  inputFocus:function(){
    this.setData({ showChatBntBox: 0 });
  },
  startRecord:function(){
    this.setData({ chatBntRecordText:'录音中'});
    console.log('startRecord');
  },
  stopRecord:function(){
    this.setData({ chatBntRecordText: '长按开始录音' });
    console.log('stopRecord');
  }
})