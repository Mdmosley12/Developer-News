import { useState } from "react";
import { deleteComment, getCommentsById } from "../utils/api"

export const CommentDeleter = ({setComments, article_id, comment_id}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true)
        deleteComment(comment_id).then(() => {
            getCommentsById(article_id).then((commentsFromAPI) => {
                setComments(commentsFromAPI)
                setIsDeleting(false)
            })
        })
    }

    return (
        <button disabled={isDeleting} id="deleteButton" onClick={handleDelete}>{isDeleting ? "Deleting..." : "Delete Comment"}</button>
    )
}