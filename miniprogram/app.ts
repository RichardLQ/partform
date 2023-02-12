// import request from "./utils/http"
// import {getList} from "./utils/api"
App<IAppOption>({
  globalData: {},
  onLaunch() {
    let openid = wx.getStorageSync('openid')  
    if (!openid){
        let that = this
        wx.login({
            success: res => {
                wx.request({
                    url: "https://www.sourcandy.cn/part/index/getOpenid",
                data: {"code":res["code"]},
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: "GET",
                success(res: any) {
                    that.globalData.userInfo = res.data
                    wx.setStorageSync('openid', res.data.data)
                }
                })
            }
        })
    }



  }
})