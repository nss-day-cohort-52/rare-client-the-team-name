import React, { useState, useEffect } from "react"
import { getApprovedPosts, getPosts } from "./PostManager"
import Post from "./Post"
import { PostFilters } from "./PostFilters"
import { getCurrentUser } from "../users/UserManager"

export const PostList = () => {
    const [ posts, setPosts ] = useState([])
    const [ approvedPosts, setApprovedPosts ] = useState([])
    const [ user, setUser ] = useState({})

    useEffect(()=> {
        getPosts().then(p => setPosts(p))
        getApprovedPosts().then(a => setApprovedPosts(a))
        getCurrentUser().then(u => setUser(u))
    }, [])
    
    let admin = user.user?.is_staff

    return (
        <>
            <PostFilters setPosts={setPosts}/>
            {
                (admin) ? 
            <div>
                {
                    posts.map(post => <Post key={post.id} post={post} setPost={setPosts} admin={admin}/>)
                }
            </div>
            :
            <div>
                                {
                    approvedPosts.map(post => <Post key={post.id} post={post} setPost={setPosts} />)
                }
            </div>
            }
        </>
    )
}