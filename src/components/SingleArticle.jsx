import { useState, useEffect } from "react"
import { getCommentsById, getSingleArticle, patchArticle } from "../utils/api"
import { useParams } from "react-router-dom"
import { Comments } from "./Comments"

export const SingleArticle = () => {
    const [singleArticle, setSingleArticle] = useState([])
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(null)
    const { article_id } = useParams()

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

    const handleVoteClick = (article, vote) => {
        setSingleArticle((article) => [{...article[0], votes: article[0].votes + vote.inc_votes}])
        setErr(null);
        patchArticle(article.article_id, vote)
        .catch((err) => {
            setSingleArticle((article) => [{...article[0], votes: article[0].votes - vote.inc_votes}])
            setErr('Something went wrong, please try again');
        });
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
                                <button onClick={() => handleVoteClick(article, {inc_votes : 1})} className="upVote">&uarr;</button>&nbsp;
                                <button onClick={() => handleVoteClick(article, {inc_votes : -1})} className="downVote">&darr;</button>
                                {err ? <p id="errP">{err}</p> : null}
                            </div>
                        </li>
                    )
                })}
            </ul>
            <Comments err={err} setErr={setErr} article_id={article_id} comments={comments} setComments={setComments}/>
        </section>
    )
}