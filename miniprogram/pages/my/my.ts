Page({

    data: {
        users:{
            avatarUrl:"/static/images/users.png",
            nickName:"立即登录"
          },
        loginStatus:true,
        dialogAboutUs:false,
        dialogContactUs:false,
        dialogNewVersion:false
    },
    aboutUs(){
        this.setData({dialogAboutUs:true}) 
    },
    closeUs() {
        this.setData({dialogAboutUs:false})
      },
    contactUs(){
        this.setData({dialogContactUs:true}) 
    },
    closeContac() {
        this.setData({dialogContactUs:false})
      },
    newVersion(){
        this.setData({dialogNewVersion:true}) 
    },
    closeVersion() {
        this.setData({dialogNewVersion:false})
      },
      //获取用户头像
    getUerInfo(){
        if (this.data.loginStatus) {
        wx.getUserProfile({
            desc: '获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
            wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
            this.setData({
                users:{
                avatarUrl:res.userInfo.avatarUrl,
                nickName:res.userInfo.nickName
                },
                loginStatus:false
            })
            }
        })
        }
    },
    handleClick(){
        wx.navigateTo({
            url: "/pages/issue/issue",
          })
    },
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})