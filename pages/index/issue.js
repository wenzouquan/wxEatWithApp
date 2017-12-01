//index.js
//获取应用实例
var app = getApp();
//console.log(app.globalData);
Page({
  data: {
    userInfo: {},
    address:'',
    imageList:[],
    topicType:2,
    markers: [
    ],
    expenseArray: ['0〜100元', '100〜200元', '200〜500元','500元以上'],
    genderArray:['女','男','男女均可'],
    numberOfPeople: ['1', '1〜3', '3〜5', '5〜8','8人以上'],
  },
  onLoad: function (options){
    this.setData({ topicType: options.topicType});
    var title = options.topicType == 1 ? '找人拼单' :'申请成为东道主';
    wx.setNavigationBarTitle({
      title: '申请成为东道主'
    });
  },
  chooseLocation:function(){
    var that = this;
    wx.chooseLocation({
      success:function(obj){
        console.log("success",obj);
        that.setData({ address: obj.address});
      },
      fail: function (obj){
        console.log("fail",obj);
      },
      complete: function (obj){
        console.log("complete",obj);
      }
    });
  },
  chooseImage:function(){
    var that = this
    var imageList = this.data.imageList;
    wx.chooseImage({
      sizeType: 'compressed',
      count: 8,
      success: function (res) {
        var newImages = res.tempFilePaths;
        that.setData({ imageList: imageList.concat(newImages)});
       // console.log(newImages);
      }
    })
  },
  delImg:function(e){
    var id = e.currentTarget.dataset.id;
    var imageList = this.data.imageList;
    imageList.splice(id, 1);
    this.setData({ imageList: imageList});
  },
  //浏览图片
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  
  
})
