import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"
import { Link } from 'react-router-dom'
import { Nav } from "./Nav"
import { truncateString } from "../utils/truncateString"
import { PopularArticles } from "./PopularArticles"

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
            <div id="articlesBody">
            <h2 id="popularArticlesHeader">Popular Articles</h2>
            <PopularArticles  articles={articles}/>
            <h2 id="allArticlesHeader">All Articles</h2>
            <ul>
                {articles.slice(0, limit).map((article) => {
                    return <li key={article.article_id}>
                        <Link to={`/articles/${article.article_id}`}>
                            <div className="articleContainer">
                            <p>Posted by {article.author}&nbsp;
                            in {article.topic}</p>
                            <img  className="articleImg" alt="relevant to article" src={article.article_img_url}></img>
                            <p id="articleTitle">{truncateString(article.title)}</p>
                            <p>Comments: {article.comment_count}
                            &nbsp;
                            Votes: {article.votes}
                            </p>
                            </div>
                        </Link>
                    </li>
                })}
                {limit < articles.length ? <button id="seeMoreButton" onClick={handleSeeMore}>See More...</button> : null}
                {limit > 8 ? <button id="seeLessButton" onClick={handleSeeLess}>See Less...</button> : null}
            </ul>
            </div>
        </section>
    )
}