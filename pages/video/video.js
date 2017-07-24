import api from '../../service/index.js'

Page({
  data: {
    type:''
  },
  onLoad (option) {
    let params = option;
    if(params.type){
      this.setData({
        type : params.type
      })
    }else if(params.video){
      api.videoitem({
        guid:params.video,
        success:(res)=>{
          this.setData({
            type : res.data.singleVideoInfo[0].videoURLMid
          })
        },
        fail:(err)=>{

        }
      })
    }

  },
})
