import React from "react"
import { Link } from "react-router-dom"


export const SubscriptionPost = ({subscription}) => {
    return (
    <section className="message is-info">
        <div >
            <Link className="message-header" to={`/posts/${subscription.post.id}`}>
                { subscription.post.title }
            </Link>
        </div>
        <div className="message-body">
        <div> By: {subscription.user.first_name} {subscription.user.last_name} </div>
        
        <div> On {subscription.post.publication_date} </div>
        </div>
    </section>
    )
}