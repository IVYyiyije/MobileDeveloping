//index.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    name:'简·奥斯丁',
    key1:'value1',
    title: ['爱情与友谊','傲慢与偏见','理智与情感'],
    author: { 原名: 'Jane Austen', 国家: '英国',生卒:'1775年12月16日—1817年7月18日',代表作:'三部曲'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("app onLoad!")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("app onReady!")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("app onShow!")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("app onHide!")
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
    
  }
})
