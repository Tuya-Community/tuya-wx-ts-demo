// pages/cloud_check/index.js
import { login } from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    percentage: 100,
    errorText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    this.checkCloud()
  },

  checkCloud: async function () {
    try {
      const { miniProgram } = wx.getAccountInfoSync()
      wx.cloud.init({ env: `ty-${miniProgram.appId}` });
      this.setData({ percentage: 25 })
    } catch (error) {
      console.log(error)
      this.setData({ errorText: '开通云开发失败' })
    }

    try {
      const res = await wx.cloud.callFunction({
        name: 'ty-service',
        data: {
          action: 'hello',
          params: {}
        }
      })

      if (!res) {
        throw ('部署SDK')
      } else {
        this.setData({ percentage: 50 })
      }
    } catch (error) {
      console.log(typeof error)
      this.setData({ errorText: '部署SDK失败' })
    }

    try {
      const clientd
        = await wx.cloud.callFunction({
          name: 'ty-service',
          data: {
            action: 'getClientId',
            params: {}
          }
        })

      if (!clientd) {
        throw ('部署授权文件')
      } else {
        this.setData({ percentage: 75 })
      }
    } catch (error) {
      this.setData({ errorText: '部署授权文件失败' })
    }

    try {
      const uid = await login()
      if (!uid) {
        throw ('调用云函数失败')
      } else {
        this.setData({ percentage: 100 })
      }
    } catch (error) {
      this.setData({ errorText: '调用云函数失败' })
    }
  },

  backPage: function() {
    wx.navigateBack({
      delta: 1,
    })
  }
})