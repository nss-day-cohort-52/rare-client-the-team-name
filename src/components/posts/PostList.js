import React, { useState, useEffect } from "react"
import { getPosts } from "./PostManager"
import Post from "./Post"
import { PostFilters } from "./PostFilters"

export const PostList = () => {
    const [ posts, setPosts ] = useState([])

    useEffect(()=> {
        getPosts().then(p => setPosts(p))
    }, [])
    
    return (
        <>
            <PostFilters setPosts={setPosts}/>
            <div>
                {
                    posts.map(post => <Post key={post.id} post={post} setPost={setPosts}/>)
                }
            </div>
        </>
    )
}