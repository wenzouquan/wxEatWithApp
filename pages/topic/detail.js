//logs.js
var app = getApp();
Page({
  data: {
    logs: [],
    topicType:2,
    listData: [{
      userId: 1,
      timeTran:'1分钟前',
      id: 1,
      content: '尤其对于驴友来说，到旅行目的地还能融入当地人的生活，是一种很酷的体验。',
      user: {
        avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName: 'winn'}
    }],
    data: {
      userId: 1,
      id: 1,
      content: '到旅行目的地还能融入当地人的生活，是一种很酷的体验。',
      user: {
        avatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345436832,2975398698&fm=27&gp=0.jpg',
        nickName: 'winn'
      },
      timeTran: '2分钟前'
    },
   
  },
  onLoad: function (options) {
    //问题详情
     var that = this;
    that.setData({id:options.topic_id});
    that.setData({ topicType: options.topic_type });
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/topic/detail',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //打开地图
  openLocation:function(e){
    console.log(e);
    wx.openLocation({
      latitude: e.currentTarget.dataset.latitude,
      longitude: e.currentTarget.dataset.longitude,
      scale: 28
    })
  },
//回答
  reply:function(){
    this.setData({'popup':1});
    this.setData({'to_comment_id':0});
    this.setData({'reply':{value:'',placeholder:'这里写下你的评论...'}})
  },
 //回复
  to_reply:function(event){
    var to_comment_id=event.target.dataset.comment_id;
    var to_nickname=event.target.dataset.nickname;
    this.setData({'popup':1});
    this.setData({'to_comment_id':to_comment_id});
    this.setData({'reply':{value:'',placeholder:'@'+to_nickname}})
  },
 //删除
 del_comment:function(event){
  var that = this;
  var idx=event.target.dataset.key;
  var comment_id=event.target.dataset.comment_id;
  wx.showModal({
  title: '提示',
  content: '确认删除吗？',
  success: function(res) {
        if (res.confirm) {
          //删除评论
          app.getPageData("BoxSns/Home/Index/del_comment",{comment_id:comment_id},function(data){
             //删了出错
              if(data.error>0){
                  wx.showToast({
                    title: data.msg,
                    icon: 'success',
                    duration: 2000
                  });
              }else{
                  wx.showToast({
                    title: '操作成功',
                    icon: 'success',
                    duration: 2000
                  })
                  var listData=that.data.listData;
                  listData[idx]['none']=1;
                  that.setData({listData:listData});
              }      
          });   
        }
       }
  })
 },

  //取消
  btn_cancel:function(){
     this.setData({'popup':0});
  },
  //提交
  formSubmit:function(e){
    var postData=e.detail.value;
    if(postData.content==""){
      wx.showToast({
        title: '回复不能为空的啊',
        icon: 'success',
        duration: 2000
      })
     return false; 
    }
    this.setData({'loading':1});
    this.setData({'disabled':1});
    var _this=this;
    //提交回答
    app.postData("BoxSns/Home/Index/do_comment",{to_comment_id:this.data.to_comment_id,pid:this.data.id,content:postData.content,type:'eduAsk'},function(data){
      _this.setData({'loading':0});
      _this.setData({'disabled':0});
      var title="";
      if(data.error==0){
          title="提交成功"
          _this.setData({'popup':0});
           var listData=_this.data.listData;
           var len=listData.length;
           data.msg['del_act']=1;
           listData[len]=data.msg;
           console.log(listData);
           _this.setData({listData:listData});
      }else{
          title=data.msg;
      }
      wx.showToast({
        title: title,
        icon: 'success',
        duration: 2000
      })
    })
    console.log(e);
  },
   //浏览图片
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.data.imageList
    })
  },
  apply1:function(e){
    var that = this;
    this.setData({
      applyLoading: 1,
      applyDisabled: 1
    });
    wx.showModal({
      title: '确认报名',
      content: '当前就餐时间：2017-12-01 15:50 ，确认报名？',
      success: function (res) {
        if (res.confirm) {
          that.doApply();
          console.log('用户点击确定')
        } else if (res.cancel) {
          that.cancelApply();
          console.log('用户点击取消')
        }
      }
    })
  },
  //报名
  apply:function(e){
    console.log(e);
    var date = e.detail.value;
    wx.showShareMenu({
      withShareTicket: true
    });
    var that = this;
     this.setData({
       applyLoading:1,
       applyDisabled:1
     });
     wx.showModal({
       title: '确认报名',
       content: '你选择时间是：' + date + ' ' + e.currentTarget.dataset.time+' ，确认报名？',
       success: function (res) {
         if (res.confirm) {
           that.doApply();
           console.log('用户点击确定')
         } else if (res.cancel) {
           that.cancelApply();
           console.log('用户点击取消')
         }
       }
     })
  },
  //取消操作 
  cancelApply:function(){
    this.setData({
      applyLoading: 0,
      applyDisabled: 0
    });
  },
  //确认
  doApply:function(){
    this.cancelApply();
    wx.showModal({
      title: '恭喜您，报名成功',
      content: ' 当前活动还需要5个人参与才能开始，是否邀请你的朋友一起去吃？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.showShareMenu({
            withShareTicket: true
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }


  
})
