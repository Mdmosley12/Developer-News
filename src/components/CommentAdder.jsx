import { useState } from "react";
import { postComment } from "../utils/api";

export const CommentAdder = ({ commentDeleted, comments, setComments, article_id }) => {
    const [inputValue, setInputValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        setInputValue(event.target.value);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.length !== 0) {
            setIsSubmitting(true);
            postComment(article_id, { username: "cooljmessy", body: inputValue})
            .then((newCommentFromApi) => {
                setComments([newCommentFromApi, ...comments])
                setInputValue("")
                setIsSubmitting(false)
            })
        } else {
            alert('Cannot post empty comment!')
        }
    }

    return (
        <form>
            <label htmlFor="commentBox"></label>
            <textarea disabled={isSubmitting} value={inputValue} onChange={handleChange} placeholder="Enter your Comment..." id="commentBox" name="commentBox" rows="5" cols="65"></textarea><br />
            <button disabled={isSubmitting} onClick={handleSubmit} type="submit">{isSubmitting ? "Posting..." : "Post Comment"}</button>
            {commentDeleted ? <p>Comment Deleted.</p> : null}
        </form>
    )
}