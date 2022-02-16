import { useEffect, useState } from "react"
import { getSinglePost } from "../posts/PostManager"
import { getComments, deleteComments } from "./CommentsManager"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { NewCommentForm } from "./NewCommentForm"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../users/UserManager"


export const CommentList = () => {
    const [comments, setComments] = useState([])
    const [post, setPost] = useState([])
    const { postId } = useParams()
    const parsedId = parseInt(postId)
    const [currentUser, setCurrentUser] = useState({})
    const history = useHistory()

    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
        getComments().then(setComments)
    }, [parsedId])
    
    useEffect(() => {
        getCurrentUser().then(setCurrentUser)
    }, [])

    return (
        <div className="container p-6">
            <h1 className="title is-3 has-text-centered">Comments on "{post.title}"</h1>
            <div className="is-flex is-justify-content-center mb-5">
                <Link to={`/commentCreate/${post.id}`} className="button is-success is-outlined has-text-weight-bold">Add New Comment</Link>
            </div>
            <div className="is-flex is-justify-content-center mb-5">
                <Link to={`/posts/${post.id}`} className="button is-success is-outlined has-text-weight-bold">Back to Post</Link>
            </div>
            <div className="columns is-multiline">
                {
                    comments.map((comment) => {
                            return <div key={comment.id} className="column is-one-third">
                                <article className="message is-link">
                                    <div className="message-header">
                                        Author: {comment.author.user.username}

                                            {currentUser.user?.id === comment.author.user.id || currentUser.user?.is_staff ? <button className="delete" onClick={() => deleteComments(comment.id).then(setComments)}></button> : "" }
                                            {currentUser.user?.id === comment.author.user.id ? <Link to={`/editcomments/${comment.id}`}><button>edit</button></Link> : "" }

                                    </div>
                                    <div className="message-body">
                                        <div>
                                            Comment: {comment.content}
                                        </div>
                                        <div>
                                            Date: {comment.created_on}
                                        </div>
                                        <div>
                                            Category: {comment.post.category.label}
                                        </div>
                                    </div>
                                </article>
                            </div>
                    })
                }
            </div>
        </div>
    )
}
