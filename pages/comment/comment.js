import api from '../../service/index.js'

Page({
  data: {
    params : {},
    joincount:'',
    hotcomment:[],
    newcomment:[],
    hasMore: true,
    newpage:1
  },
  onLoad (option) {
    wx.setNavigationBarTitle({
      title: option.title
    });
    this.init(option)
  },
  init(option){
    this.setData({
      params : option
    });
    let flag = 0;
    api.newcomment({
      data:{p:this.data.newpage,docurl:option.url},
      success:(res)=>{
        this.setData({
          newcomment : res.data.comments,
          joincount : res.data.join_count
        })
        flag++;
        if(flag==2){
          wx.stopPullDownRefresh();
        }
      },
      fail:(err)=>{

      },
    })
    api.hotcomment({
      data:{p:1,docurl:option.url},
      success:(res)=>{
        this.setData({
          hotcomment : res.data.comments.slice(0,10)
        })
        flag++;
        if(flag==2){
          wx.stopPullDownRefresh();
        }
      },
      fail:(err)=>{

      },
    })

  },
  loadMore(){
    let currentPage = this.data.newpage+1;
    if (currentPage >= this.data.join_count/20) {
        this.setData({
            hasMore: false,
        });
        return;
    }

    api.newcomment({
      data:{p:currentPage,docurl:this.data.params.url},
      success:(res)=>{
        let newDatas = res.data.comments;
        newDatas = [...this.data.newcomment,...newDatas];
        this.setData({
          newcomment:newDatas,
          newpage: currentPage
        })
        wx.stopPullDownRefresh();
      },
      fail:(err)=>{

      },
    })
  },
  onPullDownRefresh () {
    this.init()
  },
  onReachBottom () {
    this.loadMore()
  },

})
