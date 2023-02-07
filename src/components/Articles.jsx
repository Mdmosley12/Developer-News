import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"
import {Link} from 'react-router-dom'

export const Articles = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getArticles().then((articlesFromApi) => {
            setLoading(false)
            setArticles(articlesFromApi)
        })
    }, [])

    if(loading) {
        return <h2 id="loading">Loading...</h2>
    }

    return (
        <section id="articles">
        <ul>
            {articles.map((article, index) => {
                return <li key={article.article_id}>
                        <Link to={`/articles/${article.article_id}`}>
                            <div className="articleContainer"><br/>
                            <p id="articleTitle">{article.title}</p>
                            <br/>
                            Posted by {article.author}&nbsp;
                            in {article.topic}<br />
                            <br/>
                            <img  className="articleImg" alt="relevant to article" src={article.article_img_url}></img>
                            {/* {article.body} */}
                            <br/>
                            Comments: {article.comment_count}
                            &nbsp;
                            Votes: {article.votes}
                            </div>
                        </Link>
                </li>
            })}
        </ul>
        </section>
    )

}