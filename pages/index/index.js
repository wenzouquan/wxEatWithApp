//index.js
//获取应用实例
var app = getApp();
//console.log(app.globalData);
Page({
  data: {
    orderListActive:0,
    showType:2,
    showOrder:2,
    userInfo: {},
    markers: [
    ],
    listData:[{
      userId:1,
      id: 1,
      picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511355048549&di=dd05b1accb0d52b5b53c0182b81e4c45&imgtype=0&src=http%3A%2F%2Fimg.xsee.cc%2Fupload%2Falbum%2F2016%2F04%2F19%2Fab8a78a4-6613-4151-9586-2d7892965b31-1200x803.jpg',
      content: app.cutString('一起吃饭的形式应该会有很多人会喜欢，尤其对于驴友来说，到旅行目的地还能融入当地人的生活，是一种很酷的体验。',40),
      user:{avatarUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName:'winn'
      },
      timeTran:'2分钟前'
    }, {
      userId: 1,
      id:2,
      picUrl:'http://youimg1.c-ctrip.com/target/tg/363/601/850/8c54f24277e14a6eb41560bd8f69bf19_metal.jpg',
      content: app.cutString('我在厦门，典型的旅游城市。而我作为一个外地人，来厦两年多，自然也被厦门文艺的气质感染了（文青都想开一个咖啡馆书店私房菜馆什么的），因为我喜欢做饭，且手艺也不算差，就想通过“吃”的方式结交一帮朋友，而且这种方式应该与众不同才对。',40),
      user: {
        avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName: '只吃饭不洗碗'
      },
      timeTran: '2分钟前'
      }, {
        userId: 1,
        id: 1,
        picUrl: 'https://p1.meituan.net/deal/0078ff80f24520badc03a5f194c659f730143.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
        content: app.cutString('尤其对于驴友来说，到旅行目的地还能融入当地人的生活，是一种很酷的体验。',40),
        user: {
          avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
          nickName: 'winn'
        },
        timeTran: '2分钟前'
      }]
  },
  tapOrder(e){
    this.data.orderListActive == 1 ? this.setData({ orderListActive: 0 }) : this.setData({ orderListActive: 1 });
    console.log('tapOrder');
  },
  bodyclick(){
    console.log('bodyclick');
    if (this.data.orderListActive == 1){
      this.setData({ orderListActive: 0 });
    }
  },
  changeOrder(e){
    var key = e.currentTarget.dataset.key;
    this.setData({ showOrder: key});
    this.setData({ orderListActive: 0 });
    console.log(e);
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId);
    wx.navigateTo({
      url: '/pages/topic/detail'
    })
  },
  controltap(e) {
    console.log(e.controlId)
  },
  //事件处理函数
  bindViewTap: function() {
  },
  //跳到用户中心
  jumpUser:function(){
    wx.navigateTo({
      url: '../user/index'
    })
  },
  changeViwe: function(){
    console.log(this.data.showType);
    this.data.showType == 1 ? this.setData({ showType: 2 }) : this.setData({ showType: 1 });
  },
  //跳转到发布
  jumpIssue:function(){
    wx.navigateTo({
      url: '../index/issue'
    })
  },

  // onLoad: function () {
  //   var that = this;
  //   console.log(this.data);
  // },
  onLoad:function(e){
    var that = this;
    app.getLocation(function (res) {
        wx.setStorageSync("userLocation", res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.addMarkers();
    });
    
  },
  translateMarker: function () {
    console.log(this.data);
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  addMarkers(){
    var marker = {
      iconPath: "/image/pin.png",
      id: 0,
      // callout:{
      //   content:'为标记点旁边增加标签',
      //   color: '#000000', 
      //   fontSize: '30', 
      //    borderRadius:'10', 
      //    bgColor:'#ffffff', 
      //    padding:'10', 
      //    display:'ALWAYS',
      // },
      latitude: app.globalData.userLocation.latitude,
      longitude: app.globalData.userLocation.longitude,
      width: 45,
      height: 45
    };
    this.data.markers.push(marker);
    this.setData({
      markers: this.data.markers
    });
  },
 
  
})
