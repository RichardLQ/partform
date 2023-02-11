  Page({
    data: {
        backTopTheme: 'round',
        backTopText: '顶部',
        backTop:false,
        doubleColumnsTree: {
            options: [
                {
                    label:"全市",
                    value:"0",
                    options:[
                        {
                            label:"全区",
                            value:"0-0",
                        },
                    ]
                  },
                {
                  label:"东莞市",
                  value:"1",
                  options:[
                      {
                          label:"东城区",
                          value:"1-0",
                      },
                      {
                          label:"莞城区",
                          value:"1-1",
                      },
                      {
                          label:"水乡片区",
                          value:"1-2",
                      },
                  ]
                },
                {
                  label:"深圳市",
                  value:"2",
                  options:[
                      {
                          label:"福田区",
                          value:"2-0",
                      },
                      {
                          label:"龙华区",
                          value:"2-1",
                      },
                      {
                          label:"龙岗区",
                          value:"2-2",
                      },
                      {
                        label:"罗湖区",
                        value:"2-3",
                    },
                    {
                        label:"宝安区",
                        value:"2-4",
                    },
                    {
                        label:"坪山区",
                        value:"2-5",
                    },
                    {
                        label:"光明区",
                        value:"2-6",
                    },
                  ]
                }
            ],
            value: ['0', '0-0'],
          }, 
          city:"",
          area:"",
          content:"",
          page:1,
          areaList :["city","area"],
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
    handleTreeSelect(e:any) {
        this.setData({
          'doubleColumnsTree.value': e.detail.value,
        });   
      },
      confirmSelect(){
        var options = this.data.doubleColumnsTree.options
        var values = this.data.doubleColumnsTree.value
        for (let index = 0; index < options.length; index++) {
            if(String(index) == values[0]){
                var temp = this.data.areaList[0]
                this.setData({[temp]:options[index].label})  
            }
            var opt = options[index].options
            for (let index2 = 0; index2 < opt.length; index2++) {
                if(opt[index2].value == values[1]){
                    var temp = this.data.areaList[1]
                    this.setData({[temp]:opt[index2].label})  
                }
            }
        }  
        this.getLists(1,this.data.city,this.data.area,this.data.content)
    },
      handleClick(){
        wx.navigateTo({
            url: "/pages/detail/detail",
          })
    },
      onToTop(e:any) {
        console.log('backToTop', e);
      }, 
    
      onPageScroll(e){
        if(e.scrollTop>200){
          this.setData({
            backTop:true
          })
        }else{
          this.setData({
            backTop:false
          })
        }
      },
      handleTimeout() {
        wx.showToast({
          title: '刷新成功',
          icon: 'success',
        });
      },
    onLoad() {
        this.getLists(1,this.data.city,this.data.area,this.data.content)
    },
    getLists(page:any,city: string,area: string,content:any){
        if(city == "全市"&&area=="全区"){
            city = ""
            area = ""
        }
        var that = this;
        wx.request({
            url: "https://www.sourcandy.cn/part/index/partlist",
            data: {userid:2,page,pageSize:6,city,area,"search":content},
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
      onChange(e:any){
          this.setData({"content":e.detail.value})
          this.getLists(1,this.data.city,this.data.area,this.data.content)
      },
    onReady() { 
    },  

    onShow() {
        
    },

    onHide() {
    },

    onUnload() {
    },

    onPullDownRefresh() {
    }, 
    
    onReachBottom() {
    },

    onShareAppMessage() {
    }
})