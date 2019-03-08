import request from '@/utils/httpClient'

export function getSimilarTagsByTagName(similarName, limit) {
    return request({
        url: '/blog/tags/similarity/name/' + similarName,
        method: 'get',
        params: {limit: limit}
    })
}

export function createTag(tag) {
    return request({
        url: 'blog/tags/',
        method: 'post',
        data: tag
    })
}
