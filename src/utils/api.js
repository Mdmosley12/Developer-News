import axios from "axios";

const newsAPI = axios.create({
    baseURL: 'https://developer-news.onrender.com/api'
});

export const getTopics = () => {
    return newsAPI.get(`/topics`).then(( {data} ) => {
        return data.topics
    })
}

export const getArticles = () => {
    return newsAPI.get(`/articles`).then(( { data } ) => {
        // console.log(data.articles)
        return data.articles
    })
}