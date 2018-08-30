let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: '',
    showNameWarn: false,
    showPasswordWarn: false,
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  login(e) {
    let userInfo = e.detail.value;
    let name = userInfo.name.trim();
    let password = userInfo.password.trim();
    if(!name) {
      this.setData({
        showNameWarn: true
      })
      return;
    }else {
      this.setData({
        showNameWarn: false
      })
    }
    if(!password) {
      this.setData({
        showPasswordWarn: true
      })
      return;
    } else {
      this.setData({
        showPasswordWarn: false
      })
    }
    console.log(e.detail.value)
  },
  wxLogin(e) {
    // 微信登录接口，返回一个有效时间5分钟的登录凭证
    // wx.login({
    //   success: function(res) {
    //     console.log(res)
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },
  getUserInfo(e) {
    let _this = this;
    // 先获取用户权限
    wx.getSetting({
      success(res) {
        // 用户已经授权,如果未授权，微信会自动弹出弹框，提示用户是否授权
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              app.userData = res.userInfo
              // 不能通过NavigatorTo跳转tab栏页面
              // wx.navigateTo({
              //   url: `/pages/goods/goods?nickName=${app.userData.nickName}`,
              // })
              
              // switchTab 路径后不能带参数
              wx.switchTab({
                url: `/pages/goods/goods`,
              })
            }
          })
        }
      }
    })
  }
})