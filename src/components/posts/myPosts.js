import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getPosts } from "./PostManager"
import Post from "./Post"

export const MyPosts = () => {

    const [ posts, setPosts ] = useState([])
    

    useEffect(()=> {
        getPosts().then(p => setPosts(p))
    }, [])

    const currentUserId = parseInt(localStorage.getItem('token'))
    
    return (
        <>
            <div className="myPosts">
                {

                    posts.map((post) => {
                        if (currentUserId === post.user_id){
                            return (
                                <>
                            <Post key={post.id} post={post} />
                                <button>Edit Post</button>
                                <button>Delete Post</button>
                                </>
                                )

                        }
                        else {
                            ""
                        }
                    }
                    )
                }
            
            </div>
        </>
    )
}