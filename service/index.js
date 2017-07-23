const host = ''
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}
//传地址
const purl = (params) => wxRequest(params, params.url)

//联赛总数据
const league = (params) => wxRequest(params, 'http://dca.qiumibao.com/shuju/public/index.php?_url=/index/league')

//完赛{data:{time:2017-07-10}}
const record = (params) => wxRequest(params, 'http://m.zhibo8.cc/json/record/'+params.time+'.htm')

//新闻{data:{id: 'TY43,FOCUSTY43,TYTOPIC',page: 1,gv:5.5.3}}id:' 新闻列表 轮播图 专题导航'gv视频新闻
const news = (params) => wxRequest(params, 'https://api.iclient.ifeng.com/ClientNews')

//轮播图
const carousel = (params) => wxRequest(params, 'https://api.3g.ifeng.com/'+params.type)

//新闻文章&&专题
const article = (params) => wxRequest(params, 'https://api.iclient.ifeng.com/'+params.type)

// 最新评论
const newcomment = (params) => wxRequest(params, 'http://comment.ifeng.com/get?job=1&order=DESC&orderBy=create_time')

// 热评
const hotcomment = (params) => wxRequest(params, 'http://comment.ifeng.com/get?job=1&orderby=uptimes&order=DESC')

module.exports = {
  purl,
  league,
  record,
  news,
  carousel,
  article,
  hotcomment,
  newcomment
}


