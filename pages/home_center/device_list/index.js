// miniprogram/pages/home_center/device_list/index.js.js
import { getDeviceList } from '../../../utils/api/device-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    deviceList: []
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
  onShow: async function () {
    const deviceList = await getDeviceList()
    deviceList.forEach(item => {
      item.icon = `https://images.tuyacn.com/${item.icon}`
    })
    console.log('deviceList',deviceList)
    this.setData({ deviceList })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  jumpToPanel({currentTarget}) {
    console.log('currentTarget',currentTarget)
    const { dataset: { device } } = currentTarget
    const { id, category, name } = device
    switch (category) {
      case 'kg': break;
      case 'ts': 
      wx.navigateTo({
        url: `/pages/ts/index?device_id=${id}&device_name=${name}`,
      })
        break
      default: {
        wx.navigateTo({
          url: `/pages/home_center/common_panel/index?device_id=${id}&device_name=${name}`,
        })
      }
    }
  }
})