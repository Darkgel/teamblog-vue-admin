import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

function renewAccessToken() {
    return axios({
        method: 'post',
        url: 'http://passport.teamblog.me/oauth/token',
        data: {
            grant_type: 'refresh_token',
            refresh_token: store.getters.refreshToken,
            client_id: '2',
            client_secret: 'pxbDRceMBMUfGuuejfLcdn94zyPzjw5we7OFxd8m',
            scope: ''
        }
    }).then(function(response) {
        console.log('-------------renew token--------------------------------')
        console.log(response)
        // 获取到token 后放入localStorage
        let accessToken = response.data
        localStorage.setItem('accessToken', JSON.stringify(accessToken))
        store.commit('UPDATE_ACCESS_TOKEN', accessToken)
        return true
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
        config.headers['Authorization'] = store.getters.accessToken

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
    error => {
        console.log('---------in axios interceptors : response error----------')
        let config = error.config
        if (!config) return Promise.reject(error)

        if (!config.tryAccessToken) {
            // 请求accessToken后重试
            config.tryAccessToken = true

            Message({
                message: '重新请求access token中，请稍后...',
                type: 'warning',
                duration: 5 * 1000
            })

            return renewAccessToken()
                .then(accessToken => {
                    console.log('---------------after renew access token---------------------')
                    config.headers['Authorization'] = store.getters.accessToken
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
