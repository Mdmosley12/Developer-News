import { useState } from "react";
import { deleteComment, getCommentsById } from "../utils/api"

export const CommentDeleter = ({err, setErr ,setComments, article_id, comment_id}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true)
        setErr(null)
        deleteComment(comment_id).then(() => {
            getCommentsById(article_id).then((commentsFromAPI) => {
                setComments(commentsFromAPI)
                setIsDeleting(false)
            })
        })
        .catch((err) => {
            setErr('Something went wrong, please try again')
        })
    }

    return (
        <div>
            <button disabled={isDeleting} id="deleteButton" onClick={handleDelete}>{isDeleting ? "Deleting..." : "Delete Comment"}</button>
            {err ? <p>{err}</p> : null}
        </div>
    )
}