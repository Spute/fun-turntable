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
                display: false,
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
                display: false,
                selects: [
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
                selects: [
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
                selects: [
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
                selects: [
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
                selects: [
                    { "name": "1" },
                    { "name": "2" },
                    { "name": "3" },
                    { "name": "4" },
                    { "name": "5" },
                    { "name": "6" },
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
            subTitle: this.data.hotSelect[selectIndex].subTitle,
        }
        wx.reLaunch({
            url: '/pages/index/index',
        }
        )
    },
    dropSelect(event){
        console.log("event", event)
        const selectIndex = event.currentTarget.dataset.type
        console.log('selectIndex', selectIndex)
        console.log(this.data.hotSelect[selectIndex].display)
        this.data.hotSelect[selectIndex]['display'] = !this.data.hotSelect[selectIndex].display
        console.log('data',this.data)
        this.setData({
            hotSelect:this.data.hotSelect,
            // "title.display": this.data.hotSelect[selectIndex].display
        })
    }
})