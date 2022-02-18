import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../users/UserManager"
import Post from "./Post"
import { getSubscribedPosts } from "./PostManager"

export const SubscribedPostList = () => {
    const [ posts, setPosts ] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=> {
        getSubscribedPosts().then(p => setPosts(p))
        getCurrentUser().then(u => setCurrentUser(u))
    }, [])

    return (
        <>
            <div className="card is-warning m-5">
                <div className="subs">
                    {
                        posts.length === 0
                            ? <>
                                <div className="card-header-title is-centered">You currently have no posts </div>
                                <Link className="card-header-title has-text-link is-centered" to="/posts"> Find the authors of posts you want to add! </Link>
                            </>
                            : <div>
                                {
                                    posts.map(post => <Post currentUser={currentUser} key={post.id} post={post} />)
                                }
                            </div>
                    }
                </div>
            </div>
        </>
    )
}