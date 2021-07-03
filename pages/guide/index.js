// pages/guide/index.js
import wxMqtt from '../../utils/mqtt/wxMqtt';
import { getMqttconfig } from '../../utils/api/device-api';
import { getFamilyList } from '../../utils/api/family-api'
import request from '../../utils/request';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cloudInner: {
      isDroped: false,
      url: '/pages/cloud_check/index'
    },
    list: [
      {
        name: '基础业务功能',
        url: '/pages/base_function/index'
      },
      {
        name: '体验 Demo 面板',
        url: '/pages/home_center/device_list/index'
      },
      {
        name: '体验涂鸦小程序',
        url: 'navigateToMiniProgram'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { cloudInner } = this.data;
    const { miniProgram } = wx.getAccountInfoSync();
    wx.cloud.init({ env: `ty-${miniProgram.appId}` });

    try {
      const { device_id } = await request({
        name: 'ty-service',
        data: {
          action: 'device.virtualAdd',
          params: {
            product_id: "qkxb0pmel0q1g9yf",
            token: 'release_common_component'
          }
        }
      });

      if (!device_id) {
        throw '检测到未部署SDK';
      }

      cloudInner.isDroped = true;
      this.setData({ cloudInner: { ...cloudInner } });

      wx.setStorageSync('vir_device', device_id);

      const homeList = await getFamilyList();
      wx.setStorageSync('owner_id', homeList[0].home_id)
      let {
        client_id,
        password,
        source_topic: { device: topic },
        url,
        username
      } = await getMqttconfig();

      wxMqtt.connectMqtt(url, { clientId: client_id, username, password, subscribeTopics: topic });
    } catch (error) {
      // wx.showModal({
      //   title: '检测到未部署SDK',
      //   content: '后续功能操作都需要SDK能力, 请去涂鸦开发平台程序一键部署SDK'
      // })
      cloudInner.isDroped = false;
      this.setData({ cloudInner: { ...cloudInner } });
    }
  },

  onClickHide: function () {
    this.setData({ show: false });
  },

  gotoOtherage: function (event) {
    const {
      dataset: { url }
    } = event.currentTarget;
    if (url == 'navigateToMiniProgram') {
      this.setData({ show: true });
    } else {
      wx.navigateTo({
        url
      });
    }
  }
});
