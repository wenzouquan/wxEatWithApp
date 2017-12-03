// pages/user/money.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:3,
    showAddBank: 1,
    array: ['招商银行', '北京银行'],
    bankname: '',
  },
  bindPickerChange: function (e) {
    this.setData({ bankname: this.data.array[e.detail.value] });
    console.log(e);
  },
  doAddBank:function(){
    this.setData({ showAddBank: 0 });
  },
  selectBank: function(){
    this.setViweType(4);
  },
  doWithDraw:function(){
    this.setViweType(0);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options);
  },
  showView:function(e){
    this.setViweType(e.currentTarget.dataset.id );
    console.log(e.currentTarget.dataset.id);
  },
  setViweType:function(id){
    this.setData({ type: id });
    var title ="我的总收入";
    if(id==2){
      title="未结算的金额";
    }else if(id==3){
      title = "可提现的金额";
    }else if(id ==4){
      title = "提现到银行卡";
    }else if(id == 5){
      title = "银行卡管理";
    }
    wx.setNavigationBarTitle({
      title: title
    })
  },
  addBank: function (e) {
    console.log(e);
    this.setData({ showAddBank: e.currentTarget.dataset.id });
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