import React, { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getCurrentUser } from "../users/UserManager";
import { deletePost, getSinglePost } from "./PostManager"
import { PostTagEdit } from "./PostTagEdit";


export const PostDetails = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()
    const parsedId = parseInt(postId)
    const [currentUser, setCurrentUser] = useState()
    const history = useHistory()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
        getCurrentUser().then(setCurrentUser)
    }, [parsedId])
    
    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
    }, [modalIsOpen])
    
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
                    <div><Link to={`/commentCreate/${postId}`}>New Comment</Link></div>
                    {
                        post.user?.id === currentUser?.id
                            ? <>
                                <Link to={`/my-posts/editpost/${post.id}`}><button className="button">Edit Post</button></Link>
                                <button className="button" onClick={() => {
                                    deletePost(post.id)
                                        .then(() => history.push('/my-posts'))
                                }}>Delete Post</button>
                                <button className="button" onClick={() => {
                                    setModalIsOpen(true)
                                }}>Edit Tags on Post?</button>
                                <div id="edit-modal" className={modalIsOpen ? "modal is-active" : "modal"}>
                                    <div className="modal-background"></div>

                                    <div className="modal-content">
                                        <div className="box">
                                            <PostTagEdit modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
                                        </div>
                                    </div>
                                </div>

                            </>
                            : ""
                    }
                </div>

            </section>
        </>
    )
}