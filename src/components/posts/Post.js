import { Link, useHistory } from "react-router-dom"
import { deletePost, approvePost, unapprovePost } from "./PostManager"




export default ({ post, setPost, admin }) => {
    const history = useHistory()

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
                <button className="button mr-3 my-3" onClick={()=> {approvePost(post.id).then(setPost)}}>Approve Post</button>
                : 
                ""
            }
            {
                (admin && post.user?.user?.is_staff === false && post.approved === true) ?
                <button className="button mr-3 my-3" onClick={()=> {unapprovePost(post.id).then(setPost)}}>Unapprove Post</button>
                : 
                ""
            }
            <button className="button mr-3 my-3" onClick={() => {history.push(`/my-posts/editpost/${post.id}`)}}>Edit Post</button>
            <button className="button mr-3 my-3" onClick={() => {
                                        deletePost(post.id)
                                            .then(setPost)
                                    }}>Delete Post</button>
            <button className="button mr-3 my-3" onClick={() => {history.push(`/comments/${post.id}`)}}>View Comments</button>

            </section>
        </section>
    )
}
