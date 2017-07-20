export const dealurl = (obj) => {
    let url = obj.currentTarget.dataset.id;
    let queryStr = url.split("com/")[1];
    return 'type=' + queryStr.split("?")[0] + '&' + queryStr.split("?")[1]
}