import request from '@/utils/httpClient'

export function getArticleList(query) {
    return request({
        url: '/blog/articles',
        method: 'get',
        params: query
    })
}

export function deleteArticle(articleId) {
    return request({
        url: '/blog/articles/' + articleId,
        method: 'delete'
    })
}

export function getArticle(articleId, query) {
    return request({
        url: '/blog/articles/' + articleId,
        method: 'get',
        params: query
    })
}

export function saveArticle(article) {
    return request({
        url: '/blog/articles',
        method: 'post',
        data: article
    })
}
