import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { getSinglePost } from "./PostManager"

export const PostDetails = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()
    const parsedId = parseInt(postId) 

    useEffect(() => {
        getSinglePost(parsedId)
            .then(setPost)
    }, [parsedId])

    return (
        <>
            <section className="post">
                <h3 className="post__title">{post.title}</h3>
                <div> By: {post.user?.first_name} {post.user?.last_name} </div>
                <div> In {post.category?.label} category </div>
                <div> On {post.publication_date} </div>
                <div> {post.content} </div>
            </section>
        </>
    )
}