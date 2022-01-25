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

    const currentUserId = localStorage.getItem('token')
    
    return (
        <>
            <div className="myPosts">
                {

                    posts.map((post) => {
                        if (currentUserId === post.user_id){
                            return <Post key={post.id} post={post} />)
                        }
                        else {
                            return ""
                        }
                    }
                }
            </div>
        </>
    )
}