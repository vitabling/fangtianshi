import Vue from 'vue'
import jweixin from 'jweixin-module'

export default {

  //判断是否在微信中
  isWechat() {
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/micromessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  },

  //初始化sdk配置
  initJssdk(url) {
    return new Promise((resolve, reject) => {
      Vue.$http.post('/share/h5-config', { url: url }).then(res => {
        if (res.data) {
          console.log(res.data)
          jweixin.config({
            debug: true,
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'checkJsApi',
              'updateAppMessageShareData',
              'updateTimelineShareData',
              'getLocation'
            ]
          })

          //配置完成后，再执行分享等功能
          resolve(res.data)
        }
      }).catch(e => {
        reject(e)
      })
    })
  },

  share(data, success, cancel) {
    return new Promise((resolve, reject) => {

      data.url = data.url ? data.url : window.location.href

      this.initJssdk(data.url).then(signData => {
        jweixin.ready(function() {
          let shareData = {
            title: data && data.title ? data.title : signData.site_name,
            desc: data && data.desc ? data.desc : signData.site_description,
            link: data.url,
            imgUrl: data && data.img ? data.img : signData.site_logo,
            success: function(res) {
              console.log('share success')
              if (success) {
                success(res)
              }
            },
            cancel: function(res) {
              if (cancel) {
                cancel(res)
              }
            }
          }

          resolve(shareData)
        })
      }).catch(e => {
        reject(e)
      })
    })
  },

  // 分享给朋友接口
  shareToFriend(data, success, cancel) {
    if (!this.isWechat()) {
      return
    }

    this.share(data, success, cancel).then(shareData => {
      jweixin.updateAppMessageShareData(shareData)
    }).catch(e => {
      console.log('error shareToFriend', e)
    })

  },

  //分享到朋友圈接口
  shareToTimeline(data, success, cancel) {
    if (!this.isWechat()) {
      return
    }

    this.share(data, success, cancel).then(shareData => {
      jweixin.updateTimelineShareData(shareData)
    }).catch(e => {
      console.log('error shareToTimeline', e)
    })

  },

  getLocation(success, fail) {
    if (!this.isWechat()) {
      return
    }

    return new Promise((resolve, reject) => {
      this.initJssdk(window.location.href).then(signData => {
        jweixin.ready(function() {
          jweixin.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(res) {
              if (success) {
                success(res)
              }
            },
            fail: function(res) {
              if (fail) {
                fail(res)
              }
            }
          })
        })
      }).catch(e => {
        reject(e)
      })
    })

  }

}
