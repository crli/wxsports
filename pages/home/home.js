import api from '../../service/index.js'
Page({
  data: {
    swiper: [],
    news: [],
    swiperCurrent:1
  },
  onLoad: function () {
    api.news({
      data:{id: 'TY43,FOCUSTY43',page: 1},
      success:(res)=>{
        res.data.forEach((obj, index) => {
          if (obj.item){
            let type = obj.type;
            if (type == 'focus') { //首页轮播图
                this.setData({
                    swiper: obj.item,
                });
            } else if (type == 'list') { //首页新闻列表
                this.setData({
                    news: obj.item,
                });
            }
          }
        })
      }
    })
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  handleCurrent(e){
    this.setData({
      swiperCurrent:e.detail.current+1
    })
    
  }
})