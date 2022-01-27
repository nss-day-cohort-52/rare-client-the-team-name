import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { getCategories } from "../categories/CategoryManager"
import { getSinglePost, updatePost } from "./PostManager"


export const EditPostForm = () => {
    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
    const [newCategoryId, setCategoryId] = useState(0)
    const [newTitle, setTitle] = useState("")
    const [newImageURL, setImageURL] = useState("")
    const [newContent, setContent] = useState("")
    const history = useHistory()
    const currentUserId = parseInt(localStorage.getItem('token'))
    const { postId } = useParams()
    const parsedId = parseInt(postId)

    useEffect(() => {
        getSinglePost(parsedId)
            .then(setPost)
    }, [parsedId])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    useEffect(() => {
        setCategoryId(post.category_id)
        setTitle(post.title)
        setImageURL(post.image_url)
        setContent(post.content)
    }, [post])

    const updatePostInfo = () => {
        const date = new Date()

        const updatedPost = {
            id: parsedId,
            user_id: currentUserId,
            category_id: newCategoryId,
            title: newTitle,
            publication_date: date.toDateString(),
            image_url: newImageURL,
            content: newContent,
            approved: null
        }

        updatePost(updatedPost)
        history.push(`/posts/${parsedId}`)    
        
    }

    return (
        <>
        <main className="container" >
        <h2 className="heading">Edit Your Post</h2>
        <form className="box2">
            <fieldset>
                <div>
                    <select value={newCategoryId} onChange={(evt) => setCategoryId(evt.target.value) }>
                    <option>Select a category</option>
                        {
                            categories.map(category => {
                                return <option key={category.id} value={category.id}>{category.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        onChange={ event => setTitle(event.target.value) }
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={newTitle}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="imageURL">Image URL:</label>
                    <input
                        onChange={ event => setImageURL(event.target.value) }
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={newImageURL}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input
                        onChange={ event => setContent(event.target.value) }
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={newContent}
                        />
                </div>
                <button type="button" className="button" onClick={() => updatePostInfo()}>
                Submit
            </button>
            </fieldset>

        </form>
        </main>
        </>
    )
}