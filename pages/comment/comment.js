import api from '../../service/index.js'

Page({
  data: {
    params : {},
    count:'',
    hotcomment:[],
    newcomment:[],
    hasMore: true,
    newpage:1,
    lastcount:''
  },
  onLoad (option) {
    wx.setNavigationBarTitle({
      title: option.title
    });
    this.setData({
      params : option
    });
    this.init()
  },
  init(){

    api.newcomment({
      data:{p:this.data.newpage,docurl:this.data.params.url},
      success:(res)=>{
        let count = res.data.count;
        this.setData({
          newcomment : res.data.comments,
          count : count
        })
        if(count<20){
          this.setData({
            hasMore: false,
          });
        }
        api.hotcomment({
          data:{p:1,docurl:this.data.params.url},
          success:(res)=>{
            this.setData({
              hotcomment : res.data.comments.slice(0,10)
            })
            wx.stopPullDownRefresh();
          },
          fail:(err)=>{

          },
        })
      },
      fail:(err)=>{

      },
    })


  },
  loadMore(){
    let currentPage = this.data.newpage;
    this.setData({
      lastcount : this.data.count -20*currentPage
    })
    let lastcount = this.data.lastcount;
    if(lastcount<0){
      this.setData({
        hasMore: false,
      });
      return
    }
    currentPage++;
    api.newcomment({
      data:{p:currentPage,docurl:this.data.params.url},
      success:(res)=>{
        let newDatas = res.data.comments;
        newDatas = [...this.data.newcomment,...newDatas];
        this.setData({
          newcomment:newDatas,
          newpage: currentPage,
          count : res.data.count
        })
        wx.stopPullDownRefresh();
      },
      fail:(err)=>{

      },
    })
  },
  upComment(event){

  },
  onPullDownRefresh () {
    this.init()
  },
  onReachBottom () {
    this.loadMore()
  },

})
