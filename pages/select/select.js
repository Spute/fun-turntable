// pages/select.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  that: this,
  data: {
    hotSelect: [],
    menuID: null,
    personSelect: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('select onLoad')
    const personSelect = wx.getStorageSync('personSelect') || [{
      display: true,
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
    console.log('select onReady')
    this.data.hotSelect = app.hotSelect
    this.data.menuID = app.menuID
    console.log(this.data)
    this.setData({
      'menuID': this.data.menuID,
      'hotSelect': this.data.hotSelect,
      'personSelect': this.data.personSelect,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('select onshow', this.data)
    const personSelect = wx.getStorageSync('personSelect') || []
    this.setData({
      'hotSelect': this.data.hotSelect,
      'personSelect': personSelect,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log('select page onHide')
    app.menuID = this.data.menuID
    wx.setStorageSync('personSelect', this.data.personSelect)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log('select page onUnload')
    app.menuID = this.data.menuID
    wx.setStorageSync('personSelect', this.data.personSelect)
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
  getTurnTable() {
    if (this.data.menuID == 1) {
      return app.hotSelect
    } else if (this.data.menuID == 2) {
      return this.data.personSelect
    } else {
      console.log('menuID error', this.data.menuID)
    }
  },
  selectTurnTable(event) {
    console.log(event)
    const selectIndex = event.currentTarget.dataset.titleindex
    const turnTable = this.getTurnTable()
    app.awardsConfig = {
      chance: true,
      awards: turnTable[selectIndex].awards,
      title: turnTable[selectIndex].title,
      subTitle: turnTable[selectIndex].subTitle,
    }
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  deleteTurnTable(event) {
    console.log(event)
    const selectIndex = event.currentTarget.dataset.titleindex
    this.data.personSelect.splice(selectIndex,1)
    this.setData({personSelect:this.data.personSelect})
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
    var tabName = "hotSelect"
    var tabData = 1
    var titleIndex = event.currentTarget.dataset.titleindex
    if (this.data.menuID == 1) {
      tabName = "hotSelect";
      app.hotSelect[titleIndex]['display'] = !app.hotSelect[titleIndex].display
      tabData = app.hotSelect;
    } else if (this.data.menuID == 2) {
      tabName = "personSelect";
      this.data.personSelect[titleIndex]['display'] = !this.data.personSelect[titleIndex]['display']
      tabData = this.data.personSelect;
    } else {
      console.log('menuID error', this.data.menuID, event)
    }
    this.setData({
      // ES6 允许声明在对象字面量时使用简写语法，来初始化属性变量和函数的定义方法，并且允许在对象属性中进行计算操作：
      [tabName]: tabData,
    })

  },
  inputBlur(event) {
    console.log("event", event)
    const titleIndex = event.currentTarget.dataset.titleindex
    const subIndex = event.currentTarget.dataset.subindex
    console.log(titleIndex, app.hotSelect[titleIndex], event.detail.value)
    this.getTurnTable()[titleIndex]['awards'][subIndex].name = event.detail.value
  },
  menuClick(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      menuID: id,
    })
  },
  addPersonItem(e){
    this.data.personSelect.push(
      {
        "awards":[{"name":"示例"}],
        "display": false,
        "title": "标题",
      }
    );
    this.setData({personSelect: this.data.personSelect});
  },
})