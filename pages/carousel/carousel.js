import api from '../../service/index.js'

Page({
  data: {
    slides:[],
    title:'',
    current:1,
    description:''
  },
  onLoad (option) {
    // {type: "ipadtestdoc", aid: "cmpp_030170051455886"}
    // https://api.3g.ifeng.com/ipadtestdoc?aid=cmpp_030170051455886
    let params = option;
    let type = params.type
    delete params.type; 
    api.carousel({
      type:type,
      data:params,
      success:(res)=>{
        this.setData({
          slides: res.data.body.slides,
          title: res.data.body.title,
          description:res.data.body.slides[0].description,
        })
      },
      fail:(err)=>{

      }
    })
  },
  swiperChange(event){
    var index = event.detail.current;
    this.setData({
      current:index+1,
      description:this.data.slides[index].description
    })
  }
})