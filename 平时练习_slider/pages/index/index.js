//index.js
//获取应用实例
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  sliderChange1: function (e) {
    console.log('slider1发生change事件，携带值为', e.detail.value)
  },
  sliderChange2: function (e) {
    console.log('slider2发生change事件，携带值为', e.detail.value)
  },
  sliderChange3: function (e) {
    console.log('slider3发生change事件，携带值为', e.detail.value)
  },
  sliderChange4: function (e) {
    console.log('slider4发生change事件，携带值为', e.detail.value)
  },
})