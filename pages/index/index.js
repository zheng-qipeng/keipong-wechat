// index.js
// 获取应用实例
const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: '请输入昵称',
    motto: '你好，欢迎',
    userInfo: {},
    markers: [{
      id: 0,
      latitude: 22.582719470008538,
      longitude: 113.9536608368154,
      name: "丽新花园",
    }]
  },
  onLoad() {
    // 用户信息
    const {avatarUrl, nickname} = wx.getStorageSync('userInfo')
    if (avatarUrl) this.setData({avatarUrl})
    if (nickname) this.setData({nickname})

    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  onReady() {
    // 将地图中心移置当前定位点
    this.mapCtx.moveToLocation()
  },
  onShareAppMessage() {}, // 用户点击右上角转发
  onShareTimeline() {}, // 用户点击右上角转发到朋友圈
  onAddToFavorites() {}, // 用户点击右上角收藏
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },
  bindCopyUrl(e) {
    const { url } = e.currentTarget.dataset
    // 设置系统剪贴板的内容
    wx.setClipboardData({
      data: url,
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
    wx.setStorageSync('userInfo', {
      ...wx.getStorageSync('userInfo'),
      avatarUrl,
    })
  },
  blurInput(e) {
    const value = e.detail.value
    this.setData({
      nickname: value
    })
    wx.setStorageSync('userInfo', {
      ...wx.getStorageSync('userInfo'),
      nickname: value,
    })
  },

})
