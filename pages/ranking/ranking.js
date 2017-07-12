import api from '../../service/index.js'
Page({
  data: {
    datas:[],
    currentTab:0,
    datachild:[],
    currentchild:0,
    listbox:[],
    flag:'match'
  },
  onLoad: function () {
    api.league({
      success:(res)=>{
        if(res.data.important==-1){
          let narr = res.data.league.filter((ele)=>{
            return ele.type == 'zuqiu'&&ele.name!=="转会"
          })

          this.setData({
            datas:narr,
            datachild:narr[0].list
          })
          this.showlist(0,0)
        }
      }
    })
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  handleClick(e){
    let current = e.target.dataset.current;
    if( this.data.currentTab === current ) {  
      return false;  
    } else {  
      this.setData({  
        currentTab: current,
        datachild: this.data.datas[current].list
      })
      this.showlist(current,0)
    }  
  },
  showlist(current,currentchild){
    let url = this.data.datas[current].list[currentchild].url;
    api.purl({
      url:url,
      success:(res)=>{
        if(url.indexOf("match")>0){
          this.setData({
            flag:"match"
          })
          let ndata = res.data.data;
          ndata.forEach((ele)=>{
            ele.list.forEach((nele)=>{
              nele.zimg = nele["主队图标"];
              nele.kimg = nele["客队图标"]
            })
          })
          this.setData({
            listbox:ndata
          })
        }else if (url.indexOf("jifen")>0) {
          this.setData({
            flag:"jifen"
          })
          let nArr = {};
          nArr.title = res.data.items;
          nArr.items = res.data.data;
          this.setData({
            listbox:nArr
          })
        }
      }
    })
  },
  childClick(e){
    let currentchild = e.target.dataset.current;
    if( this.data.currentchild === currentchild ) {  
      return false;  
    } else {  
      this.showlist(this.data.currentTab,currentchild)
    } 
  }
})