import axios from 'axios'

const user = {
    state: {
        name: 'Darkgel',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roles: ['admin', 'super'],
        accessToken: (localStorage.accessToken && JSON.parse(localStorage.accessToken)) || null
    },
    mutations: {
        UPDATE_ACCESS_TOKEN(state, accessToken) {
            state.accessToken = accessToken
        }
    },
    actions: {
        loginByUsername({commit}, loginData) {
            return axios({
                method: 'post',
                url: 'http://passport.teamblog.me/oauth/token',
                data: {
                    grant_type: 'password',
                    client_id: '2',
                    client_secret: 'pxbDRceMBMUfGuuejfLcdn94zyPzjw5we7OFxd8m',
                    username: loginData.username,
                    password: loginData.password,
                    scope: ''
                }
            }).then(function(response) {
                console.log('-------------get token--------------------------------')
                console.log(response)
                // 获取到token 后放入localStorage
                let accessToken = response.data
                localStorage.setItem('accessToken', JSON.stringify(accessToken))
                commit('UPDATE_ACCESS_TOKEN', accessToken)
                return true
            })
        }
    }
}

export default user
