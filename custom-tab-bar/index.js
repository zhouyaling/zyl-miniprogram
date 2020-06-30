const app = getApp()
Component({
  data: {
    selected: 0,
    list: []
  },
  attached() {
    this.setData({
      list: app.globalData.barList
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      // this.setData({
      //   selected: data.index
      // })
    }
  }
})