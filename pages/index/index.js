// pages/config/config.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        records: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('options', options)
        app.awardsConfig = app.awardsConfig || {
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
        }
        this.drawTruntable()
        this.setData({
            title: app.awardsConfig['title'],
            subTitle: app.awardsConfig['subTitle']
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    start() {
        this.animationHandler()
    },
    clearRecord() {
        this.data.records = []

        this.setData({
            records: this.data.records
        })
        console.log('clear record', this.data)
    },
    animationHandler() {
        app.runDegs = app.runDegs || 0
        console.log('deg', app.runDegs)
        app.runDegs += 3240
        console.log('deg', app.runDegs)

        var animationRun = wx.createAnimation({
            duration: 4000,
            timingFunction: 'ease'
        })
        animationRun.rotate(app.runDegs).step()
        this.setData({
            animationData: animationRun.export(),
            btnDisabled: 'disabled'
        })
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
        var awardsConfig = app.awardsConfig
        var runNum = 8
        const trunTime = app.trunTime
        var that = this
        var awardIndex = Math.random() * awardsConfig.awards.length >>> 0;

        // 获取奖品配置
        if (awardIndex < 2) awardsConfig.chance = false
        console.log("awardIndex", awardIndex)

        // 旋转抽奖
        app.runDegs = app.runDegs || 0
        app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / awardsConfig.awards.length))

        var animationRun = wx.createAnimation({
            duration: trunTime,
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

        // 中奖提示
        setTimeout(function () {
            wx.showModal({
                title: '恭喜',
                content: '获得`' + (awardsConfig.awards[awardIndex].name) + "`",
                showCancel: false
            })
            if (awardsConfig.chance) {
                that.setData({
                    btnDisabled: ''
                })
            }

            // 更新记录
            console.log(that.data, 'reocrd')
            that.data.records.push({
                'content': awardsConfig.awards[awardIndex].name
            });
            that.setData({
                records: that.data.records
            })

        }, trunTime, that);
    },

    share(event){
        console.log('share')
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage'],
            success:this.onShareAppMessage(),
          })
    },
    poster(event){
        console.log('share')
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareTimeline','shareAppMessage'],
            success:this.onShareTimeline(),
          })
    },
    onShareAppMessage(){
        // console.log('hello')
    },
    onShareTimeline(){
        // console.log('hello')
    }
})