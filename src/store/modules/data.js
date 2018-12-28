const data = {
    state: {
        articles: [
            {
                id: 1,
                title: 'article 1',
                author: 'darkgel_1',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 1',
                content_md: '',
                content_html: '',
                status: 2
            },
            {
                id: 2,
                title: 'article 2',
                author: 'darkgel_2',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 2',
                content_md: '',
                content_html: '',
                status: 0
            },
            {
                id: 3,
                title: 'article 3',
                author: 'darkgel_3',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 3',
                content_md: '',
                content_html: '',
                status: 1
            },
            {
                id: 4,
                title: 'article 4',
                author: 'darkgel_4',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 4',
                content_md: '',
                content_html: '',
                status: 2
            },
            {
                id: 5,
                title: 'article 5',
                author: 'darkgel_5',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 5',
                content_md: '',
                content_html: '',
                status: 0
            },
            {
                id: 6,
                title: 'article 6',
                author: 'darkgel_6',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 6',
                content_md: '',
                content_html: '',
                status: 1
            },
            {
                id: 7,
                title: 'article 7',
                author: 'darkgel_7',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 7',
                content_md: '',
                content_html: '',
                status: 2
            },
            {
                id: 8,
                title: 'article 8',
                author: 'darkgel_8',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 8',
                content_md: '',
                content_html: '',
                status: 0
            },
            {
                id: 9,
                title: 'article 9',
                author: 'darkgel_9',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 9',
                content_md: '',
                content_html: '',
                status: 1
            },
            {
                id: 10,
                title: 'article 10',
                author: 'darkgel_10',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 10',
                content_md: '',
                content_html: '',
                status: 2
            },
            {
                id: 11,
                title: 'article 11',
                author: 'darkgel_11',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 11',
                content_md: '',
                content_html: '',
                status: 0
            },
            {
                id: 12,
                title: 'article 12',
                author: 'darkgel_12',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 12',
                content_md: '',
                content_html: '',
                status: 1
            },
            {
                id: 13,
                title: 'article 13',
                author: 'darkgel_13',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 13',
                content_md: '',
                content_html: '',
                status: 2
            },
            {
                id: 14,
                title: 'article 14',
                author: 'darkgel_14',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 14',
                content_md: '',
                content_html: '',
                status: 0
            },
            {
                id: 15,
                title: 'article 15',
                author: 'darkgel_15',
                updatedTime: 1545982570,
                createdTime: 1545982533,
                summary: 'this is the summary of article 15',
                content_md: '',
                content_html: '',
                status: 1
            }
        ]
    },
    mutations: {
        ADD_ARTICLE: (state, article) => {
            state.articles.push(article)
        },
        DEL_ARTICLE: (state, articleId) => {
            let index = state.article.find(function(element) {
                return element.id === articleId
            })
            state.articles[index].status = 0
        }
    }
}

export default data
