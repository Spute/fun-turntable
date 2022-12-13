// pages/select.js

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftStyle: 'menu-select',
        rightStyle: 'menu-noselect',
        hotSelect: [
            {
                title: '聚餐吃什么？',
                selects: [
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
                selects: [
                    { "name": "身高最高的" },
                    { "name": "微信好友最多的" },
                    { "name": "年龄最小的" },
                    { "name": "年龄最大的" },
                    { "name": "头发最短的" },
                    { "name": "头发最长的" },
                ]
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        const selectIndex = event.currentTarget.dataset.type
        app.awardsConfig = {
            chance: true,
            awards: this.data.hotSelect[selectIndex].selects,
            title: this.data.hotSelect[selectIndex].title,
            subTitle: "感恩节活动大抽奖，反馈广大客户",
        }
        wx.reLaunch({
            url: '/pages/index/index',
        }
        )
    }
})