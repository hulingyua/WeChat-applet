const app = getApp();
Page({
  data: {
    title: '这是测试专用页面',
    images: ['/images/1.jpeg', '/images/2.jpeg', '/images/3.jpeg', '/images/4.jpeg'],
    nodes: [{
      name: 'img',
      attrs: {
        src: '/images/4.jpeg',
        style: 'width:200px;height:200px'
      }
    },{
      name: 'div',
      children: [{
        type: 'text',
        text: 'hhh'
      }]
    }],
    html: '<table style="border:1px solid #ddd"><tr><td style="border:1px solid #ddd">td1</td><td  style="border:1px solid #ddd">td2</td></tr><tr><td style="border:1px solid #ddd">td1</td><td style="border:1px solid #ddd">td2</td></tr></table>',
    options: [
      {
        value: '选项一',
        disabled: true,
        checked: true,
        color: 'pink',
        name: 'one'
      }, {
        value: '选项一',
        disabled: false,
        checked: true,
        color: 'lightblue',
        name: 'two'
      }, {
        value: '选项二',
        disabled: false,
        checked: false,
        color: 'red',
        name: 'three'
      }, {
        value: '选项三',
        disabled: false,
        checked: false,
        color: 'yellow',
        name: 'forth'
      },
    ],
    switchValue: {
      checked: true,
      color: 'pink'
    },
    slider: {
      min: 10,
      max: 100,
      step: 2,
      value: 50,
      activeColor: 'red',
      backgroundColor: 'lightblue',
      blockSize: 20,
      blockColor: 'lightgreen',
      showValue: true
    },
    selectors: ['语文','数学','英语','化学','物理','政治'],
    index: 0,
    multipleArr: [

    ],
    audioData:{
      loop: false,
      controls: true,
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      author: 'xuwei',
      poster: '../../images/5.jpg',
      name: '此时此刻'
    },
    picSrc: '',
    videoSrc: '',
    tempSrc: '',
    latitude: '',
    longitude: '',
    chooseSrc: '',
    loadSrc: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg'
  },
  onLoad() {
    console.log('hahah')
  },
  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo')
    this.audioCtx = wx.createAudioContext('myAudio')
    this.mapCtx = wx.createMapContext('myMap');
    this.getLocation();
  },
  play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      return {
        title: '通过页面内button的分享',
        path: '/pages/test/test',
        imageUrl: '/images/3.jpg'
      }
    } else {
      return {
        title: '通过右上角分享',
        path: '/pages/test/test',
        imageUrl: '/images/4.jpeg'
      }
    }
  },
  getUserInfo(e) {
    console.log(e.detail.userInfo);
  },
  getCheckBox(e) {
    console.log(e.detail.value);
  },
  getSwitch(e) {
    console.log(e.detail.value);
  },
  getSlider(e) {
    console.log(e.detail.value);
  },
  getImmedia(e) {
    console.log(e.detail.value);
  },
  getBlur(e) {
    console.log(e.detail.value)
  },
  submitInfo(e) {
    console.log(e.detail.value);
  },
  resetForm(e) {
    console.log(e)
  },
  getSelectors(e) {
    console.log(e.detail.value)
    let index = e.detail.value;
    // 将选中的值显示在页面上
    this.setData({
      index
    })
  },
  columnChange(e) {
    console.log(e.detail.value)
  },
  timeUpdate(e) {
    console.log(e.detail)
    this.duration = e.detail.duration;
  },
  setPlayTime(e) {
    if(!this.duration) {
      return
    }
    let percent = e.detail.value / 100 ;
    let currentTime = this.duration * percent;
    this.audioCtx.seek(currentTime);
    console.log(currentTime)
  },
  takePic() {
    this.cameraCtx = wx.createCameraContext();    
    this.cameraCtx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          picSrc: res.tempImagePath
        })
      }
    })
  },
  takeVideo() {
    this.cameraCtx.startRecord({
      success: () => {
      }
    })
  },
  stopVideo() {
    this.cameraCtx.stopRecord({
      success: (res) => {
        this.setData({
          tempSrc: res.tempThumbPath, //封面
          videoSrc: res.tempVideoPath
        })
      }
    })
  },
  getLocation() {
    this.mapCtx.getCenterLocation({
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude:res.longitude
        })
      }
    })
  },
  choosePic() {
    let _this = this;
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        _this.setData({
          chooseSrc: res.tempFilePaths[0]
        })
      },
    })
  },
  loadImg() {
    let _this = this;
    console.log(_this.data.loadSrc)
    wx.getImageInfo({
      src: _this.data.chooseSrc,
      success: function (ret) {
        var path = ret.path;  //path是一个临时路径
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            console.log(result)
          }
        })
      }
    })
  }


})