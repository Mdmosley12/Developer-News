
export const Comments = ({ comments }) => {

    return (
        <ul id="commentsUnorderedList">
            <h2 id="commentsTitle">Comments</h2>
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
    )
}