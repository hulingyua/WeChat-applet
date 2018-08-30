//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    num: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 页面加载时触发，参数可以获取到路径中的参数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 页面显示/切入前台时触发
  onShow: function(){

  },
  // 页面渲染完成时触发，可与视图层交互
  onReady: function (a) {
    console.log(a)
  },
  // 自定义转发内容 
  onShareAppMessage: function(res) {
    console.log(res)
    if(res.from === 'button') {
     return { 
        title: '通过button转发',
        path: '/pages/logs/logs',
       imageUrl: 'http://t2.hddhhn.com/uploads/tu/20150700/akgj2qchk3z.jpg'
      } 
    } else {
      console.log(res)
      return {
        title: '通过顶部转发',
          path: '/pages/index/index',
        imageUrl: 'http://img5.duitang.com/uploads/item/201611/13/20161113110506_ScT45.thumb.700_0.jpeg'
      }
    }

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 监听页面滚动，参数为页面垂直方向滚动的距离
  // onPageScroll: function(e) {
  //   console.log(e)
  // },
  showMsg (){
    console.log("还不会放图片");
    console.log(this.route); //当前页面路径
  },
  changeNum() {
    let num = this.data.num;
    num++
    this.setData({
      num: num
    })
  },
  redirectUrl() {
    wx.redirectTo({
      url: '/pages/login/login?id=1'
    })
  }
})
