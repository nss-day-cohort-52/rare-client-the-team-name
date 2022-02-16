import { useEffect, useState } from "react"
import { getCurrentUser } from "../users/UserManager"
import { Link, useHistory } from "react-router-dom"
import { deletePost, approvePost, unapprovePost } from "./PostManager"


export default ({ post, setPost, admin }) => {
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        getCurrentUser().then(setCurrentUser)
    }, [])

    const editFucntion = () => {
        // funtion for edit ternary below
        if (currentUser.user?.id === post.user?.id) {
            return true
        }
    }

    const deleteFucntion = () => {
        // funtion for delete ternary below
        if (currentUser.user?.id === post.user?.id || currentUser.user?.is_staff) {
            return true
        }
    }

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
                <div> By: <Link to={`/users/${post.user?.id}`}>{post.user?.user?.first_name} {post.user?.user?.last_name}</Link></div>
                <div> In {post.category.label} category </div>
                <div>Tagged {post.tags?.map(t => t.label)}</div>
                {
                    (admin && post.approved) === false ?
                    <button onClick={()=> {approvePost(post.id).then(setPost)}}>Approve Post</button>
                    : 
                    ""
                }
                {
                    (admin && post.user?.user?.is_staff === false && post.approved === true) ?
                    <button onClick={()=> {unapprovePost(post.id).then(setPost)}}>Unapprove Post</button>
                    : 
                    ""
                }
                {editFucntion() ? <Link to={`/my-posts/editpost/${post.id}`}><button className="button mr-3 my-3">Edit Post</button></Link> : ""}
                {deleteFucntion() ? <button className="button mr-3 my-3" onClick={() => {
                    deletePost(post.id)
                        .then(setPost)
                }}>Delete Post</button> : "" }
                <Link to={`/commentCreate/${post.id}`}><button className="button mr-3 my-3">New Comment?</button></Link>
            </section>
        </section>
    )
}
