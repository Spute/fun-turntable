// pages/config/config.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        records: [
            { content: '8元红包' },
            { content: '6元红包' },
            { content: '7元红包' },
            { content: '3元红包' },
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
        app.awardsConfig = {
            chance: true,
            awards: [
                { 'index': 0, 'name': '1元红包' },
                { 'index': 1, 'name': '5元话费' },
                { 'index': 2, 'name': '6元红包' },
                { 'index': 3, 'name': '8元红包' },
                { 'index': 4, 'name': '10元话费' },
                // { 'index': 5, 'name': '10元红包' }
            ],
            title: '大转盘抽奖',
            subTitle: "感恩节活动大抽奖，反馈广大客户",
        }
        this.drawTruntable()
        this.setData({
            title: app.awardsConfig['title'],
            subTitle: app.awardsConfig['subTitle']
        })
    },

    start() {
        this.animationHandler()
    },
    clearRecord() {
        this.data.records = []

        this.setData({
            records: this.data.records
        })
        console.log('clear record',this.data)
    },
    animationHandler() {
        // 旋转抽奖
        app.runDegs = app.runDegs || 0
        console.log('deg', app.runDegs)
        // app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))
        app.runDegs += 3240
        console.log('deg', app.runDegs)

        var animationRun = wx.createAnimation({
            duration: 4000,
            timingFunction: 'ease'
        })
        // that.animationRun = animationRun
        animationRun.rotate(app.runDegs).step()
        this.setData({
            animationData: animationRun.export(),
            btnDisabled: 'disabled'
        })
        // app.runDegs = 0
    },
    drawTruntable() {

        var awardsConfig = app.awardsConfig.awards,
            len = awardsConfig.length,
            html = [],
            turnNum = 1 / len  // 文字旋转 turn 值
        this.setData({
            btnDisabled: app.awardsConfig.chance ? '' : 'disabled'
        })
        for (var i = 0; i < len; i++) {
            // 奖项列表
            html.push({
                turn: i * turnNum + 'turn',
                lineTurn: i * turnNum + turnNum / 2 + 'turn',
                award: awardsConfig[i].name
            });
            console.log(html)
        }
        this.setData({
            awardsList: html
        });

    },
    getLottery: function () {
        var awardsConfig = app.awardsConfig,
        runNum = 8
        var that = this
        var awardIndex = Math.random() * awardsConfig.awards.length >>> 0;

        // 获取奖品配置

        if (awardIndex < 2) awardsConfig.chance = false
        console.log("awardIndex", awardIndex)

        // 旋转抽奖
        app.runDegs = app.runDegs || 0
        console.log('deg', app.runDegs)
        app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))
        console.log('deg', app.runDegs)

        var animationRun = wx.createAnimation({
            duration: 4000,
            timingFunction: 'ease'
        })
        that.animationRun = animationRun
        animationRun.rotate(app.runDegs).step()
        that.setData({
            animationData: animationRun.export(),
            btnDisabled: 'disabled'
        })

        // 记录奖品
        var winAwards = wx.getStorageSync('winAwards') || { data: [] }
        winAwards.data.push(awardsConfig.awards[awardIndex].name + '1个')
        wx.setStorageSync('winAwards', winAwards)

        // 更新记录
        console.log(this.data,'reocrd')
        this.data.records.push({
            'content': awardsConfig.awards[awardIndex].name
        });
        this.setData({
            records: this.data.records
        })

        // 中奖提示
        setTimeout(function () {
            wx.showModal({
                title: '恭喜',
                content: '获得' + (awardsConfig.awards[awardIndex].name),
                showCancel: false
            })
            if (awardsConfig.chance) {
                that.setData({
                    btnDisabled: ''
                })
            }

        }, 4000);


    },
})