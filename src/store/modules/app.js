import Cookies from 'js-cookie'

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        }
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)// Cookie 中sidebar值为1代表关闭
            } else {
                Cookies.set('sidebarStatus', 0)// 0代表展开
            }
            state.sidebar.opened = !state.sidebar.opened
        },
        CLOSE_SIDEBAR: state => {
            Cookies.set('sidebarStatus', 1)
            state.sidebar.opened = false
        }
    },
    actions: {
        ToggleSidebar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        CloseSidebar: ({ commit }) => {
            commit('CLOSE_SIDEBAR')
        }
    }
}

export default app
