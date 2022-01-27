import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { getCategories } from "../categories/CategoryManager"
import { getTags } from "../tags/TagManager"
import { getCertainPostTags, getSinglePost, updatePost } from "./PostManager"


export const EditPostForm = () => {
    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [postTags, setPostTags] = useState([])

    const [newCategoryId, setCategoryId] = useState(0)
    const [newTitle, setTitle] = useState("")
    const [newImageURL, setImageURL] = useState("")
    const [newContent, setContent] = useState("")
    const [newTagIds, setTagIds] = useState(new Set())

    const history = useHistory()
    const currentUserId = parseInt(localStorage.getItem('token'))
    const { postId } = useParams()
    const parsedId = parseInt(postId)

    useEffect(() => {
        getCategories().then(setCategories)
        getTags().then(setTags)
    }, [])

    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
        getCertainPostTags(parsedId).then(setPostTags)
    }, [parsedId])

    useEffect(() => {
        setCategoryId(post.category_id)
        let idSet = new Set()
        for (const postTag of postTags) {
            idSet.add(postTag.tag_id)
        }
        setTagIds(idSet)
        setTitle(post.title)
        setImageURL(post.image_url)
        setContent(post.content)
    }, [post, postTags])

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