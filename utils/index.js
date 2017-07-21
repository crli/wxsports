export const dealurl = (obj) => {
  let nObj = obj.currentTarget.dataset;
  let url = nObj.id;
  let title = nObj.title
  let queryStr = url.split("com/")[1];
  if(title){
    return 'type=' + queryStr.split("?")[0] + '&' + queryStr.split("?")[1] + '&title=' +title
  }else{
    return 'type=' + queryStr.split("?")[0] + '&' + queryStr.split("?")[1]
  }
}
