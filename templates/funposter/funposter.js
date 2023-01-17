// 模板调用页面的page对象缓存
let page;

// 模板内部方法，主要是需要满足小程序的事件绑定机制
// 事件方法必须绑定在当前page对象上
let methods = {
    getImage: function (url) {
        return new Promise((resolve, reject) => {
            wx.getImageInfo({
                src: url,
                success: function (res) {
                    resolve(res)
                },
                fail: function () {
                    reject("")
                }
            })
        })
    },
    getImageAll: function (image_src) {
        let that = this;
        var all = [];
        image_src.map(function (item) {
            all.push(that.getImage(item))
        })
        return Promise.all(all)
    },
    //创建
    create() {
        let that = this;
        const query = wx.createSelectorQuery();

        query.select('#myCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
                const canvas = res[0].node;
                const dpr = wx.getSystemInfoSync().pixelRatio;
                canvas.width = res[0].width * dpr
                canvas.height = res[0].height * dpr
                const ctx = canvas.getContext('2d')
                ctx.scale(dpr, dpr)
                //canvas.createImage()在微信版本7.0.20会有报错，进入不了onload。 但是在7.0.21已经修复。
                let pic = canvas.createImage();
                ctx.fillRect(0, 0, 100, 100)
                pic.src = "/image/icon-HL.png"; //可以是本地，也可以是网络图片
                console.log(pic)
                pic.onload = () => {
                    //不要用官方示例的图片路径，包括网上在这之前所有的文档/示例里是地址链接的都不要看了，要用image对象！
                    ctx.drawImage(pic, 0, 0, 150, 150);

                }
            })
        
        
    },
    //保存
    save: function () {
        wx.canvasToTempFilePath({//canvas 生成图片 生成临时路径
            canvasId: 'canvas',
            success: function (res) {
                console.log(res)
                wx.saveImageToPhotosAlbum({ //下载图片
                    filePath: res.tempFilePath,
                    success: function () {
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                        })
                    }
                })
            }
        })
    }
};

module.exports = {
    async init(curPage, goodsId, mode = 3) {
        page = curPage;
        page.setData({
            shoppingCart: {
                buyNum: 1, // 设置默认值
                buyGoodsId: goodsId,
                mode
            }
        });
        Object.assign(page, methods);
        let good = await this.getGoodDetail(goodsId);
        page.setData({
            'shoppingCart.goods': good
        }, () => {
            page.showShoppingCart();
        });
    },

    async getGoodDetail(goodsId) {
        // 略
    }
}