// miniprogram/pages/web_view/index.js
const urlList = {
  apUrl: 'https://developer.tuya.com/cn/docs/iot/app-development/mini-programs/plugin/distribution-network-plugin?id=K9lq218xn0wn8',
  dpUrl: 'https://developer.tuya.com/cn/docs/iot/app-development/mini-programs/quick-start/device-function-point?id=Ka6y8bi672n1s'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { urlType } = options
    if (urlList[urlType]) {
      this.setData({ url: urlList[urlType] })
    }
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

  bindload: function (res) {
    console.log(res)
  },

  binderror: function (res) {
    console.log(res)
  }

})