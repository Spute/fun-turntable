// pages/select-edit/select-edit.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectId: 0,
    selectData: {
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const selectId = options.id
    console.log("onLoad data", options, app.hotSelect)

    this.data.selectData = this.getTurnTable()[selectId]
    this.data.selectId = selectId
    this.setData({
      "selectData": this.data.selectData,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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
    console.log('select-editunload')
    console.log(app.hotSelect)

    if (app.menuID == 1) {
      app.hotSelect[this.data.selectId]["title"] = this.data.selectData.title
      app.hotSelect[this.data.selectId]["awards"] = this.data.selectData.awards
    } else if (app.menuID == 2) {
      const personSelect = wx.getStorageSync('personSelect')
      personSelect[this.data.selectId]["title"] = this.data.selectData.title
      personSelect[this.data.selectId]["awards"] = this.data.selectData.awards
      wx.setStorageSync('personSelect', personSelect)
    } else {
      console.log('menuID error', app.menuID)
    }
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

  inputTitle(event) {
    console.log("event", event)
    this.data.selectData['title'] = event.detail.value
  },
  inputItem(event) {
    console.log("event", event)
    const index = event.currentTarget.dataset.index
    console.log(index, app.hotSelect[index], event.detail.value)
    this.data.selectData['awards'][index].name = event.detail.value
  },


  delItem(event) {
    const index = event.currentTarget.dataset.index
    this.data.selectData.awards.splice(index, 1)
    this.setData({
      "selectData": this.data.selectData,
    })
  },

  addItem(event) {
    this.data.selectData.awards.push({
      'name': ""
    },
    )
    this.setData({
      "selectData": this.data.selectData,
    })
  },
  getTurnTable() {
    if (app.menuID == 1) {
      return app.hotSelect
    } else if (app.menuID == 2) {
      return wx.getStorageSync('personSelect')
    } else {
      console.log('menuID error', app.menuID)
    }
  },
})