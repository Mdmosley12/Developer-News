import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"
import { Link } from 'react-router-dom'
import { Nav } from "./Nav"

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
            <Nav setArticles={setArticles}/>
            <ul>
                {articles.map((article) => {
                    return <li key={article.article_id}>
                        <Link to={`/articles/${article.article_id}`}>
                            <div className="articleContainer"><br/>
                            <p id="articleTitle">{article.title}</p>
                            <br/>
                            Posted by {article.author}&nbsp;
                            in {article.topic}<br />
                            <img  className="articleImg" alt="relevant to article" src={article.article_img_url}></img>
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