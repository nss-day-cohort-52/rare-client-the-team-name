import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCertainPostTags } from "./PostTagManager"
import { deletePost } from "./PostManager"

export default ({ post, setPosts }) => {
    const [tagsForPost, setTagsForPost] = useState([])

    useEffect(() => {
        getCertainPostTags(post.id).then(setTagsForPost)
    }, [post])

    return (
        <section className="message is-info">
            <div className="card-header">
            <h3 className="message-header">
                <Link to={`/posts/${post.id}`}>
                    {post.title}
                </Link>
            </h3>
            </div>
            <section className="message-body">
            <div> By: {post.user.first_name} {post.user.last_name} </div>
            <div> In {post.category.label} category </div>
            <div> On {post.publication_date} </div>
            <div> 
                
                    {
                        tagsForPost?.map((postTag) => {
                            return <span className="tag is-primary is-medium mr-3 my-3" key={postTag.id}>{postTag.tag.label}</span>
                        })
                    }
              
            </div>
            <Link to={`/my-posts/editpost/${post.id}`}><button className="button mr-3 my-3">Edit Post</button></Link>
                                    <button className="button mr-3 my-3" onClick={() => {
                                        deletePost(post.id)
                                            .then(setPosts)
                                    }}>Delete Post</button>
            <Link to={`/commentCreate/${post.id}`}><button className="button mr-3 my-3">New Comment?</button></Link>
            </section>
        </section>
    )
}
