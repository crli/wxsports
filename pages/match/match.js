import api from '../../service/index.js'
Page({
  data: {

  },
  onLoad () {
    api.league({
      success:(res)=>{

      }
    })
  },
  onPullDownRefresh () {
  
  },
  onReachBottom () {
  
  },
 
})