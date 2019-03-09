import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
// import store from '@/store'

function renewAccessToken() {
    return axios({
        method: 'post',
        url: process.env.BASE_API + '/oauth/token',
        data: {
            grant_type: 'client_credentials',
            client_id: '1',
            client_secret: 'ovAu2Eu4ouR7Q4kVAHa3bFOhqYt9bTSULgUHqHuW'
        }
    }).then(function(response) {
        console.log('-------------get token--------------------------------')
        console.log(response)
        // 获取到token 后放入cookie
        let accessToken = response.data.token_type + ' ' + response.data.access_token
        let expires = response.data.expires_in / (60 * 60 * 24)
        Cookies.set('accessToken', accessToken, { expires: expires })

        return accessToken
    })
}

// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000
})

// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        // if (store.getters.token) {
        //     // token
        //     config.headers['X-Token'] = ''
        // }
        console.log('--------------------in axios interceptors : request config--------------------')
        config.headers['Accept'] = 'application/vnd.myapp.v1+json'
        config.headers['Authorization'] = Cookies.get('accessToken')

        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        console.log('---------in axios interceptors : response response----------')
        let msg = response.data.msg
        if (response.data.code !== 0) {
            Message({
                message: msg,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(msg))
        }

        return response.data
    },
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    // response => {
    //   const res = response.data
    //   if (res.code !== 20000) {
    //     Message({
    //       message: res.message,
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //       // 请自行在引入 MessageBox
    //       // import { Message, MessageBox } from 'element-ui'
    //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //         confirmButtonText: '重新登录',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }).then(() => {
    //         store.dispatch('FedLogOut').then(() => {
    //           location.reload() // 为了重新实例化vue-router对象 避免bug
    //         })
    //       })
    //     }
    //     return Promise.reject('error')
    //   } else {
    //     return response.data
    //   }
    // },
    error => {
        console.log('---------in axios interceptors : response error----------')
        let config = error.config
        if (!config) return Promise.reject(error)

        if (!config.tryAccessToken) {
            // 请求accessToken后重试
            config.tryAccessToken = true

            Message({
                message: '重新请求access token中，请稍后',
                type: 'info',
                duration: 5 * 1000
            })

            return renewAccessToken()
                .then(accessToken => {
                    console.log('---------------after renew access token---------------------')
                    config.headers['Authorization'] = accessToken
                    return service(config)
                })
        } else {
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(error)
        }
    }
)

export default service
