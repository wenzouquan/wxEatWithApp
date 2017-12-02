// pages/user/bank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   showAddBank:1,
   array:['招商银行','北京银行'],
   bankname:'',
  },
  bindPickerChange:function(e){
    this.setData({ bankname: this.data.array[e.detail.value]});
   console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  addBank: function(e){
    console.log(e);
    this.setData({ showAddBank: e.currentTarget.dataset.id});
  },
  doAddBank:function(e){
    wx.redirectTo({
     url: '/pages/user/withdraw'
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