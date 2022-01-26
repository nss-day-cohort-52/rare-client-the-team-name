import React, { useState, useEffect } from "react"
<<<<<<< HEAD
import { Link, useParams } from 'react-router-dom'
import { getSinglePost } from "./PostManager"
=======
import { useParams } from 'react-router-dom'
import { getCertainPostTags, getSinglePost } from "./PostManager"
>>>>>>> main

export const PostDetails = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()
    const parsedId = parseInt(postId) 
    const [tagsForPost, setTagsForPost] = useState([])

    useEffect(() => {
        getSinglePost(parsedId)
            .then(setPost)
    }, [parsedId])
    useEffect(() => {
        getCertainPostTags(parsedId)
            .then(setTagsForPost)
    }, [parsedId])



    return (
        <>
            <section className="post">
                <h3 className="post__title">{post.title}</h3>
                <div> By: {post.user?.first_name} {post.user?.last_name} </div>
                <div> In {post.category?.label} category </div>
                <div> On {post.publication_date} </div>
                <div> {post.content} </div>
<<<<<<< HEAD
                <div><Link to={`/comments/${postId}`}>View Comments</Link></div>
=======
                <div> Tags: 
                    <ul>

                    {
                        tagsForPost?.map((postTag) => {
                            return <li>{postTag.tag.label}</li>
                        })
                    }
                    </ul>
                </div>
>>>>>>> main
            </section>
        </>
    )
}