/**
 * 获取服务供应商
 */
function getProvider() {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service: 'oauth',
      success: (res) => {
        let provideList = res.provider
          .map((value) => {
            let providerName = ''
            switch (value) {
              case 'weixin':
                providerName = '微信登录'
                break
              case 'qq':
                providerName = 'QQ登录'
                break
              case 'sinaweibo':
                providerName = '新浪微博登录'
                break
              case 'xiaomi':
                providerName = '小米登录'
                break
              case 'alipay':
                providerName = '支付宝登录'
                break
              case 'baidu':
                providerName = '百度登录'
                break
              case 'toutiao':
                providerName = '头条登录'
                break
              case 'apple':
                providerName = '苹果登录'
                break
            }
            return {
              name: providerName,
              id: value
            }
          })
        resolve(provideList)
      },
      fail: (error) => {
        console.log('获取登录通道失败', error)
        reject(res)
      }
    })
  })
}

/**
 * 检查登录态是否过期
 */
function checkSession() {
  return new Promise((resolve, reject) => {
    uni.checkSession({
      success(res) {
        //session_key 未过期，并且在本生命周期一直有效
        let code = uni.getStorageSync('login_code') || ''
		if(code == ''){
			code = onLogin()
		}
        resolve(code)
      },
      fail: async (err) => {
        // session_key 已经失效，需要重新执行登录流程
        let code = await onLogin()
        reject(code)
      }
    })
  })
}

/**
 * 调用接口获取登录凭证（code）
 */
function onLogin() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: function(res) {
        if (res.errMsg == 'login:ok') {
          uni.setStorageSync('login_code', res.code)
          resolve(res.code)
        } else {
          reject(res)
        }
      },
      fail: function(err) {
        reject(res)
      }
    })
  })
}

export default {
  getProvider,
  checkSession,
  onLogin
}