// pages/goods/goods.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    imgUrls: null,
    categories: [],
    activeCategoryId: 0,
    coupons: [],
    isShowCoupon: null,
    nameLike: '',
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.setNavigationBarTitle({
      title: '精选商城',
    })
    wx.request({
      url: `https://api.it120.cc/${app.globalData.subDomain}/banner/list`,
      data: {
        key: 'mallName'
      },
      success(res) {
        if(res.data.code == 0) {
          _this.setData({
            imgUrls: res.data.data
          })
        }
      }
    })
    wx.request({
      url: `https://api.it120.cc/${app.globalData.subDomain}/shop/goods/category/all`,
      success(res) {
        if(res.data.code == 0) {
          let titleArr = [];
          res.data.data.forEach(function(v) {
            titleArr.push(v)
          });
          titleArr.unshift({id: 0, name: '全部 '});
          _this.setData({
            categories: titleArr
          })
          _this.getGoodsList();
        }
      }
    })
    this.getNotices();
    this.getCoupon();
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
  getSearchInfo(e) {
    this.setData({
      nameLike: e.detail.value
    })
    console.log(this.data.nameLike)
  },
  // 搜索商品
  searchGoods(e) {
    if (!this.data.nameLike.trim()) {
      return;
    }
    this.getGoodsList();
  },
  // 切换商品类别
  changeCate(e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    })
    this.getGoodsList();
  },
  // 获取公告信息
  getNotices() {
    let _this = this;
    wx.request({
      url: `https://api.it120.cc/${app.globalData.subDomain}/notice/list`,
      success(res) {
        if(res.data.code == 0) {
          _this.setData({
            noticeList: res.data.data.dataList
          })
        }
      }
    })
  },
  // 优惠券
  getCoupon() {
    let _this = this;
    wx.request({
      url: `https://api.it120.cc/${app.globalData.subDomain}/discounts/coupons`,
      success(res) {
        if(res.data.code == 0) {
          if(!!res.data.data && res.data.data.length > 0){
            _this.setData({
              coupons: res.data.data,
              isShowCoupon: true
            })
          }else {
            _this.setData({
              isShowCoupon: false
            })
          }

        }
      }
    })
  },
  // 获取商品列表
  getGoodsList() {
    let _this = this;
    let categoryId;
    if(_this.data.activeCategoryId == 0) {
      categoryId = ''
    }else {
      categoryId = _this.data.activeCategoryId
    }
    wx.request({
      url: `https://api.it120.cc/${app.globalData.subDomain}/shop/goods/list`,
      data: {
        nameLike: _this.data.nameLike,
        categoryId: categoryId
      },
      success(res) {
        console.log(res);
        if(res.data.code == 0) {
          _this.setData({
            goodsList: res.data.data
          })
        }

      }
    })
  },
  // 跳转商品详情页
  goDetail(e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  // 获取优惠券
  gitCoupon(e) {
    let id = e.currentTarget.id;
    wx.request({
      url: `https://api.it120.cc/${app.globalData.subDomain}/discounts/fetch`,
    })
  }
})