const getters = {
    sidebar: state => state.app.sidebar,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    articles: state => state.data.articles,
    getArticleWithPagination: (state) => (query) => {
        let page = query.page || 1
        let pageSize = query.limit || 3
        let start = pageSize * (page - 1)
        let list = state.data.articles.slice(start, start + pageSize)
        return {
            list: list,
            total: state.data.articles.length,
            page: page,
            pageSize: pageSize
        }
    }
}

export default getters
