import { Link, useHistory } from "react-router-dom"
import { deletePost, approvePost } from "./PostManager"




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
            <div> By: {post.user?.user?.first_name} {post.user?.user?.last_name} </div>
            <div> In {post.category.label} category </div>
            <div>Tagged {post.tags?.map(t => t.label)}</div>
            {
                admin && post.approved === false ?
                <button onClick={()=> {approvePost(post.id).then(setPost)}}>Approve Post</button>
                : 
                ""
            }
            
            <Link to={`/my-posts/editpost/${post.id}`}><button className="button mr-3 my-3">Edit Post</button></Link>
            <button className="button mr-3 my-3" onClick={() => {
                                        deletePost(post.id)
                                            .then(setPost)
                                    }}>Delete Post</button>
            <Link to={`/commentCreate/${post.id}`}><button className="button mr-3 my-3">New Comment?</button></Link>
            </section>
        </section>
    )
}
