import { useState } from "react"
import { createComment } from "./CommentsManager"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"




export const NewCommentForm = () => {
    const history = useHistory()
    const { postId } = useParams()
    const parsedId = parseInt(postId)
    const currentUserId = parseInt(localStorage.getItem('token'))
    const [newComment, setNewComment] = useState({
        author_id: currentUserId,
        post_id: parsedId,
        content: ""
    })

    const submitNewComment = (evt) => {
        evt.preventDefault()
        createComment(newComment)
            .then(() => {
                history.push(`/comments/${postId}`)
            })

    }


    return (
        <div className="container m-6 p-6 has-background-link-light" >
            <h1 className="title is-4">Add a comment</h1>

            <div className="field my-5">
                <div className="control">
                    <textarea
                        className="textarea"
                        placeholder="Write a comment..."
                        onChange={
                            (evt) => {
                                const copy = { ...newComment }
                                copy.content = evt.target.value
                                setNewComment(copy)
                            }}
                        required autoFocus
                    ></textarea>
                </div>
            </div>
            <button type="button" className="button is-link" onClick={submitNewComment}>
                Submit
            </button>
        </div>


    )

}