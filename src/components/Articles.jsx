import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"
import { Link } from 'react-router-dom'
import { Nav } from "./Nav"
import { truncateString } from "../utils/truncateString"

export const Articles = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(8);

    useEffect(() => {
        getArticles().then((articlesFromApi) => {
            setLoading(false)
            setArticles(articlesFromApi)
        })
    }, [])

    if(loading) {
        return <h2 id="loading">Loading...</h2>
    }

    const handleSeeMore = () => {
        setLimit(articles.length);
      };
    const handleSeeLess = () => {
        setLimit(8)
    }

    return (
        <section id="articles">
            <Nav setArticles={setArticles}/>
            <ul>
                {articles.slice(0, limit).map((article) => {
                    return <li key={article.article_id}>
                        <Link to={`/articles/${article.article_id}`}>
                            <div className="articleContainer"><br/>
                            Posted by {article.author}&nbsp;
                            in {article.topic}<br />
                            <img  className="articleImg" alt="relevant to article" src={article.article_img_url}></img>
                            <p id="articleTitle">{truncateString(article.title)}</p>
                            Comments: {article.comment_count}
                            &nbsp;
                            Votes: {article.votes}
                            </div>
                        </Link>
                    </li>
                })}
                {limit < articles.length ? <button id="seeMoreButton" onClick={handleSeeMore}>See More...</button> : null}
                {limit > 8 ? <button id="seeLessButton" onClick={handleSeeLess}>See Less...</button> : null}
            </ul>
        </section>
    )
}