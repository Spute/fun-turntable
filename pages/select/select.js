// pages/select.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSelect: [],
    menuID: 1,
    personSelect: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //     console.log(app.hotSelect,app)
    //     this.data.hotSelect=app.hotSelect
    const personSelect = wx.getStorageSync('personSelect') || [{
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
    }]
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.data['personSelect'] = personSelect

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log(app.hotSelect, app)
    this.data.hotSelect = app.hotSelect
    console.log(this.data)
    this.setData({
      'hotSelect': this.data.hotSelect
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('onLoad', this.data)
    this.setData({
      'hotSelect': this.data.hotSelect
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  selectTurnTable(event) {
    console.log(event)
    const selectIndex = event.currentTarget.dataset.titleindex
    app.awardsConfig = {
      chance: true,
      awards: app.hotSelect[selectIndex].selects,
      title: app.hotSelect[selectIndex].title,
      subTitle: app.hotSelect[selectIndex].subTitle,
    }
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  editTurnTable(event) {
    // wx.reLaunch({
    //     url: '/pages/select-edit/select-edit',
    // })
    const id = event.currentTarget.dataset.titleindex
    console.log("id", id)
    wx.navigateTo({ url: '/pages/select-edit/select-edit?id=' + id })

  },
  dropSelect(event) {
    console.log("event", event)
    const titleIndex = event.currentTarget.dataset.titleindex
    console.log(app.hotSelect[titleIndex].display)
    app.hotSelect[titleIndex]['display'] = !app.hotSelect[titleIndex].display
    console.log('data', this.data)
    this.setData({
      hotSelect: app.hotSelect,
      // "title.display": this.data.hotSelect[selectIndex].display
    })
  },
  inputBlur(event) {
    console.log("event", event)
    const titleIndex = event.currentTarget.dataset.titleindex
    const subIndex = event.currentTarget.dataset.subindex
    console.log(titleIndex, app.hotSelect[titleIndex], event.detail.value)
    app.hotSelect[titleIndex]['selects'][subIndex].name = event.detail.value
  },
  menuClick(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      menuID: id,
    })
  },
})