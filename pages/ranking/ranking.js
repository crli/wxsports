import api from '../../service/index.js'
Page({
  data: {
    datas:[]
  },
  onLoad: function () {
    api.league({
      success:(res)=>{
        if(res.data.important==-1){
          let narr = res.data.league.filter((ele)=>{
            return ele.type == 'zuqiu'
          })

          this.setData({
            datas:narr
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
})