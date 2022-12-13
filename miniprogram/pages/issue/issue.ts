// pages/issue/issue.ts
Page({

    data: {
        price: '10.2',
        priceError: false,
        items: ['light', 'dark', 'outline', 'light-outline'],
    },
    onPriceInput(e:any) {
        const { priceError } = this.data;
        const isNumber = /^\d+(\.\d+)?$/.test(e.detail.value);
        if (priceError === isNumber) {
          this.setData({
            priceError: !isNumber,
          });
        }
      },
      handleClose0() {
        this.setData({
          [`show[0]`]: false,
        });
      },
      handleClose1() {
        this.setData({
          [`show[1]`]: false,
        });
      },
      handleClick(){
        wx.navigateTo({
            url: "/pages/succ/succ",
          })
    },
    onShow() {

    },
    onShareAppMessage() {

    }
})