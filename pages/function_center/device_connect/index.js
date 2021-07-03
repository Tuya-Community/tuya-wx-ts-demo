// miniprogram/pages/function_center/device_connet/index.js
import { reqTicket, getClientId } from '../../../utils/api/common-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    apUrl: '/pages/web_view/index?urlType=apUrl',
    list: [
      {
        name: '自动发现',
        baseUrl: 'plugin://tuya-ap-plugin/auto'
      }
    ]
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

  // 跳转配网插件
  gotoPluginpage: async function ({ currentTarget }) {
    const { dataset: { baseurl } } = currentTarget
    const [{ ticket }, clientId] = await Promise.all([reqTicket(), getClientId()])

    const home_id = wx.getStorageSync('owner_id')
    wx.navigateTo({
      url: `${baseurl}?ticket=${ticket}&clientId=${clientId}&gid=${home_id}`,
    })
  },

  gotoWebview: function({currentTarget}) {
    const { dataset: { baseurl } } = currentTarget
    wx.navigateTo({
      url: baseurl,
    })
  }

})