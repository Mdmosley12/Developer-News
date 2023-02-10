import { useState } from "react";
import { postComment } from "../utils/api";

export const CommentAdder = ({ user, setCommentDeleted, commentDeleted, comments, setComments, article_id }) => {
    const [inputValue, setInputValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pleaseLoginMessage, setPleaseLoginMessage] = useState(null)

    const handleChange = (event) => {
        setInputValue(event.target.value);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!user) {
            setPleaseLoginMessage('Please login to comment!')
        } else if (inputValue.length === 0) {
            setPleaseLoginMessage('Cannot post empty comment!')
        } else {
            setPleaseLoginMessage(null)
            setIsSubmitting(true);
            postComment(article_id, { username: user, body: inputValue})
            .then((newCommentFromApi) => {
                setComments([newCommentFromApi, ...comments])
                setInputValue("")
                setIsSubmitting(false)
                setCommentDeleted(false)
            })
        }
    }

    return (
        <form>
            <label htmlFor="commentBox"></label>
            <textarea disabled={isSubmitting} value={inputValue} onChange={handleChange} placeholder="Enter your Comment..." id="commentBox" name="commentBox" rows="5" cols="65"></textarea><br />
            <button disabled={isSubmitting} onClick={handleSubmit} type="submit">{isSubmitting ? "Posting..." : "Post Comment"}</button>
            <p>{pleaseLoginMessage}</p>
            {commentDeleted ? <p>Comment Deleted.</p> : null}
        </form>
    )
}