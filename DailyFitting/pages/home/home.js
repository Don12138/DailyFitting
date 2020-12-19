const app=getApp()
Page({
  data: {
    dailyTask:[
      {
        name: "早起打卡",
        isOverdue: false,
        image: null,
        ischecked:false,
        startHour:'06',
        endHour:'08',
        startMinute:'00',
        endMinute:'00'
      },
      {
        name:"早起一杯水打卡",
        isOverdue: false,
        image:null,
        ischecked:false,
        startHour: '06',
        endHour: '09',
        startMinute: '00',
        endMinute: '00'
      },
      {
        name:"第二杯水打卡",
        isOverdue: false,
        image:null,
        ischecked:false,
        startHour: '09',
        endHour: '10',
        startMinute: '00',
        endMinute: '30'
      },
      {
        name: "第三杯水打卡",
        isOverdue: false,
        image: null,
        ischecked: false,
        startHour: '10',
        endHour: '12',
        startMinute: '30',
        endMinute: '00'
      },
      {
        name: "第四杯水打卡",
        isOverdue: false,
        image: null,
        ischecked: false,
        startHour: '12',
        endHour: '13',
        startMinute: '00',
        endMinute: '30'
      }, {
        name: "第五杯水打卡",
        isOverdue: false,
        image: null,
        ischecked: false,
        startHour: '13',
        endHour: '15',
        startMinute: '30',
        endMinute: '00'
      }, {
        name: "第六杯水打卡",
        isOverdue: false,
        image: null,
        ischecked: false,
        startHour: '15',
        endHour: '17',
        startMinute: '00',
        endMinute: '00'
      }, {
        name: "第七杯水打卡",
        isOverdue: false,
        image: null,
        ischecked: false,
        startHour: '17',
        endHour: '19',
        startMinute: '00',
        endMinute: '00'
      }, {
        name: "第八杯水打卡",
        isOverdue: true,
        image: null,
        ischecked: false,
        startHour: '19',
        endHour: '22',
        startMinute: '00',
        endMinute: '00'
      },
      {
        name: "早睡打卡",
        isOverdue: false,
        image: null,
        ischecked: false,
        startHour: '21',
        endHour: '23',
        startMinute: '30',
        endMinute: '00'
      },
    ],
    additionalTask:[
      {
        name: " 俯卧撑 ",
        ischecked: false,
      },
      {
        name: " 仰卧起坐 ",
        ischecked: false,
      },
      {
        name: " 平板支撑 ",
        ischecked: false,
      },
      {
        name: " 深蹲 ",
        ischecked: false,
      },
      {
        name: " 波比跳 ",
        ischecked: false,
      },
      {
        name: " 立卧撑 ",
        ischecked: false,
      },
      {
        name: " 引体向上 ",
        ischecked: false,
      }
    ],
    userInfo: {},
    hasUserInfo: false,
    swiperCurrentIndex:0,
    code:0,
    hasCollapse:false,
    steps:-1,
    openId:0,
    session_key:0,
    encryptedData:0,
    iv:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    noOverdue:0,
    show:false,
    authorizeWerun:false,
    hasFillInfo:false
  },
  onLoad: function (options) {

    var that = this
    if (!app.globalData.authorizeWerun){
      app.authorizeWerunReadyCallback = res => {
        this.setData({
          authorizeWerun: app.globalData.authorizeWerun
        })
      }
    }else{
      this.setData({
        authorizeWerun: app.globalData.authorizeWerun
      })
    }

    wx.login({
      success: res => {
        that.setData({
          code : res.code
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          method: 'POST',
          url: `https://dailyfitting.applinzi.com/DailyFitting/index.php/Home/User/getId`,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            code: that.data.code,
          },
          success(res) {
            console.log("获取基本数值的res")
            console.log(res)
            that.data.session_key = res.data.session_key
            that.data.openId = res.data.openid
            wx.setStorage({
              key: 'openId',
              data: res.data.openid,
            })
            var item =that.data.dailyTask
          wx.request({
            method: 'POST',
            url: `https://dailyfitting.applinzi.com/DailyFitting/index.php/Home/User/fromTask`,
            data: {
              openId: that.data.openId,
              index:0
            },
            header: { 'content-type': "application/x-www-form-urlencoded" },
            success(res){//异常处理
              console.log("获取任务的res")
              console.log(res)
              var task = parseInt(res.data).toString(2)
              console.log(res.data)
              console.log(task)
              for(var i=0;i<task.length;i++){
                if(task.charAt(task.length-1-i)==1){
                  item[i].ischecked=true;
                }
              }
              that.setData({
                dailyTask: item
              })
            }
          })
            console.log("werun" + app.globalData.authorizeWerun)
            if (app.globalData.authorizeWerun)
            that.werun()

          },
          fail(res){
            that.setData({
              steps: res.errMsg
            })
          }
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
 
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      } 
 
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
            //缺少code要做处理
          })

        }
      })
    }

  },

  onShow: function (options) {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
            //缺少code要做处理
          })
        }
      })
    }
    var item = that.data.dailyTask
    var cur =0;
    for(var i=0;i<item.length;i++){
      var end = new Date();
      end.setHours(item[i].endHour);
      end.setMinutes(item[i].endMinute);
      var now = new Date();
      if(end.getTime()<now.getTime()){
        item[i].isOverdue=true
      }else{
        cur++
      }
    }
    that.setData({
      dailyTask:item,
      noOverdue:cur
    })

  },


  switchCheck:function(e){
    var that = this
    var item=this.data.dailyTask;
    if (item[e.currentTarget.dataset.id].ischecked){
      wx.showModal({
        title: '提示',
        content: '确定要取消吗',
        success(res) {
          if (res.confirm) {
            item[e.currentTarget.dataset.id].ischecked = false;
            that.setData({
              dailyTask: item
            })
            wx.request({
              method: 'POST',
              url: `https://dailyfitting.applinzi.com/DailyFitting/index.php/Home/User/task`,
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                today: -1*Math.pow(2, e.currentTarget.dataset.id),
                openId: that.data.openId,
                index : 0
              },
              success(res) {
                console.log("-" + Math.pow(2, e.currentTarget.dataset.id))
              },
              fail(res){
                console.log(res)
              }
          })
          }
        }
      })
    }else{
    var start=new Date();
    var end = new Date();
    var now = new Date();
    start.setHours(item[e.currentTarget.dataset.id].startHour);
    start.setMinutes(item[e.currentTarget.dataset.id].startMinute);
    end.setHours(item[e.currentTarget.dataset.id].endHour);
    end.setMinutes(item[e.currentTarget.dataset.id].endMinute);
    if (now.getTime()-start.getTime()>=0&&now.getTime()-end.getTime()<=0){
      item[e.currentTarget.dataset.id].ischecked = true;
      that.setData({
        dailyTask: item
      })
      wx.request({
        method: 'POST',
        url: `https://dailyfitting.applinzi.com/DailyFitting/index.php/Home/User/task`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          today: Math.pow(2, e.currentTarget.dataset.id),
          openId: that.data.openId,
          index : 0
        },
        success(res){
          console.log("+"+Math.pow(2, e.currentTarget.dataset.id))
        },
        fail(res) {
          console.log(res)
        }
      })
    } else if (now.getTime() - start.getTime() < 0){
      wx.showModal({
        title: '提示',
        content: '还没有到达时间呢，确实要打卡吗',
        success(res) {
          if (res.confirm) {
            item[e.currentTarget.dataset.id].ischecked = true;
            wx.request({
              method: 'POST',
              url: `https://dailyfitting.applinzi.com/DailyFitting/index.php/Home/User/task`,
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                today: Math.pow(2, e.currentTarget.dataset.id),
                openId: that.data.openId,
                index : 0
              },
              success(res) {
                console.log("+" + Math.pow(2, e.currentTarget.dataset.id))
              },
              fail(res) {
                console.log(res)
              }
            })
          } 
          that.setData({
            dailyTask: item
          })
        }
      })
    }else{
      wx.showToast({
        title: '时间已过',
        icon:'none',
        duration: 1000
      })
      that.setData({
        dailyTask: item
      })
    }
    }
  },
  swiperToAdditional:function(e){
    this.setData({
      swiperCurrentIndex:1
    })
  },
  swiperToDaily:function(e){
    this.setData({
      swiperCurrentIndex:0
    })
  },
  onShareAppMessage: function () {

  },
  show:function(e){
    this.setData({
      show:!this.data.show
    })
  },
  
  detail:function(e){
    console.log(e)
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + e.currentTarget.dataset.index + ""
    });
  },
    getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.errMsg == "getUserInfo:ok") {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }
    else if (e.detail.errMsg == "getUserInfo:fail auth deny") {
    } else {
      hasCollapse: true
    }
  },


  werun: function(e){
    var that = this
    wx.getWeRunData({//获取微信步数
      success(res) {
        that.data.iv = res.iv;
        that.data.encryptedData = res.encryptedData

        wx.request({
          method: 'POST',
          url: `https://dailyfitting.applinzi.com/DailyFitting/index.php/Home/User/werun`,
          data: {
            session_key: that.data.session_key,
            appid: 'wxbeb2fff4b71189cf',
            iv: that.data.iv,
            encryptedData: that.data.encryptedData
          },
          header: { 'content-type': "application/x-www-form-urlencoded" },
          success(res) {
            console.log("获取werun数值的res" + res)
            console.log(res)
            // console.log(res)  //res异常未处理当res.data=-1时候异常
            that.setData({
              steps: res.data.stepInfoList[30].step
            })

            wx.setStorage({
              key: "werunData",
              data: res.data.stepInfoList
            })
            wx.request({
              method: 'POST',
              url: `https://dailyfitting.applinzi.com/DailyFitting/index.php/Home/User/insert`,
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                userName: that.data.userInfo.nickName,
                gender: that.data.userInfo.gender,
                province: that.data.userInfo.province,
                city: that.data.userInfo.city,
                avatarUrl: that.data.userInfo.avatarUrl,
                openId: that.data.openId,
                steps: that.data.steps
              },
              success(res) {//异常处理
                console.log("插入数据的res")
                console.log(res)
              }
            })
          }
        })
      }
    })
  },
  switchWerun:function(e){
    console.log("1")
    var that = this
    wx.getWeRunData({
      success(res){
        console.log("2")
        app.globalData.authorizeWerun = true
        console.log("appdata中的globaldata" + app.globalData.authorizeWerun)
        that.setData({
          authorizeWerun: true
        })
        wx.reLaunch({
  url: '/pages/home/home',
})
      },
      fail(res){
        console.log(res)

      }
    })

  }
})
