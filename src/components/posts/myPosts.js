import React, { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { deletePost, getPosts } from "./PostManager"
import Post from "./Post"

export const MyPosts = () => {
    const currentUserId = parseInt(localStorage.getItem('token'))
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
                                <div key={post.id}>
                                    <Post post={post} />
                                    <Link to={`/my-posts/editpost/${post.id}`}><button>Edit Post</button></Link>
                                    <button onClick={() => {
                                        deletePost(post.id)
                                            .then(setPosts)
                                    }}>Delete Post</button>
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