import api from '../../service/index.js'
import {dealurl} from '../../utils/index.js'
Page({
  data: {
    subjects:[],
    havetitle:[],
    toView:''
  },
  onLoad (option) {
    // {type: "TopicApiForCmpp", topicid: 795,json : 'y'title:'aaa'}
    // https://api.iclient.ifeng.com/TopicApiForCmpp?topicid=795&json=y
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
        this.setData({
          subjects: res.data.body.subjects,
          havetitle: havetitle,
          toView:'inToView'+havetitle[0].title
        });
      },
      fail:(err)=>{

      }
    })
  },
  toitem(event){
    let title = event.target.dataset.title;
    this.setData({
     toView: 'inToView' + title
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
  }
})
