export const dealurl = (obj) => {
  let nObj = obj.currentTarget.dataset;
  let url = nObj.id;
  if(url.indexOf("?")>-1){
    let title = nObj.title
    let queryStr = url.split("com/")[1];
    if(title){
      // 专题
      return 'type=' + queryStr.split("?")[0] + '&' + queryStr.split("?")[1] + '&title=' +title
    }else{
      // 其他
      return 'type=' + queryStr.split("?")[0] + '&' + queryStr.split("?")[1]
    }
  }else{
    // 视频
    return 'type=' + url
  }
}
