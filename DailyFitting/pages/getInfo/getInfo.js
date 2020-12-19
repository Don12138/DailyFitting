const heights = []
const weights = []

for (let i = 100; i <= 250; i++) {
  heights.push(i)
}

for (let i = 20; i <= 200; i++) {
  weights.push(i)
}
Page({
  data: {
    step:0,
    openId:null,
    heights:heights,
    weights:weights,
    height:160,
    weight:50,
    value:[60,30],
    gender:true,
    activityLevel:-1,
    waterLevel:-1,
    waterCurLevel:2500,
    hasFruit:false,
    fruitTime:[false,false,false],
    waterNum:0,
    getupTime:[1],
    sleepTime:[4],
    hasGetupTime:false,
    hasSleepTime:false,
    showGetup:false,
    showSleep:false,
    getupTimeList:["06:00","06:30","07:00","07:30","08:00","08:30","09:00"],
    sleepTimeList:["20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],
    background: "rgba(172, 235, 225, 0.521)",
    timeList:["06:30","08:00","09:30","11:00","12:30","14:00","15:30","17:00","18:30","20:00","21:30","23:00"],
    timeListButton:[false,false,true,true,true,true,true,true,true,true,false,false]
  },
  onLoad: function (options) {
    this.setData({
      openId: wx.getStorageSync("openId")
    })
  },
  bindChange:function(e){
    this.setData({
      height:e.detail.value[0]+100,
      weight:e.detail.value[1]+20
    })
  },
  switchGender:function(e){
    this.setData({
      gender:!this.data.gender
    })
  },
  choose_activity_level:function(e){
    var that = this
    wx.showActionSheet({
      itemList: ["不运动（一周内基本没有运动量）","轻度运动（一周运动2～5小时）","中度运动（一周运动5～7小时）","重度运动（一周运动大于7小时）"],
      success(res) {
        console.log(res)
        that.setData({
          activityLevel:res.tapIndex
        })
      }
    })
  },
  backToPersonal:function(e){
    wx.navigateBack({
      
    })
  },
  toNextStep1:function(e){
    if(this.data.activityLevel==-1){
      wx.showToast({
        title: '请选择您的运动量哦',
        icon:'none',
        duration: 2000
      })
    }else{
      var today = new Date()
      var month = today.getMonth()
      var act
      switch(this.data.activityLevel){
        case 0: act = 0;break;
        case 1: act = 3;break;
        case 2: act = 6;break;
        case 3: act = 7;break;
      }
      var add=150-13*Math.abs(month-5)
      var level = Math.round((this.data.weight * 31.3 + add * act - (this.data.gender ? 0 : 100)) / 100) * 100
      this.setData({
        step: this.data.step + 1,
        waterLevel: level,
        waterCurLevel: level,
        waterNum: Math.round(level / 300)
      })
    }
  },
  toNextStep2:function(e){
    this.setData({
      step: this.data.step + 1,
      waterLevel:this.data.waterCurLevel
    })
  },
  changeWaterLevel:function(e){
    this.setData({
      waterCurLevel:e.detail.value,
      waterNum:Math.round(e.detail.value/300)
    })
  },
  changeLevel:function(e){
    var cur = this.data.waterCurLevel + (e.currentTarget.dataset.isadd == "true" ? 1 : -1) * 100
    this.setData({
      waterCurLevel: cur,
      waterNum: Math.round(cur / 300)
    })
    console.log(e.currentTarget.dataset.isadd=="true"?1:-1)
  },
  refresh:function(e){
    this.setData({
      waterCurLevel:this.data.waterLevel,
      waterNum: Math.round(this.data.waterLevel/300)
    })
  },
  switchFruit:function(e){
    this.setData({
      hasFruit:!this.data.hasFruit
    })
  },
  switchFruitTime:function(e){
    var time = this.data.fruitTime
    time[e.currentTarget.dataset.id] = !time[e.currentTarget.dataset.id]
    this.setData({
      fruitTime:time
    })
  },
  choose_getup:function(e){
    this.setData({
      background:"rgba(97, 168, 156, 0.644)",
      showGetup:true
    })
  },
  switchGetupTime:function(e){
    var cur = [e.detail.value[0]]
    this.setData({
      getupTime:cur
    })
  },
  getupCancel:function(e){
    this.setData({
      background: "rgba(172, 235, 225, 0.521)",
      showGetup:false
    })
  },
  getupConfirm: function (e) {
    this.setData({
      background: "rgba(172, 235, 225, 0.521)",
      showGetup: false,
      hasGetupTime: true
    })
  },
  switchSleepTime:function(e){
    var cur = [e.detail.value[0]]
    this.setData({
      sleepTime:cur
    })
  },
  sleepCancel: function (e) {
    this.setData({
      background: "rgba(172, 235, 225, 0.521)",
      showSleep: false
    })
  },
  sleepConfirm: function (e) {
    this.setData({
      background: "rgba(172, 235, 225, 0.521)",
      showSleep: false,
      hasSleepTime: true
    })
  },
  choose_sleep:function(e){
    this.setData({
      background: "rgba(97, 168, 156, 0.644)",
      showSleep: true
    })
  },
  switch_checked:function(e){
    var cur = this.data.timeListButton
    cur[e.currentTarget.dataset.index] = !cur[e.currentTarget.dataset.index]
    this.setData({
      timeListButton:cur
    })
  },
  saveData:function(e){
    var that = this
    if(this.data.hasGetupTime&&this.data.hasSleepTime){
      // console.log(this.data.openId)
      // console.log(this.data.activityLevel)
      // console.log(this.data.height)
      // console.log(this.data.weight)
      // console.log(this.data.waterLevel)
      // console.log(this.data.getupTime)
      // console.log(this.data.sleepTime )
      // console.log(this.data.timeListButton)
      // console.log(this.data.hasFruit)
      // console.log(this.data.fruitTime)
      var cur = 0;
      for(var i =0;i<=11;i++){
        cur+=(this.data.timeListButton[i]?1:0)*Math.pow(2,i)
      }
      var val = 0;
      for(var i = 0;i<=2;i++){
        val+=(this.data.fruitTime[i]?1:0)*Math.pow(2,i)
      }
      wx.request({
        url: `https://dailyfitting.applinzi.com/DailyFitting/index.php/Home/User/change_gender`,
        header: { 'content-type': "application/x-www-form-urlencoded" },
        data:{
          gender:this.data.gender
        }
      })
      
      wx.request({
        method: 'POST',
        url: `https://dailyfitting.applinzi.com/DailyFitting/index.php/Home/User/insertorsave_userInfo`,
        data: {
          openId: that.data.openId,
          stage:that.data.activityLevel,
          height:that.data.height,
          weight:that.data.weight,
          target:that.data.waterLevel,
          getUp:that.data.getupTime,
          sleep:that.sleepTime,
          timePoint:cur,
          fruit:val,
          day: Date.parse(new Date())
        },
        header: { 'content-type': "application/x-www-form-urlencoded" },
        success(res){
          wx.reLaunch({
            url: '/pages/personal/personal'
          })
        }
      })
    }else if(this.data.hasGetupTime){
      wx.showToast({
        title: '请选择您的就寝时间',
        icon:'none',
        duration: 2000
      })
    }else if(this.data.hasSleepTime){
      wx.showToast({
        title: '请选择您的起床时间',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '请选择您的起床与就寝时间',
        icon: 'none',
        duration: 2000
      })
    }
  }
})