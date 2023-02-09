import { CommentAdder } from "./CommentAdder"
import { CommentDeleter } from "./CommentDeleter"

export const Comments = ({ err ,setErr, setComments, comments, article_id }) => {

    return (
        <section id="commentSection">
            <h2 id="commentsTitle">Comments</h2>
            <CommentAdder setComments={setComments} comments={comments} article_id={article_id}/>
            <ul id="commentsUnorderedList">
                {comments.map((comment) => {
                return (
                    <li id="commentsList" key={comment.comment_id}>
                        <div className="commentsContainer"><br />
                            Created by {comment.author}<br />
                            <p className="commentBody">{comment.body}</p>
                            Votes: {comment.votes}
                            <br />
                            {comment.author === 'cooljmessy' ? <CommentDeleter comments={comments} err={err} setErr={setErr} setComments={setComments} article_id={comment.article_id} comment_id={comment.comment_id} /> : null}
                        </div>
                    </li>
                )
                })}
            </ul>
        </section>
    )
}