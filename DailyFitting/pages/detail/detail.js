// pages/detail/detail.js
Page({
  data: {
    dailyTask: [
      {
        name: "早起打卡",
        image: null,
        remarks:"清早起床精神更佳哦"
      },
      {
        name: "早起一杯水打卡",
        image: null,
        remarks:"要保证一天八杯水哦"
      },
      {
        name: "第二杯水打卡",
        image: null,
        remarks: "要保证一天八杯水哦"
      },
      {
        name: "第三杯水打卡",
        image: null,
        remarks: "要保证一天八杯水哦"
      },
      {
        name: "第四杯水打卡",
        image: null,
        remarks: "要保证一天八杯水哦"
      }, {
        name: "第五杯水打卡",
        image: null,
        remarks: "要保证一天八杯水哦"
      }, {
        name: "第六杯水打卡",
        image: null,
        remarks: "要保证一天八杯水哦"
      }, {
        name: "第七杯水打卡",
        image: null,
        remarks: "要保证一天八杯水哦"
      }, {
        name: "第八杯水打卡",
        image: null,
        remarks: "要保证一天八杯水哦"
      },
      {
        name: "早睡打卡",
        image: null,
        remarks: "要保证一天八杯水哦"
      },
    ],
    index: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      index: options.id
    })
    console.log(this.data.index)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})