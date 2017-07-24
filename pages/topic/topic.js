import api from '../../service/index.js'
import {dealurl} from '../../utils/index.js'
Page({
  data: {
    subjects:[],
    havetitle:[],
    toView:'to0'
  },
  onLoad (option) {
    let params = option;
    let title = params.title;
    wx.setNavigationBarTitle({
      title: title
    });
    let type = params.type;
    delete params.type;
    delete params.title;
    api.article({
      type:type,
      data:params,
      success:(res)=>{
        let havetitle = res.data.body.subjects.filter((ele)=>{
          return ele.title
        })
        havetitle.forEach((ele,index)=> {
          ele.index = index
        });
        this.setData({
          subjects: res.data.body.subjects,
          havetitle: havetitle,
        });
      },
      fail:(err)=>{

      }
    })
  },
  toitem(event){
    let id = event.target.dataset.id;
    this.setData({
     toView: id
    })
    console.log(this.data.toView)
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
  toVideo(event){
    wx.navigateTo({
        url: '../video/video?' + dealurl(event) ,
        success: (res) => {},
        fail: (err) => {
            console.log(err)
        }
    });
  }
})
