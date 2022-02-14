import { useEffect, useState } from "react"
import { getSinglePost } from "../posts/PostManager"
import { getComments, deleteComments } from "./CommentsManager"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { NewCommentForm } from "./NewCommentForm"
import { Link } from "react-router-dom"


export const CommentList = () => {
    const [comments, setComments] = useState([])
    const [post, setPost] = useState([])
    const { postId } = useParams()
    const parsedId = parseInt(postId)
    const currentUser = parseInt(localStorage.getItem("rare_token"))

    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
        getComments().then(setComments)
    }, [parsedId])

    return (
        <div className="container p-6">
            <h1 className="title is-3 has-text-centered">Comments on "{post.title}"</h1>
            <div className="is-flex is-justify-content-center mb-5">
                <Link to={`/commentCreate/${post.id}`} className="button is-success is-outlined has-text-weight-bold">Add New Comment</Link>
            </div>
            <div className="columns is-multiline">
                {
                    comments.map((comment) => {
                        if (comment.post_id === parsedId) {
                            return <div className="column is-one-third">
                                <article className="message is-link">
                                    <div className="message-header">
                                        {comment.user.username}
                                        {
                                            comment.author_id === currentUser
                                                ? <button class="delete" onClick={() => deleteComments(comment.id).then(setComments)}></button>
                                                : ""
                                        }
                                    </div>
                                    <div className="message-body">
                                        {comment.content}
                                    </div>
                                </article>
                            </div>
                        }
                    })
                }
            </div>
        </div>
    )
}
