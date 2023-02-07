import axios from "axios";

const newsAPI = axios.create({
    baseURL: 'https://developer-news.onrender.com/api'
});

export const getArticles = () => {
    return newsAPI.get(`/articles`).then(( { data } ) => {
        return data.articles
    })
}

export const getSingleArticle = (article_id) => {
    return newsAPI.get(`articles/${article_id}`).then(( { data } ) => {
        return data.article.article
    })
}