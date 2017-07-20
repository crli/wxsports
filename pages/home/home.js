import api from '../../service/index.js'
import {dealurl} from '../../utils/index.js'
Page({
  data: {
    swiper: [],
    news: [],
    topic:[],
    hasMore: true,
  },
  init(){
    api.news({
      data:{id: 'TY43,FOCUSTY43,TYTOPIC',page: 1},
      success:(res)=>{
        res.data.forEach((obj, index) => {
          if (obj.item){
            let type = obj.type;
            if (type == 'focus') { 
                this.setData({
                    swiper: obj.item,
                });
            }else if (type == 'list') { 
                this.setData({
                    news: obj,
                });
            }else if (type == 'tytopic') {
              let newArr = []; 
              obj.item.forEach((ele)=>{
                if(ele.title == '中超'||ele.title == "国际"){
                  newArr.push(ele)
                }
              })
              this.setData({
                  topic: newArr,
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
  toCarousel(event) {   
    wx.navigateTo({
        url: '../carousel/carousel?' + dealurl(event) ,
        success: (res) => {},
        fail: (err) => {
            console.log(err)
        }
    });
  },
  toArticle(event){
    wx.navigateTo({
        url: '../article/article?' + dealurl(event) ,
        success: (res) => {},
        fail: (err) => {
            console.log(err)
        }
    });
  },
  toTopic(event){
    wx.navigateTo({
        url: '../topic/topic?' + dealurl(event) ,
        success: (res) => {},
        fail: (err) => {
            console.log(err)
        }
    });
  },
  onPullDownRefresh () {
    this.init()
  },
  onReachBottom () {
    this.loadMore()
  },

})