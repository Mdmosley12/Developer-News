import { useState } from "react"
import { Link } from "react-router-dom"
import { truncateString } from "../utils/truncateString"
import { capitaliseString } from "../utils/capitaliseString"

export const PopularArticles = ({ articles }) => {
    
    const pickMostPopular = (articlesArray) => {
        articlesArray.sort((a, b) => b.votes - a.votes)
        return articlesArray.filter((article, i) => i < 4)
    }

    const [popularArticles, setPopularArticles] = useState(pickMostPopular(articles))

    return (
        <div id="popularArticles">
            <ul>
                {popularArticles.map((article) => {
                    return <li key={article.article_id}>
                         <Link to={`/articles/${article.article_id}`}>
                            <div className="articleContainer">
                            <p>Posted by {article.author}&nbsp;
                            in {capitaliseString(article.topic)}</p>
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
            </ul>
        </div>
    )
}