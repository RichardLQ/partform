import apiBaseUrl from "./env";
 
function SingRequest(params) {
    //测试版
    const baseUrl = apiBaseUrl();
    return new Promise(function (resolve, reject) {
        wx.request({ 
            ...params,
            // url: baseUrl + params.url,
            url:"https://api.vvhan.com/api/acgimg",
            success(ret) {
                resolve(ret);
            },
            fail() {
                wx.navigateTo({
                    url: '/pages/errs/errs',
                })
            }
        })
    })
}
 
// 封装单个及多个网络请求，多次请求按顺序请求
async function Request(params) {
    wx.showLoading({
        title: '正在加载...',
    });
 
    let datas;
    if (params instanceof Array) {
        datas = [];
        for (let i = 0; i < params.length; i++) {
            console.log(333)
            let data = await SingRequest(params[i]);
            datas.push(data);
        }
        setTimeout(function () {
            wx.hideLoading({
                fail: () => { },
                success: () => { },
                complete: (complete) => { }
            })
        }, 1000)
        return datas;
    } else {
        datas = await SingRequest(params);
        setTimeout(function () {
            wx.hideLoading({
                fail: () => { },
                success: () => { },
                complete: (complete) => { }
            })
        }, 1000)
        return datas;
    }
}
 
export default Request;