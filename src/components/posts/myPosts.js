import React, { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { deletePost, getPosts } from "./PostManager"
import Post from "./Post"

export const MyPosts = () => {
    const currentUserId = parseInt(localStorage.getItem('rare_token'))
    const [posts, setPosts] = useState([])


    useEffect(() => {
        getPosts().then(p => setPosts(p))
    }, [])


    return (
        <>
            <div className="myPosts">
                {

                    posts.map((post) => {
                        if (currentUserId === post.user_id) {
                            return (
                                <div className="card" key={post.id}>
                                    <Post post={post} setPosts={setPosts}/>

                                </div>
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