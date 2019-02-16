import request from '@/utils/request'

export function getSimilarTagsByTagName(similarName, limit) {
    return request({
        url: '/blog/tags/similarity/name/' + similarName,
        method: 'get',
        params: {limit: limit}
    })
}
