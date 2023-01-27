// pages/config/config.js
const app = getApp()
const unit = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: "400rpx",
    canvasHeight: "400rpx",
    canvasLeft: "400rpx",
    canvasTop: "400rpx",
    records: [],
    dataList: {
      canvasData: {
        type: 'image',
        url: '',
        top: 0,
        left: 0,
        width: 750,
        height: 1334,
        comment: '背景图',
        btnText: '保存至相册'
      },
      content: [{
        type: 'image',
        url: '',
        top: 136,
        left: 100,
        shape: 'square',
        width: 290,
        height: 186,
        comment: '头像'
      }, {
        type: 'text',
        content: '白山羊',
        top: 336,
        left: 100,
        fontSize: 40,
        lineHeight: 40,
        color: '#f00',
        textAlign: 'left',
        weight: 'bold',
        maxWidth: 287
      }]
    },
    showIndex: null, //打开弹窗的对应下标
    imagePath: '',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const scene = decodeURIComponent(options.scene)
    this.getAppCode()
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
  },
  animationHandler() {
    app.runDegs = app.runDegs || 0
    app.runDegs += 3240

    var animationRun = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease'
    })
    animationRun.rotate(app.runDegs).step()
    this.setData({
      animationData: animationRun.export(),
    })
  },

  drawTruntable() {
    var awardsConfig = app.awardsConfig.awards,
      len = awardsConfig.length,
      awardsList = [],
      turnNum = 1 / len
    for (var i = 0; i < len; i++) {
      // 奖项列表
      awardsList.push({
        turn: i * turnNum + 'turn',  // 文字旋转turn 值
        lineTurn: i * turnNum + turnNum / 2 + 'turn', // 线条旋转turn 值
        award: awardsConfig[i].name  // 文字
      });
    }
    this.setData({
      awardsList: awardsList
    });

  },

  getLottery() {
    var awardsConfig = app.awardsConfig
    var runNum = 8
    const trunTime = app.trunTime
    var that = this
    var awardIndex = Math.random() * awardsConfig.awards.length >>> 0;

    // 获取奖品配置
    if (awardIndex < 2) awardsConfig.chance = false

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

      // 更新记录
      that.data.records.push({
        'content': awardsConfig.awards[awardIndex].name
      });
      that.setData({
        records: that.data.records
      })

    }, trunTime, that);
  },

  share(event) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage'],
      success: this.onShareAppMessage(),
    })
  },

  poster(event) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareTimeline', 'shareAppMessage'],
      success: this.onShareTimeline(),
    })
  },
  onShareAppMessage() {
    success: console.log('onShareAppMessage success')
  },

  onShareTimeline() {
    // console.log('hello')
  },
  getAppCode() {
    var codeBase64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAoorI1fxRomg3ljaapqMNrPfPst0fPzngfhyRyfWgDXooooAK4m5+I9nbfE+38EmylaaWPcbkMNqsULhduOmB1z3rtq8Vh8OaxL+0zNq8mn3CafHF5i3Ow+Ww8gIPm6ZycY9qAPaqrvf2cd7HZPdQLdyKWSBpAHYDqQvUirFfP+jO/i/wDaavL1GLW2lbwCDwBGvl/q7E0AfQFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXK+NfH+keBEsH1ZLllvJCimBA20DGSckeo6c11Vcz478HWnjfwvcaVcbUm+/bTEZMUg6H6dj7GgDoba5hvLWK5tpVlgmQPHIhyGUjIIrnvH3ia58IeD7vWrSxF5JAUHlliAAWALHHYZrmfgvpvivQ9AvdH8SWjwQ2k22yLsCSpyWAweVzgj6mvQtR0+21XTbnT7uMSW1zE0UinupGDQBl+DfFFv4x8LWWtW6+X56kSRZz5bg4Zfz/TFcf8X/AId6j44h0m40eSBL6ylYEzOVBRscg4PQqD+Ncf8ACC/ufBPxC1jwDqb4SWQtbFjgF1GQR/vpg/gK9x1i1ur7Rr21sbs2d3NC6Q3AGTE5GA34GgCzAsiW8SSvvkVAGYdzjk1zPiDV/FFl4s0Sy0jRY7vSblsX10xOYRn68YHPIOelXPB2laronhq2sNa1U6pfRFt9yckkE5AyeTgY5Ncd8XPiDq/ga50EabFAYbuVzcGVd25VK/KPT7x5oA9Przfwf8SLzxN8Stf8OPZQpZaeH8mZCd5KOEO7J5znPA4r0dWDoGHQjIryf4W+A9c8N+NPE+r6xDHGl3Iy27K4bzA0hctxyB060Aela3qA0nQdQ1EjItbaSbGOu1Sf6V47+zppkklnrviK4BMt3OIVc98fMx/EsPyr0Tx/460vwLpENzqdtLdC6k8lYIwCWGMsTnjAH866DSYbGHSrb+zbWO1tHQSRxRxhAoYZ+6Oh5oAu0V5P48+IutWXxE0Xwl4YEL3MkiG73oGyGP3fbC5YnryK9YoAKK8q8e/Fe70Pxfp/hjw3ZQ6hqMkqLcq+Tt3EYQYP3sck9uK9VHTnrQAUUUUAFFFFABRRRQAUUUUAFFcr4/8AGq+BPD6as+nTXytOsJSNtoTIJyTg4HGPqRVnwd4y0nxvow1LSpHwp2TQyDDxPjO0/wCI4NAHm0j698X/ABVqdnZ6tcaT4U0uY27NbHEl1IOvP688AEcEmm6v8O9Y8DabL4j8E+J9QuHs1Ms9ndSCRJkX73TAJAB4I+hBo+Her2XgbxF4i8FeI5VsnnvHubS4lbYkyOMfe6A4AI/EdRWnq+r+EPhh8Pb7SNI1AXk92Jfs9t9oE0jySDGTjoo4/LuTQB3vhDxHD4t8K2GtwJ5YuY8vHnOxwcMPwINblcZ8KtAuvDfw50uwvkMd0VaaSM9ULsW2n3AI/GuzoA8O+POgXGnXek+OtLGy6spUjndfY5jY/jlT9RXrfhjXrfxP4asNZtsBLqIOVBzsboy/gQR+FS69o9t4g0G90m7UGC7haNuOmehHuDg/hXjPwN1e60DxDrPgHVDtmgleWAE/xLw4HsRhh+NAHo3hbwpp/hTxJrMia5NdXmryfaPstxKNyKCxyq5yeuM+gFb+raBpOvC3Gq6fBeC3k82Hzlzsb1FeJfFd5PC3xo8NeJgzCCURhznjCNtcf98sPzr34EMAQcg8g0ALRWR4q1GTSPCWr6jEwWW2s5ZUY9mCkj9cVw/wK1nV9c8EXN1rF9NeOt86RyTHcwXapIz3GSaANbx14G0Xx7qWl2t/qhhuLBmmNrE6lpI2xnKnkD5RzXavJDaW5eR0hhjXlmIVVH1PSvBPhxJJ4r+PniDxCHZre1EojbPBBPloP++QT+Fdh8bNH8TeIdB07R9As3nhuLrN2UYDaB93d/s5JJ/3RQBZ8KfDP+x/H+reL77Ul1CW8d2tML/q1c5JJ7nbhRjtWp8S/HMHgXwvJeAq2oT5is4j/E/94j0XqfwHetfToLPwZ4MtoLq5C2ml2arJPIeyLyf/AK1eEaJZ3nxv+Js2sahG6eHtPICxHpsBysf+83Vvb8KANH4c6L/winhfVPij4mje4vpI2ltUk+8Qxxv57uTgHsD71p6N4D1r4g6anibxn4lv7SO7USW1laSCNIYz90nOQMjHbPPJzXoHxI8Pz6/8OdV0nT4x55hVoIlGMlGDBR9duBXIeH9Y8J/Ef4bWfh3Wr8WNzaRxRXNsZxDIrxcAjd1Bx+H1FAFCT+3fg34h00Tavc6t4S1CcW7i6O6S1c9CD+vHBAPGcV7ZXiPxK1ew8YXmg+APDUq304uo5biWJt6QRoCOW7nBJP09TXqHizxbpXgnQzqWqyssYPlxRoMvK+OFA/D6UAb1Fcj8PfHKePtFn1KPTZrFIpzCBI24PgA5BwPXmuuoAKKKKACiiigCK5toLy2ktrmGOaCRSrxyKGVh6EGuT1HQH8HeDNUXwDpNvDqL/vUhwWDtkZ6nk7c4HSrfifx/4d8HXlna61eNBJdgmPETOAAcZOBwM1vWN9aanZRXljcRXFtMu6OWJgysPYigDwjSPiB4a8eFPD/xK0iC21OFjHHdODEN3oTwYz+OD7V6X4f+Ffgzw9eR6hp2ko1wvzRzTSNLt913EgfWo/Hnwu0Px1btJMgtNUVcR3sS/N9HH8Q/X0NeT6b4n8afBbUY9J8RWz6hoLHELhiwC+sTnp/uH9OtAHskcfi+L4hXVzdXlmPCQtv3cfAdXAGSTjPXcc5xiuksr+z1K2FzYXcF1ASQJIJA6kjtkVj6VrWg+P8AwzO1hdC5srqJoJ0B2vHuXBVh1U4NeEf8VD8BPF//AC0vvDV6/wBFkH8llUfn9OgB6VF8WfsvxTuvCGtaeljbmQR2l0XPzkgbS2eMN2I6HitjxdceFPA87eN9R0stfsVtvtECbpDuGOhIHQdeuOKwPG/g3S/i/wCGbDXPD95Cl6ozb3LggMueY3xyCD+Rz6132labJB4asdO1qWK/uIYESeR13LI6gfNg+4oA4r4qeDbn4j+D9Nm0Ux/ao3W4hE52bo3Xkex+6fwrpNT8N6jq/wAPU0BtVkstQa1iikvIM8OoXd3BwcEduDWhfa3BaAqpHyj8q5yfxxbhyqTqxHUIC2PyrOdaEPiZtTw9Wr8EWzVk8KPc/D1/C11qc87vZG1e9cZdjjG4jPP0z071U8I+CX8HeAptAs70TXbrKwuWTaPMcYBxzwOPyrPj8fWu8q0+COu5SMfpXQ6f4ltrsf6xD6kHpSjXpydkyqmEr01ecWjkPhP4Ivfh34b1a51kRNeTuZXWBt+I0U4Ge5OWP4iqPwe8YeJ/Gus69qWpS/8AEmDBbaLYAI3JyFUgZOF659RXq8dzDNkRyIxHUA5xVS9sJBol5aaO0NjcSROIJFjAWOQg4bA9+a1Odqx5l8a7DxZ4ifSPDehWM0mn3b77qdB8gYHADnso+9z1/Cuy0jT9D+F/gVIpp0gs7NN9xcMMGWQ9Wx3JPAH0FN0Sa/8ABngQ3PjXWo7qe13PNdDJG0n5V6Aseg6c5xXitxceIfj14u+z24ksfDdk+ST92Mep7NIR0Hb8yQDrfBPxD8W+P/iO0mnQC38LW24TI8YPy4O3Ldd5ODgHgV3PiH4W+D/E1617qOkJ9qc5eWF2iL/720gE+/WtjSdH0nwX4aFpYQCCxs4mkfAyzYGWY+rHFQ+EPF+meNdGOqaUJxAsrQsJk2sGGD6nsRQBU8GaH4O0VLu38Kx2XmRP5V08MvmyBh/C7Ek/hWrr3hvR/E9mlprVhHeQRyCREfI2sOMggg9zVbw74N0TwrcahPpFqYZL+XzZyXLZPJAGeg5PHvW9QBDaWdtYWkVraQRwW8ShY4o1Cqo9ABU1FFABRRRQAUUVkeKNXuNB8NX+qWmnyX89tHvW2j6vyB6Hp16dqAK3irwVoPjOzS31qyEpjz5UyHbJHnrtYfTp0rIvPDeqeEfh7/Y/gBV+2QvmL7W4YkM2XOW4zz9K4rSf2jdJkcQ63ot5YyA4ZoWEqj6g7SP1r2WyvINQsYL21kElvcRrLG4/iVhkH8jQBFpjXq6PaNqpiW+ECm5MZ+QPj5se2c1SMnh7xlpU9qJbDVrFjslRHWRQffHQ1qzwx3EEkEqho5FKOp7gjBFeHaz8DdV0K9bVfAGuT204ORbSylGx6BxwR7MPxoA7qz8LaZ8LPDGu6j4b0+6vJmTzzbPKWL7c4UcdBknuayfCXjnQPjDpF5oGr6X5V0I981q53KVBA3o3BBBI9CK3LjxdL4H8B6bqPjdi1+xWGf7IgbMhyR0wPujntnpWi8Gg6LaXPiKw0+1guLyISPcRwhHkBG7J7+9KTUVdjjFyaS3KNpDonw70FNI0v91AjM5Msm4hm5OSep9q5y9+IMRdlj86X3UYH61xeq6pNq989zM5IJO1c/dFVAVUD5QevWvGq46pJ+7oj6/C5FRhFOtqztLfxFa3jWtxcTCHZI3mxmZl+XPGVAIbIz1rF0S+ghmm+0SKkfzMi7Op5PX8MfjWMsijOY1POaPMQbv3S89OvFcsqspPVHpQwVOEXGOz/A3bPU7eCXUXmmEhlURRkDaXG7qRjHT1/Wrcut2a63aXsW1YFDh9p+ZhnjcAo/CuULAgYGMU3dTU3Yp4OEnd/wBaWO9tvGkFnFbOGlLsh8wKB8pzXW6L4wtdQIVZlY91PDD8K8igu7aOPD2Ecjf3t5FEl7GJEltYPs0qHIdHJq6WNrQla2nyPOxGTUat+VNPue5a/oOmeMNBl0vUkaS0mKsQjlWBByCD9RXD+LfGGgfBrw/a6Jo2nB7uRC9vbjOOuDJI3U5P4nHaui8C66dX0394R5qHa4Hr61uanoujXtzDqWo6da3E9kC0U0sQdox1OK9ylUVSKkj5GtRlRqOnPdHAfCdfHmpT3uu+LbqRbG8jH2aylULgk53Bf4Fxxjqc16ZbWltZQiG0t4oIgSQkSBVyevArkLHxl/wnXgvVr3wW7Lfxb4IDdx7MSYBB7joeP1rB+GXgjxho+tXWu+K9clnnuIjH9j88yDJIO5j90YxwB61oZHpd/wDav7OufsPl/bPKbyPM+7vwdufbOK8p8AeDPH8fi7/hI/F2uSAKrr9jWfeJMjAyF+RVHUY9O1evVi+IfFuheFLdJtb1KG0WTPlq2Sz464UZJoA2qK8Y1n9ovQrcmLRdKvNQl6K0mIkJ/Vj+QrFXxl8Y/GDg6Lov9mWzHiTyAgx/vy9fwFAH0DRVTS1vk0mzXU5I5L8QoLh4hhWkwNxHtnNFAFuiiobySaGyuJbaHzp0jZo4icb2A4Ge2TxQBQ1Pw1oetf8AIT0ixuznO6aBWP5kZrSjiSKFYYlWONFCoqDAUDgACue8Eat4g1nw/wDavEmkDS77zmUQjIygxhsEkjuPwzVvxVr48L+GrzWWs5rwWyhvJh+82SB+A5yT6UAY/hTwtrXhTSdYSTXJtZvLmR5rb7VkKjYO1TknqcZxgV5i/wAV/iV4WmYeJvCizQBuZBC0Yx7OuVr23QNWGvaBY6qLaW2F1EJfJmGGTPY1okBgQQCD1BoA818G/FTw78R7z+xZtKkiuthmEF0iyxtt9D6j3Are8fqzeGboR/wp0Hp3p/h/V/B2panqsuhJYtfWJMd5JDbhHHX+LA3DKnkccVw83j231aaS3NvcGN1cncQBgAk1zYqcVTafU78vw9WpVVSnG6i02cODilz05qDf3Ax7VcWxkG0TTwQOwyscjEH2zxgfjXh2P0CTUdyLdz71s6d4a1PUyBFAwH+6Sfy7fjWx4U8NF5ftF4nKnpnp7D3Pr6V69p4tltFW2jWNF42KOhrTDUvrEmk7Jfj6HiZjm31f3aSu+54jq3hSbRo4Xv5/s/nEhNyZyR16Gq1j4envmkENxA4C5V1PBPoe4rtPi43GlJ7yH/0GuV0LUP7Ps2jt4jNeXDfIi9h70sVh5Uny0m2x4bG1quGVWTV/w3MS6tprKdoLiMxyL1B/nUGeOtdLrmjXDut1cTRRysoMm9jtz04OOP5VzM8UltK0UqlXXqDWfLKL5Zq0luj0sNXhXgpRdz0P4VswmvmY4jyo/HmvVgQw4INeE6R4ii0TRoCIpSXlcMUI5Iwc8+xH5V0uk/EizaeNJnlhyQMyLx+Yr1cJXhCmotny+Z4HEVsROrGGn+Ra8Z/FDw58NrtdJTS5JLqRPPMFrGsaDcTyT6nB6A1pah4i8Ra58OLfXPB+nAaldBHS3u8AqmcN1IBPHHsc1Y8Z694N8Nmz1LxLFamaTKWzva+dIQOTt4JAGR+dX/CfjHRfGemyXmizvJFC/lOrxlGQ4zjB9q9E8A1dNa8fS7RtRSNL0wobhIzlVkwNwHtnNYXirwB4d8Zz2k2t2bzPa5EZSVk4PUHB5HFdPXlXj/4tan4R8SHR7DwxNe7Y1fz2Zgr5GflAU5x069aAO60fwf4d8PqBpWi2Vqw/jSIF/wDvo8/rW3XgSfF74l37qLHwPwSP+XOds/jkV7pp01zcaZazXluLe6khRpoQc+W5AJXPfB4oAs0UUUAFFFcB8SrL4g3v2FPBV3DbxfN9pyyq+eNpyw6denNAHf0hxjnpXgP/AArv4xakf9N8XeQD1H2+Qfoi4oHwD8T3uDqXjQt6/wCtl/8AQmFAHviTRSMyxyI5XqFYHFVtT1bT9Gszd6ne29nbghfNnkCLk9snvXBfDz4RQeA9Ym1MazcXs8kJh2GPy0wSDkjJyeK6rxd4O0jxrpKadrCSmGOQSo0T7WVgCMg/QmgCjoUvhC6stau/CjabJJNua7e1I+ZyDgt+vt1rx62nu4LiIXMNtHay5iMkUce1dwI+8vTr61654P8AB/hLwmb6w0GSNrm4UfaVa5Ekm0ZAyM8Dk9u9eKwWsthr91pUyFCWkt5Iz367f1wRXBjo3SZ9FkLTVSL8v1GgG2ugs0Z3RuN6H2PIrT+zWV3fNIb7zDPJ8kYUh8k/xZGAAM9DWPHqiSRrHfwNKUG1ZUbbIB6Hsfxq/pmo6Pb3sbG2uWfcAjySDC5PXAFeVOMknY+oqc9r2d/Kx6/pcKwWEKqAMruP41pRXgsQ07NtiRSz56YHWsK2ffaREH+ED8qsJpsurxy2ilgkilXfsoPevXpZO4041YVOl9j8+rY/mqShKPU5nxzeT+I3tLiC1MNvAGBMjjdhiPmI7Dj1q7o2i2+kQ5XElww+eXH6D0FPv9D1OCX7Hc+SI3GGnR85XocLjg/55rokggKDCKRjiscFia2Hbq4ynq3o0dWKaq0lh8PP3VujB1WBbmxdGHB4/A8V5nqM0bPDEjmTyIhG0hGNxBP6DOPwr13Whb2ulyyFQvTn9T+gNeNPqtjE7S29pJJKSSGuGBVT/ugc/jXPjMRDFYj2lNW0V/xPa4fo1KVFxlrZ6Gmn2qGwt7eKGNmO6aTzY1IQNgLkt0yBn8ajNsJlzNYqv/TazYNj6qCR/KsrVLmaWK0jkdiXj8+TJ+87E8n8AMe1bPh/wdqmpm1uoSkMbyLtJYhmXPJGKiFNtKx6lSpGlBzm0j2PxLYeEdQsdMtvFS2Dq7hbUXbhCzkDheQeeOPpWnpel6H4Zgj0/Tbaz0+OZyUhjwhkbvx1Y4qh4j8MeG/E17psGsxxTXVm5ntojNtc9M8A5ZeBn6U3xD4G0nxLr+j6zfPcrc6VJvhEUm1WOQwDDHqB0xXvH5+9WdKWUMFJGT0GetLXK6t4GtdW8caV4pkv7uOfTk2Lbo37t+vX0+9z68VoeLdIvte8MXum6bqT6bdzqBHcpnK4IJHHIBAxx60CNqivM/hz4L8a+F9YuH17xMNR04w7I4PNkl+fIw3zj5cAHp1zXQfEE+MB4fT/AIQsQnUPOHmeZtz5eDnbu+XOcde1AHWUVw3w3ufHlxa33/Cb20MLKyi2ZQgduu7IQ4x0x+NFAHc0VXv3uo9OuXsoklu1iYwxucKz4O0E+hOK8HfRvjd4vkZL29/se2Y4KiZYQB9I8sfxoA9x1DW9K0kA6jqVpaA9PPmVM/maurIrxCSNg6MNylTkMPavENL/AGdLeSUXHiLxDdXkpOXW3Xbn6u2SfyFe02NlBp1hb2Nqmy3t4lijXOcKowB+QoA5bwr4v1HxfpOsSRaLPpV3aSPDbi7ztkbB2k8DocZH615jJ8OPix4rlYeIfEq2luWOYxcEjHskeF/M175NNHbwSTSuEjjUu7HoABkmvEde+O91qV4dK8CaNNfXTHatxLEWz7rGOfxOPpQB0ngf4S6P8PdROtT6vLcXflmLzJdsUS7uvGeSfc1x/wAVtKk0rxkb9MrDfKJUcdnXAYfyP416LeeEp/H/AIB02w8Zq9rfgrPOtm4Xa4yAO4+6eR61e1TS/Dfiiwfw6bm2uZ7BVxEk4aWHAwCcHI9OayrQ542O/LsZ9Vrqb22Z8+tqsjMXNraGU8mQxck+uM4z+FI13YyndNbSwuepgYbT+B6fnXpsfw00S3nPmm6k2nmN5MD9BUF38MtKmkL29xc24P8ACCGA/OuD6tL+U+mWc4S9k2ibwTrtnqwSze4MRXAYy4z9ePX+det21vFawiOFQFH6+9eS6T8PtO0u6S5a6uZpE6ZYKPxA61vwa5f6bI0ds5ltgcKknzYHt3FDxrwcI063wdO6/wCAeFisNQxNaVTCvXrc2/ELf6eg9Ix/M1nW9yIThz8nqe1Z9/rlxfTiVrcI20LgAmqgWW+JilleEOMKy4+U9jjn9a3rZzgqtBUV7zfy19WcNPLMRCr7STsl8/wRjeOfFdsv+gohn3KRsD7ePU9+emPTNeenVSxy1jYkj7v7rGPbg8/jXoB+GVtLcNLPql1KWOWJAyfqauy/DfQpIFjUXCMv/LRZOT9c8VyUsHKK1Wp9LSzHBUYqMW2eUvJPeXe9yZJZCAMDqegAFfQ/g3TGtrO1SQf8e8Sg/wC9iua0XwJpWl3iTQpLcXAPyNK2cH2HSu8e60nS0h0y+v7aC4vAVSOSYI8pPB2gnJ/Cu2hRcXdnmZtmNPEKNOktEZsvg/QNY8a2njBZ5JdQskMKeTODHxkcgdxuPeuL8a+G/imfFk+q+F9d32MhXyrTzggiAABBRhtPOTnrzWBqXwd8WeDb6TVPAGuSuuSxtXcJIR6c/I/44q1ofx3vdJvBpXjvRJ7O5TAa4iiKn6tGe3uv5V1nhndeMfG2o+BPB+najfaU2o3j7Irr7O22ON9uWbODgZBArI8MfHXwv4ivrawmiu9PvLhxHGsyhkLHgDcPU+oFelQTQX1nFPCyy286B0bHDKRkH8qyH8F+GX1SLUzoWni9hYOkywKGDDoeOpoA3CyhgpYBj0GetLXmfxH+FM3jbVoNXsddmsLyCERKjAsnBJyMEFTz71xS6F8bfCDBbDUP7XtlOAvnLMCPpJhh+FAH0DRVTS5L2bSbOTUoUhvnhRriJDlUkIG4A+mc0UAW6KK5H4ix+MJvDqReDDEt9JMFldmVWWPByVLcZzj3x0oA1PEXi3QvCtobjWdShthjKxk5kf8A3VHJrx/VvjV4h8U3j6V8P9DnZjx9qkj3uB67fuoPdiaueHvgJ9pu/wC1PG+rTajeOdzwRSMQT/tSH5j+GK9g0rRtN0OyWz0uxgs7df8AlnCgUH3Pqfc0AcP8NPCfi3R/7QvfF+tPfS3ygfY2lMqx+pJPAOOMLxXaaR4f0fQYnj0nTLWyWQ7nEEQXcffHWsbx74903wDo6Xl8kk085KW1vH1kYDJyewHGT7074f8Aiu58aeFo9YudMbT2kkZFjLFg6joykgcHp+BoA5v4s6h45P2HRfCGnzlL5SJ72Ecx8427uicc7vyqv4G8CaX8J9Ju/EfiDU1a+eLFxOSfLjUkHavdiSBz1PYV6bfXsGm6fc31y2yC3iaWRsZwqjJ/QV84XFx4h+PXi77PbiSx8N2b5JP3Yx6ns0hHQdvzJAPcNN1LS/GmjprOiTmWFmZMshQkjggg9DUTW7qSGUgjqDXNeMPFmkfBrwnp+j6LZxS3TcW9s7H7v8UjkcnJ/Mn2rudJvG1Pw3YalqlstjcT26SSxO2PLZgOMn696VhpmJcxTNH5cSEs3GfQU6x0BWIM5Lf7I4FdL9hQHIwRU8cKp2rkqYGlVqe0qq9tl0OiOKnCHJDQzDoVkYsfZk+uKxL3QPLYtbsR/st/jXZ1FJAr9qK2Aw9WNpQXy0Cni60HdSOThSVox5iFXHBFTLbu7BVUknoBW/8AYUJ54qC+uPsOh3t9pkC3k8MEjxRI2fMdQSFyPcYrphFxiot3MpTu7pGdqF/png3RZta1mfyoY8BmCliCTgAAdSc1yXjHwTonxg0ay1zRtWCXMaFLe5UEoRnJR16gg59x70ngrxrpXxf8O6joWu2MUN4FxPaqxwyZ4dM8gg4+hx6151/xUPwE8X/8tL7w1ev9FkH8llUfn9OlmZ663iKx+F3g/RrTxXqs11cEeR9oWNnLkc59cAEDJ5relsvDXjbSoLmW3sNWsn+aKRkWQfge3uKg1PSPD/xE8KW5vYBc6fdRLcQSH5Xj3LkMp/hODWL4YTwn8OtGbRrLVJZ085pWLHzG3HA/hGB0FJtLczqVadNXnJL1NDxL4T1PV9Y0C60vXptLtNNl3TWsIIWZQRgYBA6AjByMGtrxDr9h4Y0S41fU5GS0twN5Rdx5IAAH1IqraeMdCvHCJfLGx6CVSn6nitS9srPVtPls7yCK5tJ12vG4DK4oTT2CnWp1VeEk/Qx/DHjfw94vg8zRtSimcDLwN8sqfVTz+PSuhrxLxP8AACATHUfBupS6ddodyQSyNsz/ALLj5l/HNdz8NIPGVroE1v4zdHuo5dtu+9Xdo8fxFeDz0PX1pmh2lFFFABRRRQAV5Z8U/iB4h8P6pZeH/DGlSTajeoJFuDEZAMsRtVehPHJPTNep0YGc96AOE1S70KDwhpE3xNGli+VA7RzIH/e452KMk++OKveH/iR4N8QXUen6TrFu0/3Y4GRoi2OyhgM/QV594D0ay+IPiTxB4z8TRrepa3bW1nayjdHCiDOdvfgjj1ya0NY8P+C/iR4Bvda8O2UVlc2YkNvdQ2/kOskY3YIGMg8fTPqKAPXJI0mieKVFeNwVZWGQwPUEVhahdaD4A8LXV6ttb2On2yl/KgQIHY9AAOrE4FZvwu8Q3PiX4d6ZqV8+662tFLIf4yjFdx+oAJryLxpq978YfiJbeFNDlP8AY1nITJOv3Tjh5T6gdF9c+9AEvw50C++KHjq68ceIo92n28v7iFhlHcfdQeqoMZ9T+Ndd8afDninxbPoej6NbM+mvKXupVYBUfIAL89ACT/kV3kh0nwB4JkaKMQ6dpdsSq55bA9e7MfzJrjfgv4i8T+K7DV9Y124ElnLchbNNgXZjO4LgfdGVHPoaALHxM8ZXXw08F6ZFpnlzXjsltE1yCw2IvzMQCMngfnW3rvjQ+Gfh1F4m1GyLzmCFnto22/vH2/Lk9ACf0qv4i1HwZrni+w8H65bLd6kB9pt45IiUU4J+8O5APHTitfxj4TsvGfhubRb2SWGJ2V1khxuRlORjPHtQBVi8b2svw4/4TL7JKIBaG5Nvn5uMjbn6jr+NJ4Q8YHxp4LOuafZeTcMJEW3lfI8xeg3ccHjn3q7F4T0+LwSPCgMpsPsZtCxb5ypXBOfXvUXgrwhZeCPDyaPYzTTRiRpWklxuZm+nHQAfhQBB4Om8S6v4WmXxhYxWV/I8keyBsfuyMA8E4PJ79gao+DtN8M+AJB4PtNZMt/cO10sFzKDIQR2AAA4X8cE1y/h/xxrsfx21jwvq92HsZS4s4igAjwA6YOM8pnPvWX8ddEudI1XR/HulBluLSVIp2XsQcxsfbqp+ooA6G9+E81v8UrLxdoN/FYW/m+be2+CCx/j244ww6g9CSa9CubfSPEWmvDcR2eo2TN8yttlTI/MZFRaRqNv4n8MWl+qMtvqFqHKHggMvI/WuYXwxpvw68A6jZaM9xsnkLFppNzbnwvoOwpN2VzOrUVOnKb6K5g+JvEzXr/2bpuLfS4B5aJENocDjt/D6CuZVSxCqCSeAB3p0UMk8qxQxtJI3CqgyTW5oGnz2ni/Tre9t3ifzA2yQY7Eg/pXG25O7Pg5Sq4yspT6tLyVy/Z/D3U7i2WWeeC2ZhkRvkn8cdKn07UNV8E6nHY6nl7CQ8YO5QP7yn+Yqr4pTUNU8Zz2dsZZXQqIkVsBRtBJ9vrWj40JtvDWlWF7KJdQUhmOcnAGD/QfhWlkrtdD01CnRVSpQTi6fW+j1tY9ER1kRXRgysMgjoRS1znge8a78L24c5aFmiz7A8foRXR10J3Vz6ihVVWlGouquFFFFM1CiiigAooooA8T8zWPg34p1SYaVc6l4S1Sc3Ae2Xc9q56gj9OcAgDnPFN1b4lXPjDSpfDXgDw7fLPeqYpbiWERRwI33jwSASCeTjr3Ne3VznjbxbZeCPDFzq1yFLqNlvDnBlkPRf6n2BoAraN4Jj0n4br4Siu3jLWjwyXUQw29wdzD8WOKg+Hfw7sPh/pc0EE32q8uG3T3TJtLAdFAycAfXqax/gzrPivxFoV9q/iOfzbe5nzZZjCkKM7sYH3c4Az6GvRrm4htLWW5uJBHDChkkduiqBkk/hQByvj7w9Z+ONGfwudajsrtmS42KQzlVPdMglf6gVt+HNBtPDPh+y0axB8i1jCBj1Y9Sx9ycn8a5zw/pnhHxV4jHxA0eeW5u9ptvMDMqAgbTlCAc7T9Oa7C8mggs5ZLq4S3hCkNK7hAoPGcnpQAxtOsH1FNRazt2vUQxrcGMGRV7gN1xUepa1pmjCA6lf29oJ5BFEZpAu9j2Gaw/Afg6HwZo09pBqtzqMdzObgSzsDgEDpj6Zz3q94k8IaJ4sWzXWbP7QLSXzYfnZcHvnB5BwOPagDcqjp2taZq73Kadf2901rJ5U4hkDGNvQ46VexxivK/hP4A1rwZrviOfUvKFrdyKLfZJuMgDMdx9OCOtAHJ/GRG8LfFbw14siBVHKeaR3MbYb80YD8K96lhtr+0Mc0UVxbyqMpIoZWHXkHg15l8fdF/tP4cteohMunXCTcf3T8jf+hA/hXSfC/Wv7e+HGi3bPulSAQSn/aj+X+gP40AZfhH4lQa1441bwjNpg06WwZ0thv8A9YqHaRjAwcYIA7fSum8Y2jXnha8RBlkUSAf7pyf0zXj/AMZNPuPBvj3RfH2mpgPKqXAXgF1HQ/7yZH4V7nYXtvq2l219bnfbXUKypnurDI/Q0mrqxnWpqrTlB9VY4LwOi2+i6rqNvCJr6IERrjJxjPH1P8qzfD9zqGs+NbS6uS8sqMS524CKAfyFXdSstT8E6tJf6aN9hKehGVA/ut6explz8Q714HS1soLaVxzKDk/UVz6KyfQ+WcqdFQpV5OLpu9raS1vco+JNQuLLxnfXNlO0UgYLvQ/7IBFYFxcTXczTXEryyt1dzkmmO7SOzuxZ2OWYnkmtzw14ZuNeu1ZlZLJD+8l6Z/2R6n+VZ6ydkeZeri6zjC/vNu3qd94EtGtfC0DOMGZ2l/AnA/QV0tNjjSGJIo1CogCqo7AU6uxKysfd0KSo0o010VgooopmoUUUUAFFFFABXI+Ofh7pnj6PT49SuLqJLOUuBAwG8HGQcg+g5rrqKAIbS0t7CzhtLWJYbeFBHHGgwFUDAArkPGXxE0Pwtq2n6HqME11NqRCNFEoYIjHblgTyCc8exrta4u/+Gmk6l8Q7fxhdTTyXECrttjjy96jCt68dcevNAHTaTo2m6DYCx0qyhtLUMWEUS4GT1NYfjq38NaxpUXh3xHqKWq6lIqwKJgju6kEbc++OvrXVVi614T0TxDfafe6pYJcXGnyeZbOWI2HIPY8jIBwfSgC9pWm2+jaTaaZaBhbWsSwxhmydqjAye9YHiDTvFt14s0O50bVLe20aFs6hbuvzSjPbg5446jB5rq68Z1fxTrQ/aO03Q7fUZo9OWNUktt37t8xM5JHc9OfagD2avIfCHjXXb743+IvD1/d+Zp8Yl+zw7QBHsZQMHGeQTmvXq8B0v/Qf2q72M8CcPjPP3oA39KAPbdf0pNc8PajpUgG27t3h57EggH8Dg1wPwR8O+IfDHhvUdO120NsBeF7dS4bI2gMRg9MgY/GvT6KAKWq6Rp2uWD2OqWcN3auQWilXIyOh+tWYIIrW3jt4I1ihiUIiIMBVAwAB6VJRQAjosiFHUMpGCCMg1zt54H0K7cuLZoGPXyXKj8uldHRSaT3MqtClVVqkU/U5q08CaFauHa3ecj/ns5I/IYFdHHGkMaxxIqIowFUYAp1FCSWwUqFKirU4pegUUUUzUKKKKACiiigAooooAKKKKACiiigAooooAK4b/hW8B+K3/CcHUHLeVtFqU4D7Nmd2emO2OtFFAHc1wtx8Nbef4qweNxfujRx4a1Ef3nCFAd2emD0x2oooA7qiiigAooooAKKKKACiiigAooooAKKKKAP/2Q=="
    this.setData({
      codeBase64
    })

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

        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        const ctx = canvas.getContext('2d')
        //缩放当前绘图
        // ctx.scale(dpr, dpr)
        
        // 透明像素设置成白色
        this.bgToWhite(ctx, canvas)
        this.drawRamText(canvas, ctx)
        const endHieght = this.drawTitle(canvas, ctx)
        this.drawQRCode(canvas, ctx, endHieght, pageObj)
        ctx.save(); //保存之前的画布设置
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
  drawTitle(canvas, ctx) {
    const awardTitle = app.awardsConfig['title']

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
  drawRamText(canvas, ctx) {
    const awardNames = []
    const awards = app.awardsConfig["awards"]
    for (var i = 0; i < awards.length; i++) {
      awardNames.push(awards[i]['name']);
    }

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