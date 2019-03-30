const getters = {
    sidebar: state => state.app.sidebar,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    accessToken: state => state.user.accessToken.access_token
}

export default getters
