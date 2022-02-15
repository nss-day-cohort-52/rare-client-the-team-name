import { useEffect, useState } from "react"
import { getSingleComment, updateComment } from "./CommentsManager"
import { useParams, useHistory, Link } from "react-router-dom/cjs/react-router-dom.min"




export const UpdateCommentForm = () => {
    const history = useHistory()
    const { commentId } = useParams()
    const parsedCommentId = parseInt(commentId)
    const [comment, setComment] = useState({})
    const date = new Date()
    const [content, setNewContent] = useState("")

    useEffect(() => {
        getSingleComment(parsedCommentId).then(setComment)
    }, [])

    const submitEditedComment = (evt) => {
        evt.preventDefault()
        const submitEdit = {
            post: comment.post?.id,
            created_on: comment.created_on,
            content: content
        }
        updateComment(submitEdit, parsedCommentId)
            .then(() => {
                history.push(`/comments/${comment.post?.id}`)
            })

    }




    return (
        <div className="container m-6 p-6 has-background-link-light" >
            <h1 className="title is-4">Add a comment</h1>

            <div className="field my-5">
                <div className="control">
                    <textarea
                        className="textarea"
                        defaultValue={comment.content}
                        onChange={
                            (evt) => {
                                let copy = { ...content }
                                copy = evt.target.value
                                setNewContent(copy)
                            }}
                        required autoFocus
                    ></textarea>
                </div>
            </div>
            <button type="button" className="button is-link" onClick={submitEditedComment}>
                Save
            </button>
            <Link to={`/comments/${comment.post?.id}`}><button type="button" className="button is-link">
                Cancel
            </button></Link>
        </div>


    )

}