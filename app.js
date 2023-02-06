// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
  },
  trunTime: 3000,
  awardsConfig: {
    chance: true,
    awards: [
      { 'name': "日本料理" },
      { 'name': "火锅" },
      { 'name': "自己多少斤心里没点数" },
      { 'name': "泰国菜" },
      { 'name': "海鲜" },
      { 'name': "烤鱼" },
      { 'name': "拉面" },
      { 'name': "麻辣烫" },
      { 'name': "自助餐" }
    ],
    title: '聚餐吃什么？',
    subTitle: "",
  },
  menuID : 1,
  hotSelect: [
    {
      title: '2023年贺岁片',
      display: false,
      awards: [
        { 'name': "无名" },
        { 'name': "深海" },
        { 'name': "满江红" },
        { 'name': "交换人生" },
        { 'name': "流浪地球2" },
        { 'name': "熊出没" },
        { 'name': "中国乒乓绝地反击" },
      ]
    },
    {
      title: '聚餐吃什么？',
      display: false,
      awards: [
        { 'name': "日本料理" },
        { 'name': "火锅" },
        { 'name': "自己多少斤心里没点数" },
        { 'name': "泰国菜" },
        { 'name': "海鲜" },
        { 'name': "烤鱼" },
        { 'name': "拉面" },
        { 'name': "麻辣烫" },
        { 'name': "自助餐" },
      ]
    },
    {
      title: '今天谁买单？',
      display: false,
      awards: [
        { "name": "身高最高的" },
        { "name": "微信好友最多的" },
        { "name": "年龄最小的" },
        { "name": "年龄最大的" },
        { "name": "头发最短的" },
        { "name": "头发最长的" },
      ]
    },
    {
      title: '真心话',
      display: false,
      awards: [
        { "name": "描述经历过最尴尬的事" },
        { "name": "带过异性回家吗" },
        { "name": "第一次恋爱几岁" },
        { "name": "做过最疯狂的事是什么" },
        { "name": "单身的感觉好吗" },
        { "name": "讲一下你的最近一次分手" },
        { "name": "与前任还有联系吗" },
        { "name": "你最喜欢的异性风格" },
        { "name": "谈过几次恋爱" },
        { "name": "多久没看片了" },
      ]
    },
    {
      title: '狼人杀身份牌',
      display: false,
      awards: [
        { "name": "预言家" },
        { "name": "狼人" },
        { "name": "村民" },
        { "name": "狼人" },
        { "name": "村民" },
        { "name": "狼人" },
        { "name": "村民" },
        { "name": "村民" },
        { "name": "猎人" },
        { "name": "女巫" },
        { "name": "丘比特" },
      ]
    },
    {
      title: '大冒险',
      display: false,
      awards: [
        { "name": "公主抱离你最近的异性" },
        { "name": "向一位同性表白3分钟" },
        { "name": "向一位异性表白3分钟" },
        { "name": "脱一件衣服至游戏结束" },
        { "name": "做一个最性感的动作" },
        { "name": "与异性十指相扣，对视十秒" },
      ]
    },
    {
      title: '骰子',
      display: false,
      awards: [
        { "name": "1" },
        { "name": "2" },
        { "name": "3" },
        { "name": "4" },
        { "name": "5" },
        { "name": "6" },
      ]
    },
  ]
})
