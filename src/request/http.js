// http.js用来封装axios
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// import { Toast } from 'vant'; // vant的toast提示框组件，大家可根据自己的ui组件更改。

// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写
import store from '@/store/index';
import router from '../router';

// 环境切换
if (process.env.NODE_ENV == 'development') {
    // axios.defaults.baseURL = 'https://easy-mock.com/mock/5f472b07524ff93bd5594727/example';
    axios.defaults.baseURL = 'http://api.fangtianshi.com/house_angel_php/public';

} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'https://www.baidu.com';
} else if (process.env.NODE_ENV == 'production') {
    // axios.defaults.baseURL = 'https://www.baidu.com';
    axios.defaults.baseURL = 'http://api.fangtianshi.com/house_angel_php/public';
    // axios.defaults.baseURL = 'https://easy-mock.com/mock/5f472b07524ff93bd5594727/example/';
}

// 跨域设置 每次请求携带cookies信息
// axios.defaults.withCredentials = true;这个值设置为true时，Access-Control-Allow-Origin的值不能为*


// 设置请求超时 
axios.defaults.timeout = 10000;

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header上都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能是过期的token，所以在相应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error)
    }
    // 一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，
    // 然后用户每次在进入页面的时候（即在main.js中），会首先从本地存储中读取token，
    // 如果token存在说明用户已经登陆过，则更新vuex中的token状态。
    // 然后，在每次请求接口的时候，都会在请求的header中携带token，后台人员就可以根据你携带的token来判断你的登录是否过期，
    // 如果没有携带，则说明没有登录过。
    // 这时候或许有些小伙伴会有疑问了，就是每个请求都携带token，那么要是一个页面不需要用户登录就可以访问的怎么办呢？
    // 其实，你前端的请求可以携带token，但是后台可以选择不接收
)

// 响应拦截
// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。   
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    // Toast({
                    //     message: '登录过期，请重新登录',
                    //     duration: 1000,
                    //     forbidClick: true
                    // });
                    console.log('登录过期，请重新登录')
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    // Toast({
                    //     message: '网络请求不存在',
                    //     duration: 1500,
                    //     forbidClick: true
                    // });
                    console.log('网络请求不存在')
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    // Toast({
                    //     message: error.response.data.message,
                    //     duration: 1500,
                    //     forbidClick: true
                    // });
                    
                    console.log(error.response.data.message)
            }
            return Promise.reject(error.response);
        }
    }
)

// 为了简化代码，封装get和post方法

/* 
get方法：我们通过定义一个get函数，get函数有两个参数，
第一个参数表示我们要请求的url地址，第二个参数是我们要携带的请求参数。
get函数返回一个promise对象，当axios其请求成功时resolve服务器返回值，请求失败时reject错误值。
最后通过export抛出get函数。

*/ 
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

/*
post方法：原理同get基本一样，
但是要注意的是，post方法必须要使用对提交从参数对象进行序列化的操作，所以这里我们通过node的qs模块来序列化我们的参数。
这个很重要，如果没有序列化操作，后台是拿不到你提交的数据的。这就是我们import QS from 'qs';的原因。
*/

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        let newParams={
            apiType:url,
            ...params
        }
        let newurl = '/?'+url
        axios.post(newurl, QS.stringify(newParams))
        // axios.post(newurl, newParams)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            })
    })
}
/*
axios.get()方法和axios.post()在提交数据时参数的书写方式还是有区别的。
区别就是，get的第二个参数是一个{}，然后这个对象的params属性值是一个参数对象的。
而post的第二个参数就是一个参数对象。两者略微的区别要留意哦
*/
console.log('this',store)

// 需要传入token的
export function tokenpost(url, params) {
    return new Promise((resolve, reject) => {
        let newParams={
            apiType:url,
            token:store.state.user.token,
            ...params
        }
        let newurl = '/?'+url
        axios.post(newurl, QS.stringify(newParams))
        // axios.post(newurl, newParams)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            })
    })
}