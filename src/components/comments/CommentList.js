import { useEffect, useState } from "react"
import { getPosts } from "../posts/PostManager"
import { getComments, deleteComments } from "./CommentsManager"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"


export const CommentList = () => {
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])
    const { postId } = useParams()
    const parsedId = parseInt(postId)

    useEffect(() => {
        getComments().then(c => {
            setComments(c)
        })
    }, [])

    useEffect(() => {
        getPosts().then(p => {
            setPosts(p)
        })
    }, [])


    return (
        <>
            <div>
                {
                    posts.map(
                        (post) => {
                            if (post.id === parsedId)
                            return <h1 key={`post--${post.id}`}>{post.title}</h1>
                        }
                    )
                }
            </div>
            <div>
                {
                    comments.map(
                        (comment) => {
                            if (comment.post_id === parsedId)
                            return <div key={`comment==${comment.id}`}>
                                <div>{comment.content}</div>
                                <div>Submitted By: {comment.user.username}</div>
                                <div><button onClick={() => deleteComments(comment.id).then(setComments)}>Delete</button></div>
                                </div>
                        }
                    )
                }
            </div>
        </>
    )
}




// comments.map(
//     (comment) => {
//         if (comment.post_id === )
//         return <li key={`comment==${comment.id}`}>
//             {comment.content}
//         </li>
//     }
// )
