import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"

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
                        <div className="articleContainer"><br/>
                        {article.title}<br/>
                        Listed in {article.topic}<br/>
                        Posted by {article.author}<br/>
                        <br/>
                        {article.body}
                        <br/>
                        Comments: {article.comment_count}
                        &nbsp;
                        Votes: {article.votes}
                        </div>
                    </li>
            })}
        </ul>
        </section>
    )

}