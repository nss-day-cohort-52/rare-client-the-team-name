import React, { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getCurrentUser } from "../users/UserManager";
import { deletePost, getSinglePost } from "./PostManager"
import { PostTagEdit } from "./PostTagEdit";
import { createPostReaction, getReactions } from "../reactions/ReactionManager"


export const PostDetails = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()
    const parsedId = parseInt(postId)
    const [currentUser, setCurrentUser] = useState()
    const history = useHistory()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [reactions, setReactions] = useState([])
    
    const date = post.publication_date
    const mdyDate = new Date(date).toLocaleString().split(",")[0]


    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
        getCurrentUser().then(setCurrentUser)
        getReactions().then(setReactions)
    }, [parsedId])

    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
    }, [modalIsOpen])

    const addReactionToPost = (id) => {

        const newPostReaction = {
            user: currentUser.id,
            post: post.id,
            reaction: id
        }
        createPostReaction(newPostReaction)
            .then(() => { getSinglePost(parsedId).then(setPost) })
    }
    const postReactionFilter = (post, reaction) => {
        const reactionArray = []
        post.postreaction_set?.map((postreaction) => {
            if (postreaction.reaction.id === reaction.id) {
                reactionArray.push(postreaction)
            }
        })
        return reactionArray.length
    }

    return (
        <>
            <section className="message is-info">
                <h3 className="message-header">{post.title}</h3>
                <img src={`https://rare-server.herokuapp.com${post.image_url}`} className="image is-128x128 mr-3"></img>
                <div className="message-body">
                    <div> {post.content} </div>
                    <h5>React to this!</h5>
                    <div id="reactionImage" className="level-item px-5">
                        {
                            reactions.map((reaction) => {
                                return (
                                    <div className={`reactionContainer--${reaction.id}`} key={reaction.id}>

                                        <img className={reaction.id} value={reaction.id} src={reaction.image_url} alt={reaction.label} width="150" height="150"
                                            onClick={() => {
                                                addReactionToPost(reaction.id)
                                            }} />
                                        <div key={`reactioncount--${reaction.id}`}>
                                            Reaction used {postReactionFilter(post, reaction)} times!
                                        </div>
                                    </div>

                                
                                )
                            })
                        }
                    </div>
                    <div> On {mdyDate} </div>
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
                                            <PostTagEdit setModalIsOpen={setModalIsOpen} />
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