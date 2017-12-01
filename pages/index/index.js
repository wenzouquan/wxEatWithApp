//index.js
//获取应用实例
var app = getApp();
//console.log(app.globalData);
Page({
  data: {
    orderListActive:0,
    showType:2,
    tabId:1,
    showOrder:2,
    window:{},
    userInfo: {},
    markers: [
    ],
    listData:[{
      userId:1,
      id: 1,
      content: app.util.cutString('一起吃饭的形式应该会有很多人会喜欢，尤其对于驴友来说，到旅行目的地还能融入当地人的生活，是一种很酷的体验。',40),
      user:{avatarUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName:'winn'
      },
      timeTran:'2分钟前'
    }, {
      userId: 1,
      id:2,
      content: app.util.cutString('我在厦门，典型的旅游城市。而我作为一个外地人，来厦两年多，自然也被厦门文艺的气质感染了（文青都想开一个咖啡馆书店私房菜馆什么的），因为我喜欢做饭，且手艺也不算差，就想通过“吃”的方式结交一帮朋友，而且这种方式应该与众不同才对。',40),
      user: {
        avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName: '只吃饭不洗碗'
      },
      timeTran: '2分钟前'
      }, {
        userId: 1,
        id: 1,
        content: app.util.cutString('尤其对于驴友来说，到旅行目的地还能融入当地人的生活，是一种很酷的体验。',40),
        user: {
          avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
          nickName: 'winn'
        },
        timeTran: '2分钟前'
      }],
    listData1: [{
      userId: 1,
      id: 1,
      picUrl: 'https://res.cloudinary.com/eatwith/image/upload/c_fill,f_auto,fl_progressive,h_250,q_auto,w_340/v1/user_48538/vtkzr7t7aeaeioijsqkb.jpg',
      title:'这样的饭局在哪里吃',
      content: app.util.cutString('比如在公园的露天野餐区、在湖边、在山顶等，总之都是根据发起者也就是当地人组织者的计划来制定。', 40),
      user: {
        avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName: 'winn'
      },
      timeTran: '2分钟前'
    }, {
      userId: 1,
      id: 2,
      title: '这样的饭局在哪里吃',
      picUrl: 'http://youimg1.c-ctrip.com/target/tg/363/601/850/8c54f24277e14a6eb41560bd8f69bf19_metal.jpg',
      content: app.util.cutString('目前，发起这种饭局的都是生活在各个目的地的当地人，他们未必是专业的厨师，但都是美食烹饪爱好者，擅长于烹制本地特色的食物，还很喜欢结交世界各地的朋友。。', 40),
      user: {
        avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName: '只吃饭不洗碗'
      },
      timeTran: '2分钟前'
    }, {
      userId: 1,
      id: 1,
      title: '如何参加饭局',
      picUrl: 'https://res.cloudinary.com/eatwith/image/upload/c_fill,f_auto,fl_progressive,h_250,q_auto,w_340/v1/host_9103/rjktjeufqelcblw8k48r.jpg',
      content: app.util.cutString('一般发起人会创建一个“饭局”，写明包括吃饭的时间、地点、约定人数、费用、菜单信息等，而大多数饭局都是欢迎陌生人参与的，只要内容吸引、时间合适，就可以报名参加', 40),
      user: {
        avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName: 'winn'
      },
      timeTran: '2分钟前'
    }, {
      userId: 1,
      id: 1,
      title: '安全问题如何确保',
      picUrl: 'https://res.cloudinary.com/eatwith/image/upload/c_fill,f_auto,fl_progressive,h_250,q_auto,w_340/v1/user_047600/image_16_1412583117.jpg',
      content: app.util.cutString('参与人与发起人必须是通过芝麻信用认证且600以上 ， 建立在互信的基础上。会派出专人提前上门审查相应的饭局提供者的资质，通过试菜等方式来进行考察', 40),
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
  jumpIssue:function(e){
    var topicType = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../index/issue?topicType=' + topicType
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
    this.setData({ window: app.globalData.window})
    console.log(app.globalData.window);
  },
  indexTab:function(e){
    var id = e.currentTarget.dataset.id;
    this.setData({ tabId: id });
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
  swiperChange:function(e){
    this.setData({ tabId: e.detail.current });
  },
 scrolltolower:function(e){
    console.log(e);
 }
  
})
