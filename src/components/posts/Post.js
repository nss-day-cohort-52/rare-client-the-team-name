import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../users/UserManager"

import { deletePost } from "./PostManager"

export default ({ post, setPost }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        getCurrentUser().then(setCurrentUser)
    }, [])

    const editFucntion = () => {
        // funtion for edit and delete ternarys below
        if (currentUser.user?.id === post.user?.id) {
            return true
        }
    }

    // const deleteFucntion = () => {
    //     // funtion for edit and delete ternarys below
    //     if (currentUser.user?.id === post.user?.id && currentUser.user?.is_staff) {
    //         return true
    //     }
    // }


    return (
        <section className="message is-info m-5">
            <div className="card-header">
                <h3 className="message-header">
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </h3>
            </div>
            <section className="message-body">
                <div> By: {post.user?.user?.first_name} {post.user?.user?.last_name} </div>
                <div> In {post.category.label} category </div>
                <div>Tagged {post.tags?.map(t => t.label)}</div>
                {editFucntion() ? <Link to={`/my-posts/editpost/${post.id}`}><button className="button mr-3 my-3">Edit Post</button></Link> : ""}
                {editFucntion() ? <button className="button mr-3 my-3" onClick={() => {
                    deletePost(post.id)
                        .then(setPost)
                }}>Delete Post</button> : "" }
                {currentUser.user?.is_staff ? <button className="button mr-3 my-3" onClick={() => {
                    deletePost(post.id)
                        .then(setPost)
                }}>Delete Post</button> : ""}
                <Link to={`/commentCreate/${post.id}`}><button className="button mr-3 my-3">New Comment?</button></Link>
            </section>
        </section>
    )
}
