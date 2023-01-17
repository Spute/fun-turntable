const unit = require('../../utils/util.js')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showIndex: null, //打开弹窗的对应下标
    height: '', //屏幕高度
    width: '',
    imagePath: 'image/icon.png',
  },
  // 打开弹窗
  openPopup(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    });
    let that = this;
    that.createPoster();
  },
  createPoster() {
    let pageObj = this;
    const query = wx.createSelectorQuery();
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node;
        //获取设备的像素比
        const dpr = wx.getSystemInfoSync().pixelRatio;
        console.log('res', res)
        console.log('dpr', dpr)

        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        const ctx = canvas.getContext('2d')
        //缩放当前绘图
        // ctx.scale(dpr, dpr)

        const awardTitle = app.awardsConfig['title']
        const awardNames = []
        const awards = app.awardsConfig["awards"]
        for (var i = 0; i < awards.length; i++) {
          awardNames.push(awards[i]['name']);
        }
  
        this.bgToWhite(ctx, canvas)

        this.drawRamText(canvas, ctx, awardNames)
        const endHieght = this.drawTitle(canvas, ctx, awardTitle)
        this.drawQRCode(canvas, ctx, endHieght, pageObj)
        //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
        ctx.save(); //保存之前的画布设置
        // canvas.toDataURL("image/poster.png")
        // ctx.draw(true);//true表示保留之前绘制内容
        // setTimeout(function () {
        // }, 2000)
      })

  },
  saveCanvasToFile(canvas, pageObj) {
    wx.canvasToTempFilePath({
      // canvasId: 'posterCanvas',
      canvas: canvas,
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log("res", res)
        pageObj.data.imagePath = tempFilePath;
      },
      fail: function (res) {
        console.log(res);
      }
    }, pageObj);
  },
  drawTitle(canvas, ctx, awardTitle) {
    const beginX = canvas.width / 2,
      beginY = canvas.height / 8;
    const curXY = unit.fillCnText(awardTitle, 1, ctx, beginX, beginY)

    return curXY[1]
  },
  drawQRCode(canvas, ctx, endHieght, pageObj) {

    var image = canvas.createImage();
    const qrCodeBase64 = unit.imageData().qrCodeBase64
    image.src = "data:image/png;base64," + qrCodeBase64

    const imgWidth = 200,
      imgHeight = 200;

    // 图片加载完成后触发的回调函数
    image.onload = function () {
      //定位图像(左上角坐标)，并规定图像的宽度和高度
      ctx.drawImage(image, canvas.width / 2 - imgWidth / 2, (canvas.height + endHieght) / 2 - imgHeight / 2, imgWidth, imgHeight);
      pageObj.saveCanvasToFile(canvas, pageObj)
    };

  },
  bgToWhite(ctx, canvas) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < imageData.data.length; i += 4) {
      // 当该像素是透明的,则设置成白色
      if (imageData.data[i + 3] == 0) {
        imageData.data[i] = 255;
        imageData.data[i + 1] = 255;
        imageData.data[i + 2] = 255;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  },
  drawRamText(canvas, ctx, awardNames) {
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.3", "blue");
    gradient.addColorStop("0.6", "green");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;

    var rowWidth = 0;
    var rowHeight = 0
    var lastRowHeight = 0

    while (rowHeight < canvas.height) {
      rowWidth = 0;
      var curRowHeight = unit.getRndInteger(20, 40);
      var spaceWidth = (lastRowHeight + curRowHeight) / 2;
      var spaceHeight = (lastRowHeight + curRowHeight) / 2;
      while (rowWidth < canvas.width) {
        ctx.font = "italic " + curRowHeight + "px Arial";
        const text = awardNames[unit.getRndInteger(0, awardNames.length - 1)];
        ctx.fillText(text, rowWidth, rowHeight);
        rowWidth += ctx.measureText(text).width + spaceWidth;
      };
      rowHeight += curRowHeight + spaceHeight;
      lastRowHeight = curRowHeight
    }

  },
  //关闭弹窗
  closePopup() {
    this.setData({
      showIndex: null
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this;
    // 动态获取屏幕高度
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          widHeight: result.windowHeight,
          widWidth: result.windowWidth
        });
      },
    })
  },

  savePoster: function () {
    var that = this
    console.log(that.data.imagePath)
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '海报已保存到相册',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('999999')
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          },
          fail: function (res) {
            console.log(11111)
          }
        })
      },
      fail(res) {
        // wx.showToast({
        //   title: '保存失败',
        //   icon: 'none',
        // })
        if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
          wx.showModal({
            title: '提示',
            content: '需要您授权保存相册',
            showCancel: false,
            success: modalSuccess => {
              wx.openSetting({
                success(settingdata) {
                  console.log("settingdata", settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限成功,再次点击图片即可保存',
                      showCancel: false,
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限失败，将无法保存到相册哦~',
                      showCancel: false,
                    })
                  }
                },
                fail(failData) {
                  console.log("failData", failData)
                },
                complete(finishData) {
                  console.log("finishData", finishData)
                }
              })
            }

          })
        }
      }
    })
  },
})