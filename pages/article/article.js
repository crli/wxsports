import api from '../../service/index.js'
import WxParse from '../../utils/wxParse/wxParse.js'

Page({
  data: {
    datas:{},
    article:''
  },
  onLoad (option) {
    // {type: "api_vampire_article_detail", aid: "cmpp_030170051455886",channelid : 'TY43'}
    // https://api.iclient.ifeng.com/api_vampire_article_detail?aid=sub_22956841&channelid=TY43
    let params = option;
    let type = params.type
    delete params.type; 
    api.article({
      type:type,
      data:params,
      success:(res)=>{
        WxParse.wxParse('article','html',res.data.body.text,this,5)
        this.setData({
          datas: res.data.body
        })
      },
      fail:(err)=>{

      }
    })
  },

})