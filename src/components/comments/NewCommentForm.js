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
        <>
        <h1>NEW Comment</h1>
           
                <div>
                    <label>What would you like to say? </label>
                    <input
                        type="textarea"
                        placeholder="commentContent"
                        onChange={
                            (evt) => {
                                const copy = { ...newComment }
                                copy.content = evt.target.value
                                setNewComment(copy)
                            }
                        } />
                    <button onClick={submitNewComment}>Submit</button>
                </div>
        
        
        
        
        </>
    )

}