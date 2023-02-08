import { CommentAdder } from "./CommentAdder"

export const Comments = ({ setComments, comments, article_id }) => {

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
                        </div>
                    </li>
                )
                })}
            </ul>
        </section>
    )
}