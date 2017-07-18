import api from '../../service/index.js'
Page({
  data: {
    swiper: [],
    news: [],
    hasMore: true,
  },
  init(){
    api.news({
      data:{id: 'TY43,FOCUSTY43',page: 1},
      success:(res)=>{
        res.data.forEach((obj, index) => {
          if (obj.item){
            let type = obj.type;
            if (type == 'focus') { 
                this.setData({
                    swiper: obj.item,
                });
            } else if (type == 'list') { 
                this.setData({
                    news: obj,
                });
            }
          }
        })
        wx.stopPullDownRefresh();
        
      },
      fail:(err)=>{
       
      },
    })
  },
  onLoad () {
    this.init()
  },
  loadMore(){
    let currentPage = this.data.news.currentPage;
    if (currentPage >= this.data.news.totalPage) {
        this.setData({
            hasMore: false,
        });
        return;
    }
    api.news({
      data:{id: 'TY43',page:++currentPage},
      success:(res)=>{
        let newDatas = res.data[0];
        newDatas.item = [...this.data.news.item,...newDatas.item];
        this.setData({
          news:newDatas
        })
      },
      fail:(err)=>{
       
      },
    })
  },
  toSwiper(event) {
      console.log(event)
  },
  onPullDownRefresh () {
    this.init()
  },
  onReachBottom () {
    this.loadMore()
  },

})