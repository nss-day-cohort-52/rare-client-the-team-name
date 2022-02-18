import React, { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { deletePost, getPosts } from "./PostManager"
import Post from "./Post"
import { getCurrentUser } from "../users/UserManager"

export const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    
    useEffect(() => {
        getPosts().then(p => setPosts(p))
        getCurrentUser().then(setCurrentUser)
    }, [])

    return (
        <>
            <div className="myPosts">
                {

                    posts.map((post) => {
                        if (currentUser.user?.id === post.user?.id) {
                            return (
                                <div className="card" key={post.id}>
                                    <Post currentUser={currentUser} post={post} setPosts={setPosts}/>

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