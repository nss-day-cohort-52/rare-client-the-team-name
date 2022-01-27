import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { getCategories } from "../categories/CategoryManager"
import { getTags } from "../tags/TagManager"
import { getSinglePost, updatePost } from "./PostManager"
import { createPostTag, deletePostTag, getCertainPostTags } from "./PostTagManager"


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
        setTitle(post.title)
        setImageURL(post.image_url)
        setContent(post.content)
        let idSet = new Set()
        for (const postTag of postTags) {
            idSet.add(postTag.tag_id)
        }
        setTagIds(idSet)
    }, [post, postTags])

    const updatePostInfo = () => {
        const date = new Date()

        const updatedPost = {
            user_id: currentUserId,
            category_id: newCategoryId,
            title: newTitle,
            publication_date: date.toDateString(),
            image_url: newImageURL,
            content: newContent,
            approved: null
        }

        updatePost(updatedPost, parsedId)
            .then(submitNewPostTag())
    }

    const submitNewPostTag = () => {
        const deletePostTagsPromises = []
        const addPostTagsPromises = []

        for (const postTag of postTags) {
            deletePostTagsPromises.push(deletePostTag(postTag.id))
        }

        for (const tagId of newTagIds) {
            addPostTagsPromises.push(createPostTag({
                tag_id: tagId,
                post_id: parsedId
            }))
        }

        Promise.all(deletePostTagsPromises)
            .then(() => Promise.all(addPostTagsPromises))
            .then(() => {
                history.push(`/posts/${parsedId}`)
            })
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
                                value={newTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageURL">Image URL:</label>
                            <input
                                onChange={event => setImageURL(event.target.value)}
                                required autoFocus
                                type="text"
                                className="form-control"
                                value={newImageURL}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <input
                                onChange={event => setContent(event.target.value)}
                                required autoFocus
                                type="text"
                                className="form-control"
                                value={newContent}
                            />
                        </div>
                        <div>
                            {
                                tags.map(
                                    (tag) => {
                                        return <div key={`tag--${tag.id}`}>
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
                                                        setTagIds(copy)
                                                    }} />
                                            {tag.label}
                                        </div>
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