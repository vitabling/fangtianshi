// api.js用来统一管理接口
import { post } from './http'

// 示例
// url
// const url = 'https://easy-mock.com/mock/5f472b07524ff93bd5594727/example'
// 首页数据
export const indexData = p => post('pc.index.index', p);

/*
我们定义了一个apiAddress方法，这个方法有一个参数p，p是我们请求接口时携带的参数对象。
而后调用了我们封装的post方法，post方法的第一个参数是我们的接口地址，
第二个参数是apiAddress的p参数，即请求接口时携带的参数对象。 
最后通过export导出apiAddress。
*/

// 登录
export const loginPassword = p => post('pc.login.login', p);