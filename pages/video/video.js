import api from '../../service/index.js'

Page({
  data: {
    type:''
  },
  onLoad (option) {
    let params = option;
    this.setData({
      type : params.type
    })
  },
})
