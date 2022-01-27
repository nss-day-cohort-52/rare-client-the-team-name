import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCertainPostTags } from "./PostTagManager"

export default ({ post }) => {
    const [tagsForPost, setTagsForPost] = useState([])

    useEffect(() => {
        getCertainPostTags(post.id).then(setTagsForPost)
    }, [post])

    return (
        <section className="post">
            <h3 className="post__title">
                <Link to={`/posts/${post.id}`}>
                    {post.title}
                </Link>
            </h3>
            <div> By: {post.user.first_name} {post.user.last_name} </div>
            <div> In {post.category.label} category </div>
            <div> On {post.publication_date} </div>
            <div> Tags:
                <ul>
                    {
                        tagsForPost?.map((postTag) => {
                            return <li key={postTag.id}>{postTag.tag.label}</li>
                        })
                    }
                </ul>
            </div>
        </section>
    )
}
