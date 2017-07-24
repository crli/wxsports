import api from '../../service/index.js'

Page({
  data: {
    slides:[],
    title:'',
    current:1,
    description:'',
    commentnum:'',
    commentsUrl:''
  },
  onLoad (option) {
    let params = option;
    let type = params.type
    delete params.type;
    api.carousel({
      type:type,
      data:params,
      success:(res)=>{
        let commentsUrl = res.data.body.commentsUrl;
        this.setData({
          slides: res.data.body.slides,
          title: res.data.body.title,
          description:res.data.body.slides[0].description,
          commentsUrl:res.data.body.commentsUrl
        });
        api.hotcomment({
          data:{p:1,docurl:commentsUrl},
          success:(res)=>{
            this.setData({
              commentnum:res.data.join_count
            })
          },
          fail:(err)=>{

          },
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
  },
  toComment(event){
    wx.navigateTo({
        url: '../comment/comment?url=' + this.data.commentsUrl +'&title=' + this.data.title ,
        success: (res) => {},
        fail: (err) => {
            console.log(err)
        }
    });
  }
})
