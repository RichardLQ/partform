 /**
   * 封封微信的的request
   */
  function request(url, data = {}, method = "GET") {
      wx.showLoading({
          title: '努力加载中',
        })
        console.log(111)
    return new Promise(function(resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'Content-Type': 'application/json',
                'X-Hioshop-Token': wx.getStorageSync('token')
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    if (res.data.errno == 401) {
                        //需要登录后才可以操作
  
                        // let code = null;
                        // return login().then((res) => {
                        //     code = res.code;
                        //     return getUserInfo();
                        // }).then((userInfo) => {
                        //     //登录远程服务器
                        //     request(api.AuthLoginByWeixin, {
                        //         code: code,
                        //         userInfo: userInfo
                        //     }, 'POST').then(res => {
                        //         if (res.errno === 0) {
                        //             //存储用户信息
                        //             wx.setStorageSync('userInfo', res.data.userInfo);
                        //             wx.setStorageSync('token', res.data.token);
                        //             resolve(res);
                        //         } else {
                        //             reject(res);
                        //         }
                        //     }).catch((err) => {
                        //         reject(err);
                        //     });
                        // }).catch((err) => {
                        //     reject(err);
                        // })
                    } else {
                        resolve(res.data);
                        wx.hideLoading()
                    }
                } else {
                    reject(res.errMsg);
                }
  
            },
            fail: function(err) {
                reject(err)
            }
        })
    });
  }

//   module.exports = {
//     request,
//   }
  