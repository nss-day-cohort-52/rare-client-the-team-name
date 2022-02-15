import React, { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deletePost, getSinglePost } from "./PostManager"

export const PostDetails = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()
    const parsedId = parseInt(postId)
    const userId = parseInt(localStorage.getItem("rare_token"))
    const history = useHistory()

    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
    }, [parsedId])

    return (
        <>
            <section className="message is-info">
                <h3 className="message-header">{post.title}</h3>
                <img src={post.image_url} />
                <div className="message-body">
                <div> {post.content} </div>
                <div> On {post.publication_date} </div>
                <div>By {post.user?.user?.username} </div>
                <div> In {post.category?.label} category </div>
                <div>Tagged {post.tags?.map(t => t.label)}</div>
                <div><Link to={`/comments/${postId}`}>View Comments</Link></div>
                <div><Link to={`/commentCreate/${postId}`}>Add Comments</Link></div>
                {
                    post.user_id === userId
                        ? <>
                            <Link to={`/my-posts/editpost/${post.id}`}><button className="button">Edit Post</button></Link>
                            <button className="button" onClick={() => {
                                deletePost(post.id)
                                    .then(() => history.push('/my-posts'))
                            }}>Delete Post</button>
                        </>
                        : ""
                }
                </div>

            </section>
        </>
    )
}