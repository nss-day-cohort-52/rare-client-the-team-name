import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getPosts } from "./PostManager"
import Post from "./Post"

export const PostList = () => {

    const [ posts, setPosts ] = useState([])
    const history = useHistory()

    useEffect(()=> {
        getPosts().then(p => setPosts(p))
    }, [])

    return (
        <>
            <div className="posts">
                {
                    posts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </>
    )
}