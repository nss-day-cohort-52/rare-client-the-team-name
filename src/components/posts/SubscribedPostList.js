import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Post from "./Post"
import { getSubscribedPosts } from "./PostManager"

export const SubscribedPostList = () => {
    const [ posts, setPosts ] = useState([])

    useEffect(()=> {
        getSubscribedPosts().then(p => setPosts(p))
    }, [])

    return (
        <>
            <div className="card is-warning m-5">
                <div className="subs">
                    {
                        posts.length === 0
                            ? <>
                                <div className="card-header-title is-centered">You currently have no posts </div>
                                <Link className="card-header-title has-text-link is-centered" to="/users"> Find users you want to add! </Link>
                            </>
                            : <div>
                                {
                                    posts.map(post => <Post key={post.id} post={post} />)
                                }
                            </div>
                    }
                </div>
            </div>
        </>
    )
}