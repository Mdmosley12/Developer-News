import axios from "axios";

const newsAPI = axios.create({
    baseURL: 'https://developer-news.onrender.com/api'
});

export const getArticles = (filterByQuery, sortByQuery, orderByQuery) => {
    return newsAPI.get(`/articles`, {
        params: {
            topic: filterByQuery,
            sort_by: sortByQuery,
            order: orderByQuery
        }
    }).then(( { data } ) => {
        return data.articles
    })
}

export const getSingleArticle = (article_id) => {
    return newsAPI.get(`/articles/${article_id}`).then(( { data } ) => {
        return data.article.article
    })
}

export const getCommentsById = (article_id) => {
    return newsAPI.get(`/articles/${article_id}/comments`).then(( { data }) => {
        return data.comments
    })
}

export const patchArticle = (article_id, vote) => {
    return newsAPI.patch(`/articles/${article_id}`, vote).then(( { data } ) => {
        return [data.updatedArticle]
    })
}

export const postComment = (article_id, newComment) => {
    return newsAPI.post(`/articles/${article_id}/comments`, newComment).then(( { data } ) => {
        return data.comment
    })
}

export const getTopics = () => {
    return newsAPI.get(`/topics`).then(( { data } ) => {
        return data.topics
    })
}

export const deleteComment = (comment_id) => {
    return newsAPI.delete(`/comments/${comment_id}`)
}

export const getUsers = () => {
    return newsAPI.get(`/users`).then(( { data } ) => {
        return data.users
    })
}

