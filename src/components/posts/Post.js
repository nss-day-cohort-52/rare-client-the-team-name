import React from "react"
import { Link } from "react-router-dom"

export default ({ post }) => (
    <section className="post">
        <h3 className="post__title">
            <Link to={`/posts/${post.id}`}>
                { post.title }
            </Link>
        </h3>
        <div> By: {post.user.first_name} {post.user.last_name} </div>
        <div> In {post.category.label} category </div>
        <div> On {post.publication_date} </div>
    </section>
)
