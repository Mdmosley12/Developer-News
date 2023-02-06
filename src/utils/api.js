import axios from "axios";

const newsAPI = axios.create({
    baseURL: 'https://developer-news.onrender.com/api'
});

export const getArticles = () => {
    return newsAPI.get(`/articles`).then(( { data } ) => {
        return data.articles
    })
}