//index.js

var socketOpen = false
var socketMsgQueue = []

Page({
  data: {
  },
  onLoad: function () {
    console.log('onLoad')
  },
  // 4.1.1   发起请求 
  testButtonClick1: function () {

    //request请求
    wx.request({

      //请求地址
      url: 'https://wx.leadingdo.com/serverTime/',

      //请求参数
      data: {
        uName: '刘明洋',
        uid: '001'
      },

      //设置header信息
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },

      //请求方式
      method: 'POST',

      //收到数据json处理
      dataType: 'json',

      //成功之后回调
      success: function (res) {
        console.log("request success:" + res.data['errorCode'])
        console.log("request success:" + res.data['msg'])
        console.log("request success:" + res.data['serverTime'])


      },

      //失败回调
      fail: function (err) {
        console.log("request fail:" + err)
      },

      //结束回调
      complete: function (err) {
        console.log("request complete:" + err)
      }
    })
  },

  // 4.1.2   上传
  testButtonClick2: function () {

    //选择照片
    wx.chooseImage({
      success: function (res) {

        //获取临时路径
        var tempFilePaths = res.tempFilePaths

        //上传
        wx.uploadFile({

          //上传接口
          url: 'https://wx.leadingdo.com/uploadFile/Default.aspx',

          //上传文件路径
          filePath: tempFilePaths[0],

          //文件对应的key，方便服务器获取
          name: 'file',

          //设置header信息
          header: {
            'content-type': 'multipart/form-data'
          },

          //额外上传一些信息
          formData: {
            'user': '刘明洋'
          },

          //成功之后回调
          success: function (res) {
            console.log("request success:" + res.data)

          },

          //失败回调
          fail: function (err) {
            console.log("request fail:" + err)
          },

          //结束回调
          complete: function (err) {
            console.log("request complete:" + err)
          }
        })
      }
    })
  },

  // 4.1.2   下载 
  testButtonClick3: function () {

    wx.downloadFile({

      //请求地址
      url: 'https://wx.leadingdo.com/images/book1.png',

      //设置header信息
      header: {

      },

      //成功之后回调
      success: function (res) {
        console.log("downloadFile success:" + res.tempFilePath)

      },

      //失败回调
      fail: function (err) {
        console.log("downloadFile fail:" + err)
      },

      //结束回调
      complete: function (err) {
        console.log("downloadFile complete:" + err)
      }
    })
  },


  // 4.1.3   1 wx.connectSocket 
  socketButtonClick: function () {

    //创建 WebSocket 连接
    console.log('创建WebSocket连接！')
    wx.connectSocket({

      //socket合法域名
      url: 'wss://wx.leadingdo.com',

      //请求的数据
      data: {
        x: '',
        y: ''
      },

      //HTTP Header , header 中不能设置 Referer
      header: {
        'content-type': 'application/json'
      },

      //请求方式
      method: "GET",

      //成功之后回调
      success: function (res) {
        console.log("connectSocket success")

      },

      //失败回调
      fail: function (err) {
        console.log("connectSocket fail:")
      },

      //结束回调
      complete: function (err) {
        console.log("connectSocket complete:")
      }
    })


    //监听打开事件。
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')

      //修改socketOpen标记
      socketOpen = true

      //判断数组中，如果存在内容，发送到服务器
      for (var i = 0; i < socketMsgQueue.length; i++) {
        //发送消息
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })

    //监听WebSocket错误
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败！')
    })

    //接收消息事件。
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data)
    })

    //监听WebSocket关闭。
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })


  },

  //发送消息
  socketButtonClick1: function () {

    //如果socket是开启状态，执行发现，否则先显示存放到数组中。
    if (socketOpen) {

      //发送消息
      wx.sendSocketMessage({
        data: msg,

        //成功之后回调
        success: function (res) {
          console.log("sendSocketMessage success")

        },

        //失败回调
        fail: function (err) {
          console.log("sendSocketMessage fail:")
        },

        //结束回调
        complete: function (err) {
          console.log("sendSocketMessage complete:")
        }
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },

  //关闭WebSocket
  socketButtonClick2: function () {

    //如果socket开始。执行关闭操作
    if (socketOpen) {
      wx.closeSocket()
    }
    socketOpen = false
    console.log('WebSocket关闭！')
  }
})
