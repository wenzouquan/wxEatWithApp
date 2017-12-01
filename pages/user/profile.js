//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    'text': '<view>你好</view>',
    listData: [{
      userId: 1,
      timeTran: '1分钟前',
      id: 1,
      content: '去北海道的时候和他一起去吃了石狩锅，是非常有趣的一个人，三观很正，见识旗开得胜，不仅吃到了想吃的东西，还交了新朋友',
      user: {
        avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName: 'winn'
      }
    }, {
      userId: 1,
      timeTran: '1分钟前',
      id: 1,
      content: '去北海道的时候和他一起去吃了石狩锅，是非常有趣的一个人，三观很正，见识旗开得胜，不仅吃到了想吃的东西，还交了新朋友',
      user: {
        avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName: 'winn'
      }
      }]
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.intData();
  },

  intData: function () {
    var that = this;
  },
  onLoad: function () {
    var that = this;
    var user_info = wx.getStorageSync('user_info');
    console.log(user_info);
    if (user_info) {
      that.setData({ 'user_info': user_info });
    } else {
      that.intData();
    }

  }
})
