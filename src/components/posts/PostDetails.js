import React, { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deletePost, getSinglePost } from "./PostManager"
import { getCertainPostTags } from "./PostTagManager"

export const PostDetails = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()
    const parsedId = parseInt(postId)
    const [tagsForPost, setTagsForPost] = useState([])
    const userId = parseInt(localStorage.getItem("token"))
    const history = useHistory()

    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
        getCertainPostTags(parsedId).then(setTagsForPost)
    }, [parsedId])

    return (
        <>
            <section className="post">
                <h3 className="post__title">{post.title}</h3>
                <h3 className="user_detail_link">
                    <Link to={`/users/${post.user?.id}`}>
                        {post.user?.first_name} {post.user?.last_name}
                    </Link>
                </h3>
                <div> In {post.category?.label} category </div>
                <div> On {post.publication_date} </div>
                <div> {post.content} </div>
                <div> Tags:
                    <ul>
                        {
                            tagsForPost?.map((postTag) => {
                                return <li key={postTag.id}>{postTag.tag.label}</li>
                            })
                        }
                    </ul>
                </div>
                <div><Link to={`/comments/${postId}`}>View Comments</Link></div>
                <div><Link to={`/commentCreate/${postId}`}>Add Comments</Link></div>
                {
                    post.user_id === userId
                        ? <>
                            <Link to={`/my-posts/editpost/${post.id}`}><button>Edit Post</button></Link>
                            <button className="button" onClick={() => {
                                deletePost(post.id)
                                    .then(() => history.push('/my-posts'))
                            }}>Delete Post</button>
                        </>
                        : ""
                }
            </section>
        </>
    )
}