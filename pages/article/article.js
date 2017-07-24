import api from '../../service/index.js'
import WxParse from '../../utils/wxParse/wxParse.js'

Page({
  data: {
    datas:{},
    article:''
  },
  onLoad (option) {

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
