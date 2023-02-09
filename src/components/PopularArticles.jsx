import { useState } from "react"
import { Link } from "react-router-dom"
import { truncateString } from "../utils/truncateString"

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
            </ul>
        </div>
    )
}