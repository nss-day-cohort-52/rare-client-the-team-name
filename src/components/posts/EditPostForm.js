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
    }, [post, postTags])

    const updatePostInfo = () => {
        // let updatedCategoryId = 0
        let updatedTitle = ""
        let updatedImageURL = ""
        let updatedContent = ""
        const date = new Date()

        // if (newCategoryId) {
        //     updatedCategoryId = newCategoryId
        // }
        // else {
        //     updatedCategoryId = post.category_id
        // }
        if (newTitle) {
            updatedTitle = newTitle
        }
        else {
            updatedTitle = post.title
        }
        if (newImageURL) {
            updatedImageURL = newImageURL
        }
        else {
            updatedImageURL = post.image_url
        }
        if (newContent) {
            updatedContent = newContent
        }
        else {
            updatedContent = post.content
        }

        const updatedPost = {
            id: parsedId,
            user_id: currentUserId,
            category_id: newCategoryId,
            title: updatedTitle,
            publication_date: date.toDateString(),
            image_url: updatedImageURL,
            content: updatedContent,
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
                            <select value={newCategoryId} onChange={(evt) => setCategoryId(evt.target.value)}>
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
                                onChange={event => setTitle(event.target.value)}
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder={post.title}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageURL">Image URL:</label>
                            <input
                                onChange={event => setImageURL(event.target.value)}
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder={post.image_url}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <input
                                onChange={event => setContent(event.target.value)}
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder={post.content}
                            />
                        </div>
                        <div>
                            {
                                tags.map(
                                    (tag) => {
                                        return <p key={`tag--${tag.id}`}>
                                            <input
                                                type="checkbox"
                                                name="tag"
                                                value={tag.id}
                                                checked={newTagIds.has(tag.id) ? true : false}
                                                onChange={
                                                    (evt) => {
                                                        const copy = new Set(newTagIds)
                                                        copy.has(parseInt(evt.target.value))
                                                            ? copy.delete(parseInt(evt.target.value))
                                                            : copy.add(parseInt(evt.target.value))
                                                        setPost(copy)
                                                    }} />
                                            {tag.label}</p>
                                    }
                                )
                            }
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