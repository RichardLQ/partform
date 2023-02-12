// const util = require('../../utils/util.js');

import Textarea from "../../miniprogram_npm/tdesign-miniprogram/textarea/textarea";

// const api = require('../../utils/api.js');
Page({
  data: {
    copyright: 'Copyright © 2021-2031 TD.All Rights Reserved.',
    partLists:[],
    loadingProps: {
        size: '60rpx',
      },
      rowCol: [
        { width: '100%', height: '342rpx' },
        [
          { width: '340rpx', height: '32rpx' },
          { width: '340rpx', height: '32rpx', marginLeft: '22rpx' },
        ],
        [
          { width: '218rpx', height: '32rpx' },
          { width: '218rpx', height: '32rpx', marginLeft: '144rpx' },
        ],
      ],
  },
  onLoad() {
    this.getList()
  },
  getList(){
    var that = this;
    wx.request({
        url: "https://www.sourcandy.cn/part/index/hotlist",
        data: {"userid":3},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success(res: any) {
              var newArr = res.data.data.map(function(item: any,index: any){
                  item.tag = JSON.parse(item.tag)
                  return item
              })
              that.setData({
                partLists: newArr,
              })
        }
    })
  },
  pays(){
    let openid = wx.getStorageSync('openid')  
    let that = this 
    wx.request({
        url: "https://www.sourcandy.cn/part/index/order",
        data: {"openid":openid,"amount":1},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "GET",
        success(res: any) {
            wx.requestPayment({
                timeStamp: res.data.data.timeStamp,
                nonceStr: res.data.data.nonceStr,
                package: res.data.data.package,
                signType: res.data.data.signType,
                paySign: res.data.data.paySign,
                success (res) { 
                    console.log(res)
                    Toast({
                        context: that,
                        selector: '#t-toast',
                        message: '支付成功',
                        icon: 'success',
                        direction: 'column',
                      });
                },
                fail (res) { 
                    Toast({
                        context: that,
                        selector: '#t-toast',
                        message: '支付失败',
                        theme: 'fail',
                        direction: 'column',
                      });
                }
            }) // wx.requestPayment
        }
    })
    
    
  },
  handleClick(e:any){
      if (e.currentTarget.dataset.buy){
        wx.navigateTo({
            url: "/pages/detail/detail",
        })
      }else{
          this.pays()
      }
   
},
  handleTimeout() {
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
    });
  },
  onShareAppMessage(){
    return {
        title: '单页面分享',
        path: "",
        imageUrl:"https://api.vvhan.com/api/acgimg",
    } 
  },
  onShareTimeline: function () {
    return {
    title: "龙猫兼职",
    imageUrl: "https://api.vvhan.com/api/acgimg"
    }
    },
})
