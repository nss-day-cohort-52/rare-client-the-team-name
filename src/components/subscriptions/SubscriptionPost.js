import React from "react"
import { Link } from "react-router-dom"


export const SubscriptionPost = ({subscription}) => {
    return (
    <section className="post">
        <h3 className="post__title">
            <Link to={`/posts/${subscription.post.id}`}>
                { subscription.post.title }
            </Link>
        </h3>
        <div> By: {subscription.user.first_name} {subscription.user.last_name} </div>
        
        <div> On {subscription.post.publication_date} </div>
    </section>
    )
}