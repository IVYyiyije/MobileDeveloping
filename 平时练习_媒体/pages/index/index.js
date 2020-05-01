//index.js

var voicePath = ''



//生产随机颜色
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}


//下载的图片位置
var imagePath = ''

//保存图片到相册
function saveImage() {

  wx.saveImageToPhotosAlbum({
    filePath: imagePath,

    //成功之后回调
    success: function (res) {
      console.log("saveImageToPhotosAlbum success:" + res.tempFilePath)

    },

    //失败回调
    fail: function (err) {
      console.log("saveImageToPhotosAlbum fail:" + err)
    },

    //结束回调
    complete: function (err) {
      console.log("saveImageToPhotosAlbum complete:" + err)
    }
  })
}

Page({
  data: {

    poster: 'https://wx.leadingdo.com/audios/test.jpg',
    name: '此时此刻',
    author: '许巍',
    src: 'https://wx.leadingdo.com/audios/test.mp3',
    videoParh: ''
  },
  onLoad: function () {
    console.log('onLoad')
  },

  ////////////////////////// 4.2.1   图片
  //  选择
  testButtonClick11: function () {

    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("chooseImage success:" + res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      },
      //失败回调
      fail: function (err) {
        console.log("chooseImage fail:" + err)
      },

      //结束回调
      complete: function (err) {
        console.log("chooseImage complete:" + err)
      }
    })
  },

  //  预览
  testButtonClick12: function () {

    wx.previewImage({

      // 当前显示图片的http链接
      current: 'https://wx.leadingdo.com/images/book3.png',

      // 需要预览的图片http链接列表
      urls: ["https://wx.leadingdo.com/images/book1.png", "https://wx.leadingdo.com/images/book2.png", "https://wx.leadingdo.com/images/book3.png", "https://wx.leadingdo.com/images/book4.png", "https://wx.leadingdo.com/images/book5.png", "https://wx.leadingdo.com/images/book6.png"],

      success: function (res) {
        console.log("previewImage success:")
      },
      //失败回调
      fail: function (err) {
        console.log("previewImage fail:" + err)
      },

      //结束回调
      complete: function (err) {
        console.log("previewImage complete:" + err)
      }
    })
  },

  //  获取图片信息
  testButtonClick13: function () {

    //读取相对路径图片
    wx.getImageInfo({
      src: 'images/book.png',
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
        console.log(res.path)
      },
      //失败回调
      fail: function (err) {
        console.log("getImageInfo fail:" + err)
      },

      //结束回调
      complete: function (err) {
        console.log("getImageInfo complete:" + err)
      }
    })

    //选择相册图片，获取信息
    wx.chooseImage({
      success: function (res) {
        wx.getImageInfo({

          //获取选择的照片数组，取第1张
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res.width)
            console.log(res.height)
            console.log(res.path)
          },

          //失败回调
          fail: function (err) {
            console.log("getImageInfo fail:" + err)
          },

          //结束回调
          complete: function (err) {
            console.log("getImageInfo complete:" + err)
          }
        })
      },

      //失败回调
      fail: function (err) {
        console.log("chooseImage fail:" + err)
      },

      //结束回调
      complete: function (err) {
        console.log("chooseImage complete:" + err)
      }
    })
  },

  // 保存图片到系统相册
  testButtonClick14: function () {
    wx.downloadFile({
      //请求地址
      url: 'https://wx.leadingdo.com/images/book1.png',
      //设置header信息
      header: {
      },
      //成功之后回调
      success: function (res) {

        imagePath = res.tempFilePath

        console.log("Path:" + imagePath)

        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope
        wx.getSetting({
          success(res) {

            //没有授权的，需要先授权
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {

                  // 授权成功之后，保存图片
                  saveImage()
                }
              })
            } else {
              //已授权过的，直接保存图片
              saveImage()
            }
          }
        })
      }
    })
  },

  ////////////////////////// 4.2.2   录音
  //  开始录音
  testButtonClick21: function () {

    //开始录音
    wx.startRecord({
      success: function (res) {
        console.log("startRecord success" + res)
        voicePath = res.tempFilePath
      },
      fail: function (res) {
        //录音失败
        console.log("startRecord fail" + res)
      },
      complete: function (res) {
        //录音完成
        console.log("startRecord complete" + res)
      },
    })

    //设置延时10s调 wx.stopRecord()关闭录音。
    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 20000)
  },

  //  结束录音
  testButtonClick22: function () {
    //主动结束录音  
    wx.stopRecord()
  },

  ////////////////////////// 4.2.3   音频播放控制
  //  开始播放
  testButtonClick31: function () {
    wx.playVoice({

      //音频文件路径
      filePath: voicePath,

      //成功回调
      success: function () {
        console.log("playVoice success")
      },

      //失败回调
      fail: function () {
        console.log("playVoice fail")
      },

      //完成
      complete: function () {
        console.log("playVoice complete")
      }
    })
  },

  //  暂停播放
  testButtonClick32: function () {
    wx.pauseVoice()
  },

  //  继续播放
  testButtonClick33: function () {
    this.testButtonClick31();//调用播放事件
  },

  //  结束播放
  testButtonClick34: function () {
    wx.stopVoice()
  },



  //////////////// 4.2.4     音乐播放控制和音乐组件
  //  获取后台音乐播放状态
  testButtonClick41: function () {

    wx.getBackgroundAudioPlayerState({
      success: function (res) {

        //读取success返回参数
        var status = res.status
        var dataUrl = res.dataUrl
        var currentPosition = res.currentPosition
        var duration = res.duration
        var downloadPercent = res.downloadPercent
      }
    })
  },

  //  使用后台播放器播放音乐
  testButtonClick42: function () {
    wx.playBackgroundAudio({
      dataUrl: 'https://wx.leadingdo.com/audios/test.mp3', //音乐地址
      title: '测试音乐',//音乐标题
      coverImgUrl: 'https://wx.leadingdo.com/audios/test.jpg',//音乐封面

      //成功回调
      success: function () {
        console.log("playBackgroundAudio success")
      },

      //失败回调
      fail: function () {
        console.log("playBackgroundAudio fail")
      },

      //完成
      complete: function () {
        console.log("playBackgroundAudio complete")
      }
    })

    // 监听音乐播放
    wx.onBackgroundAudioPlay(function () {
      console.log("音乐开始播放！")
    })

    // 监听音乐暂停
    wx.onBackgroundAudioPause(function () {
      console.log("音乐暂停！")
    })

    // 监听音乐停止
    wx.onBackgroundAudioStop(function () {
      console.log("音乐停止！")
    })
  },

  //  暂停播放音乐
  testButtonClick43: function () {
    wx.pauseBackgroundAudio()
  },

  //  控制音乐播放进度
  testButtonClick44: function () {
    wx.seekBackgroundAudio({
      position: 30,

      //成功回调
      success: function () {
        console.log("seekBackgroundAudio success")
      },

      //失败回调
      fail: function () {
        console.log("seekBackgroundAudio fail")
      },

      //完成
      complete: function () {
        console.log("seekBackgroundAudio complete")
      }
    })
  },

  //  停止播放音乐
  testButtonClick45: function () {
    wx.stopBackgroundAudio()
  },

  ////////  ////////  ////////  ////////  音乐播放组件
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')

    // 使用 wx.createvideoContext 获取 video 上下文 context
    this.videoContext = wx.createVideoContext('myVideo')
  },

  // 开始播放
  audioPlay: function () {
    this.audioCtx.play()
  },

  //暂停
  audioPause: function () {
    this.audioCtx.pause()
  },

  //从16秒开始播放
  audio16: function () {
    this.audioCtx.seek(16)
  },

  //重新播放
  audioStart: function () {
    this.audioCtx.seek(0)
  },

  ////////  ////////  ////////  ////////背景音频管理器
  // 开始播放
  backAudioPlay: function () {
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '汪峰'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放

    backgroundAudioManager.play()

    // 监听回调事件

    //背景音频进入可以播放状态，但不保证后面可以流畅播放
    backgroundAudioManager.onCanplay = (
      console.log("backgroundAudioManager ==== onCanplay")
    )

    //背景音频播放事件
    backgroundAudioManager.onPlay = (
      console.log("backgroundAudioManager ==== onPlay")
    )

    //背景音频暂停事件
    backgroundAudioManager.onPause = (
      console.log("backgroundAudioManager ==== onPause")
    )

    //背景音频停止事件
    backgroundAudioManager.onStop = (
      console.log("backgroundAudioManager ==== onStop")
    )

    // 背景音频自然播放结束事件
    backgroundAudioManager.onEnded = (
      console.log("backgroundAudioManager ==== onEnded")
    )

    //背景音频播放进度更新事件
    backgroundAudioManager.onTimeUpdate = (
      console.log("backgroundAudioManager ==== onTimeUpdate")
    )

    // 用户在系统音乐播放面板点击上一曲事件（iOS only）
    backgroundAudioManager.onPrev = (
      console.log("backgroundAudioManager ==== onPrev")
    )

    //用户在系统音乐播放面板点击下一曲事件（iOS only）
    backgroundAudioManager.onNext = (
      console.log("backgroundAudioManager ==== onNext")
    )

    //背景音频播放错误事件
    backgroundAudioManager.onError = (
      console.log("backgroundAudioManager ==== onError")
    )

    // 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
    backgroundAudioManager.onWaiting = (
      console.log("backgroundAudioManager ==== onWaiting")
    )
  },

  //暂停
  backAudioPause: function () {

    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.pause()
  },

  //从16秒开始播放
  backAudio16: function () {

    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.seek(16)
  },

  //停止播放
  backAudioStart: function () {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.stop()
  },




  ////////////////////////// 4.2.5   视频与视频组件
  //  拍摄视频或从手机相册中选视频
  testButtonClick51: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          videoParh: res.tempFilePath
        })

        console.log(res.duration)
        console.log(res.size)
        console.log(res.height)
        console.log(res.width)
      }
    })
  },

  //  视频组件
  inputValue: '',//弹幕内容

  //input文本框输入内容事件
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },

  //发送弹幕
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },

  // 开始播放
  videoPlay: function () {
    this.videoContext.play()
  },

  //暂停
  videoPause: function () {
    this.videoContext.pause()
  },

  //从16秒开始播放
  video16: function () {
    this.videoContext.seek(16)
  }
})