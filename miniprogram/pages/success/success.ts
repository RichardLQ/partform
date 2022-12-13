// pages/success/success.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    handleClick(){
        wx.switchTab({
            url: "/pages/index/index",
          })
    },
    onShareAppMessage() {

    }
})