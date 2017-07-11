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



const league = (params) => wxRequest(params, 'http://dca.qiumibao.com/shuju/public/index.php?_url=/index/league')

//完赛比分params{time:2017-07-10}
const record = (params) => wxRequest(params, 'http://m.zhibo8.cc/json/record/'+params.time+'.htm')
module.exports = {
  league,
  record
}