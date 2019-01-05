import request from '@/utils/request'

export function fetchList(query) {
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

export function getArticle(articleId) {
    return request({
        url: '/blog/articles/' + articleId,
        method: 'get'
    })
}

export function saveArticle(article) {
    return request({
        url: '/blog/articles',
        method: 'post',
        data: article
    })
}
