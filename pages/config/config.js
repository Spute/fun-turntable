// pages/config/config.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {

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
            ]
        }
        this.drawTruntable()
    },

    drawTruntable(res) {
        const rotateDeg = 180
        console.log(res)
        if (res[0] == null) {
            return
        }
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        // ctx.lineWidth = 4
        ctx.strokeStyle = 'red'
        // ctx.lineCap = "round"/project.config.json
        ctx.beginPath()
        ctx.translate(50, 50)
        // ctx.moveTo(0,0)
        ctx.moveTo(0, 0)
        // ctx.rotate(rotateDeg*Math.PI/180)
        // ctx.rect(105, 205, 10, 10)
        ctx.lineTo(100, 100)
        // ctx.arc(0,0,50,0,rotateDeg*Math.PI/180,false);

        // ctx.lineTo(0,0)
        ctx.stroke()
    },
    start() {
        this.animationHandler()
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
        var that = this
        var awardIndex = Math.random() * 6 >>> 0;
    
        // 获取奖品配置
        var awardsConfig = app.awardsConfig,
            runNum = 8
        if (awardIndex < 2) awardsConfig.chance = false
        console.log(awardIndex)
    
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
        var winAwards = wx.getStorageSync('winAwards') || {data:[]}
        winAwards.data.push(awardsConfig.awards[awardIndex].name + '1个')
        wx.setStorageSync('winAwards', winAwards)
    
        // 中奖提示
        setTimeout(function() {
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