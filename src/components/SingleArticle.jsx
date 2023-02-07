import { useState, useEffect } from "react"
import { getCommentsById, getSingleArticle } from "../utils/api"
import { useParams } from "react-router-dom"

export const SingleArticle = () => {
    const [singleArticle, setSingleArticle] = useState([])
    const [comments, setComments] = useState([])
    const { article_id } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getSingleArticle(article_id), getCommentsById(article_id)])
            .then(([articleFromApi, commentsFromApi]) => {
                setLoading(false)
                setSingleArticle(articleFromApi)
                setComments(commentsFromApi)
            })
        }, [])
        
    if(loading) {
        return <h2 id="loading">Loading...</h2>
    }

    return (
        <section id="singleArticle">
            <ul id="singleArticleUL">
                {singleArticle.map((article) => {
                    return (
                        <li id="singleList" key={article.article_id}>
                            <div className="singleArticleContainer">
                                <h2 id="singleArticleTitle">{article.title}</h2>
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

            <ul id="commentsUnorderedList">
                <h2 id="commentsTitle">Comments</h2>
                {comments.map((comment) => {
                    return (
                        <li id="commentsList" key={comment.comment_id}>
                            <div className="commentsContainer"><br />
                                Created by {comment.author}<br />
                                <p className="commentBody">{comment.body}</p>
                                Votes: {comment.votes}<br />
                                <br />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}