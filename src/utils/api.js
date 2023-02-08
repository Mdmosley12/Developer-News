import axios from "axios";

const newsAPI = axios.create({
    baseURL: 'https://developer-news.onrender.com/api'
});

export const getArticles = (sortByQuery) => {
    return newsAPI.get(`/articles`, {
        params: {
            topic: sortByQuery
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
    return newsAPI.get(`/articles/${article_id}/comments`, ).then(( { data }) => {
        return data.comments
    })
}

export const patchArticle = (article_id, vote) => {
    return newsAPI.patch(`/articles/${article_id}`, vote).then(( { data } ) => {
        return [data.updatedArticle]
    })
}

export const getTopics = () => {
    return newsAPI.get(`/topics`).then(( {data} ) => {
        return data.topics
    })
  }
  