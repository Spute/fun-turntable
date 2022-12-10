// pages/config/config.js
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
                const query = wx.createSelectorQuery()
                query.select('#turnTable')
                        .fields({ node: true, size: true })
                        .exec(this.drawTruntable.bind(this))
        },

        drawTruntable(res){
                const rotateDeg = 180
                const canvas = res[0].node
                const ctx = canvas.getContext('2d')
                // ctx.lineWidth = 4
                ctx.strokeStyle = 'red'
                // ctx.lineCap = "round"/project.config.json
                ctx.beginPath()
                ctx.translate(50,50)
                // ctx.moveTo(0,0)
                ctx.moveTo(0,0)
                // ctx.rotate(rotateDeg*Math.PI/180)
                // ctx.rect(105, 205, 10, 10)
                ctx.lineTo(100,100)
                // ctx.arc(0,0,50,0,rotateDeg*Math.PI/180,false);
                
                // ctx.lineTo(0,0)
                ctx.stroke()
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

        drawTruntable2(res) {
                const canvas = res[0].node
                const ctx = canvas.getContext('2d')
                var len = 6
                for (var i = 0; i < len; i++) {
                        // 保存当前状态
                        ctx.save();
                        // 开始一条新路径
                        ctx.beginPath();
                        // 位移到圆心，下面需要围绕圆心旋转
                        ctx.translate(150, 150);
                        // 从(0, 0)坐标开始定义一条新的子路径
                        ctx.moveTo(0, 0);
                        // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
                        ctx.rotate((360 / len * i - rotateDeg) * Math.PI / 180);
                        // 绘制圆弧
                        ctx.arc(0, 0, 150, 0, 2 * Math.PI / len, false);

                        // 颜色间隔
                        if (i % 2 == 0) {
                                ctx.setFillStyle('rgba(255,184,32,.1)');
                        } else {
                                ctx.setFillStyle('rgba(255,203,63,.1)');
                        }

                        // 填充扇形
                        ctx.fill();
                        // 绘制边框
                        ctx.setLineWidth(0.5);
                        ctx.setStrokeStyle('rgba(228,55,14,.1)');
                        ctx.stroke();

                        // 恢复前一个状态
                        ctx.restore();

                        // 奖项列表
                        html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name });
                        console.log(html)
                }
                that.setData({
                        awardsList: html
                });

        }
})