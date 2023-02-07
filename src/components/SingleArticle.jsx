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
        <section id="articles">
            <ul>
                {singleArticle.map((article) => {
                    return (
                        <li key={article.article_id}>
                            <div className="articleContainer">
                                <p id="articleTitle">{article.title}</p><br />
                                {article.topic}<br />
                                <br />
                                <img  className="articleImg" alt="relevant to article" src={article.article_img_url}></img>
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