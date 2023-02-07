import { useState, useEffect } from "react"
import { getSingleArticle } from "../utils/api"
import { useParams } from "react-router-dom"

export const SingleArticle = () => {
    const [singleArticle, setSingleArticle] = useState([])
    const { article_id } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSingleArticle(article_id).then((articleFromApi) => {
            setLoading(false)
            setSingleArticle(articleFromApi)
        })
    }, [])

    if(loading) {
        return <h2 id="loading">Loading...</h2>
    }

    return (
        <section id="singleArticle">
            <ul id="singleUnorderedList">
                {singleArticle.map((article) => {
                    return (
                        <li id="singleList" key={article.article_id}>
                            <div className="singleArticleContainer">
                                <p id="singleArticleTitle">{article.title}</p>
                                {article.topic}<br />
                                <br />
                                <img  className="singleArticleImg" alt="relevant to article" src={article.article_img_url}></img><br />
                                Created by{article.author}<br />
                                <br />
                                {article.body}<br />
                                <br />
                                Votes: {article.votes}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}