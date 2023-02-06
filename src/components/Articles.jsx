import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"

export const Articles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles().then((articlesFromApi) => {
            setArticles(articlesFromApi)
        })
    }, [])

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